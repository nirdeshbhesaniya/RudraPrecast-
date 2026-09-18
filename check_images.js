const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1590240974868-6c8cba09b78d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1620242250100-3430043cdae9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541888087401-27ce3397987e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1469502693766-282c0bafcc7b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(`Error ${url}: ${e.message}`);
  });
});
