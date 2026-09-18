import urllib.request
import re

req = urllib.request.Request('https://unsplash.com/s/photos/concrete-wall', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

urls = set(re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9-]+', html))
for u in list(urls)[:10]:
    print(u)
