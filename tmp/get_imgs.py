import urllib.request
import re

url = "https://www.shoppingdesign.com.tw/post/view/4576"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        imgs = re.findall(r'https://[^"\'\s]+\.(?:jpg|png|jpeg)', html)
        print(f"Found {len(imgs)} images:")
        for img in imgs[:10]:
            print(img)
except Exception as e:
    print(e)
