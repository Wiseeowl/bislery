import urllib.request
import urllib.error
import json
import itertools

def test_token(token):
    url = f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={token}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                print(f"SUCCESS! Token: {token}")
                print(response.read().decode())
                return True
    except urllib.error.HTTPError:
        pass
    return False

# Base parts with placeholders
parts = [
    ("a0AT3o", "aOAT3o"),
    ("6gayi", "6gay1", "6gayI"),
    ("1d0v", "1dOv"),
    ("2O4L", "204L"),
    ("JW0SF", "JWOSF"),
    ("AcoSARc", "AcqSARc", "AcaSARc", "AcuSARc", "Aco5ARc", "Acq5ARc"),
    ("A0206", "A02O6", "AO206")
]

template = "ya29.{}NZ9McR5Su_LaP74YQG2RBnH29lmMVK{}6pnnIUmMuzqtkiF0Yr8D1nfG{}HCpLhQT3qw-4XbMGXWE4weAui7rPAwlLEHEFT{}flzS8_pM7__6cGdK5aCSYKUJtGivKTfnIbns4SzscBxxFvMbJ8FZTmhfMn86xfbKs6gLIYr6ZFkdgpZDJ{}zcHvAaCgYK{}SFQHGX2MinP7YXEx7uFRtHki8HPrU-{}"

print("Starting token tests...")
combinations = list(itertools.product(*parts))
total = len(combinations)
print(f"Testing {total} combinations...")

for i, combo in enumerate(combinations):
    token = template.format(*combo)
    if test_token(token):
        break
    if i % 100 == 0:
        print(f"Tested {i}/{total}")

print("Done.")
