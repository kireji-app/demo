return `
 <url>
  <loc>https://${ejaugust.host}/</loc>
  <lastmod>${new Date(notes[notes.length - 1].key * 1000).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
 </url>${notes.map(note => `
 <url>
  <loc>https://${ejaugust.host}/notes/${note.pathname ?? note.key}</loc>
  <lastmod>${new Date((note.editTimestamp ?? note.key) * 1000).toISOString()}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
 </url>`).join("")}`