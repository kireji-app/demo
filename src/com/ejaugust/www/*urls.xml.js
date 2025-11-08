return `
 <url>
  <loc>https://www.ejaugust.com/</loc>
  <lastmod>${new Date(ejaugust.notes[ejaugust.notes.length - 1].key * 1000).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
 </url>${ejaugust.notes.map(note => `
 <url>
  <loc>https://www.ejaugust.com//notes/${note.pathname ?? note.key}</loc>
  <lastmod>${new Date((note.editTimestamp ?? note.key) * 1000).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
 </url>`).join("")}`