return `
 <url>
  <loc>${note.canonicalURL}</loc>
  <lastmod>${new Date((note.editTimestamp ?? note.key) * 1000).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
 </url>`