import time
import requests
from app.core.config import settings

# In-memory cache to prevent rate-limiting (TTL: 5 minutes = 300 seconds)
CACHE_TTL = 300
_stats_cache = {
    "data": None,
    "timestamp": 0
}

def fetch_github_stats(username: str = "Edge-Explorer") -> dict:
    """
    Fetches GitHub contribution calendar, stats, and organizations.
    Uses in-memory cache to prevent rate-limiting.
    """
    global _stats_cache
    current_time = time.time()
    
    # Return cached data if valid
    if _stats_cache["data"] and (current_time - _stats_cache["timestamp"] < CACHE_TTL):
        print("Returning cached GitHub stats.")
        return _stats_cache["data"]
        
    token = settings.GITHUB_TOKEN
    if not token:
        print("GitHub token not configured. Returning empty stats.")
        return get_empty_fallback()
        
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Query 1: Contributions and stats (Does not require read:org scope)
    contributions_query = """
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                color
                date
                weekday
              }
            }
          }
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
        }
      }
    }
    """
    
    stats_data = {}
    calendar = []
    
    try:
        response = requests.post(
            "https://api.github.com/graphql",
            headers=headers,
            json={"query": contributions_query, "variables": {"username": username}},
            timeout=10
        )
        if response.status_code == 200:
            res_json = response.json()
            if "errors" in res_json:
                print("GitHub GraphQL stats query returned errors:", res_json["errors"])
            else:
                user_data = res_json.get("data", {}).get("user", {})
                if user_data:
                    contrib_collection = user_data.get("contributionsCollection", {})
                    cal_data = contrib_collection.get("contributionCalendar", {})
                    
                    stats_data = {
                        "total_contributions": cal_data.get("totalContributions", 0),
                        "commits": contrib_collection.get("totalCommitContributions", 0),
                        "prs": contrib_collection.get("totalPullRequestContributions", 0),
                        "reviews": contrib_collection.get("totalPullRequestReviewContributions", 0),
                        "issues": contrib_collection.get("totalIssueContributions", 0),
                    }
                    
                    # Flatten weeks into a simple list of days
                    for week in cal_data.get("weeks", []):
                        for day in week.get("contributionDays", []):
                            calendar.append({
                                "date": day.get("date"),
                                "count": day.get("contributionCount", 0),
                                "color": day.get("color")
                            })
        else:
            print(f"GitHub API returned HTTP {response.status_code}: {response.text}")
    except Exception as e:
        print(f"Error fetching GitHub contributions: {e}")

    # Query 2: Organizations (Requires read:org scope, handled gracefully if scope is missing)
    orgs_query = """
    query($username: String!) {
      user(login: $username) {
        organizations(first: 15) {
          nodes {
            login
            avatarUrl
            url
          }
        }
      }
    }
    """
    
    organizations = []
    
    try:
        response = requests.post(
            "https://api.github.com/graphql",
            headers=headers,
            json={"query": orgs_query, "variables": {"username": username}},
            timeout=10
        )
        if response.status_code == 200:
            res_json = response.json()
            if "errors" in res_json:
                # Insufficient scopes or other error, fallback to empty orgs list
                print("GitHub GraphQL orgs query skipped or failed due to scope restriction.")
            else:
                nodes = res_json.get("data", {}).get("user", {}).get("organizations", {}).get("nodes", [])
                for node in nodes:
                    organizations.append({
                        "login": node.get("login"),
                        "avatar_url": node.get("avatarUrl"),
                        "url": node.get("url")
                    })
    except Exception as e:
        print(f"Error fetching GitHub organizations: {e}")

    # Fallback checks if stats_data is empty (e.g. initial connection failed)
    if not stats_data:
        return get_empty_fallback()

    result = {
        "username": username,
        "stats": stats_data,
        "calendar": calendar,
        "organizations": organizations,
        "cached_at": current_time
    }
    
    # Save to cache
    _stats_cache["data"] = result
    _stats_cache["timestamp"] = current_time
    
    return result

def get_empty_fallback() -> dict:
    """Returns a safe fallback data structure."""
    return {
        "username": "Edge-Explorer",
        "stats": {
            "total_contributions": 0,
            "commits": 0,
            "prs": 0,
            "reviews": 0,
            "issues": 0
        },
        "calendar": [],
        "organizations": [],
        "cached_at": time.time()
    }
