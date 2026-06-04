return `
 <url>
  <loc>${thisNote.canonicalURL}</loc>
  <lastmod>${new Date((thisNote.editTimestamp ?? thisNote.key) * 1000).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
 </url>`