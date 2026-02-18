return `
 <url>
  <loc>${allTopics.canonicalURL}</loc>
  <lastmod>${new Date(notes.subparts[notes.length - 1].key * 1000).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
 </url>`