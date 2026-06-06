import sys
try:
    import google.auth
    import google.auth.transport.requests

    credentials, project = google.auth.default(scopes=['https://www.googleapis.com/auth/cloud-platform'])
    request = google.auth.transport.requests.Request()
    credentials.refresh(request)
    print("Success! Token:", credentials.token[:10] + "...")
except ImportError:
    print("google-auth not installed")
except Exception as e:
    print("Auth error:", e)
