return `
 <url>
  <loc>${EJAugustTopics.canonicalURL}</loc>
  <lastmod>${new Date(EJAugustNotes.subparts[EJAugustNotes.length - 1].key * 1000).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
 </url>`