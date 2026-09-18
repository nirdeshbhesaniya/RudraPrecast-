urls=(
  "https://images.unsplash.com/photo-1590240974868-6c8cba09b78d"
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
  "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9"
  "https://images.unsplash.com/photo-1620242250100-3430043cdae9"
  "https://images.unsplash.com/photo-1541888087401-27ce3397987e"
  "https://images.unsplash.com/photo-1497366216548-37526070297c"
  "https://images.unsplash.com/photo-1469502693766-282c0bafcc7b"
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866"
)

for url in "${urls[@]}"; do
  status=$(curl -o /dev/null -s -w "%{http_code}\n" "$url")
  echo "$status - $url"
done
