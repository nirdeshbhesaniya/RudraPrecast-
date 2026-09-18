urls=(
  "https://images.unsplash.com/photo-1504307651254-35680f356f58"
  "https://images.unsplash.com/photo-1541888087401-27ce3397987e" # known 404
  "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77"
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
  "https://images.unsplash.com/photo-1621841348126-7d6fb8b26e10"
  "https://images.unsplash.com/photo-1504624720567-64a40aa611cf"
  "https://images.unsplash.com/photo-1428515613728-6b4607e44363"
  "https://images.unsplash.com/photo-1493606371202-6275828f90f3"
  "https://images.unsplash.com/photo-1590080825316-2da16bc8d1ec"
  "https://images.unsplash.com/photo-1599583995812-7daff37ba7ee"
)

for url in "${urls[@]}"; do
  status=$(curl -o /dev/null -s -w "%{http_code}\n" "$url")
  echo "$status - $url"
done
