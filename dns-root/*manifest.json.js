const src = `data:image/png;base64,${_.application["part.png"]}`

return serialize({
 name: _.application.title ?? "Untitled App",
 short_name: _.application.title ?? "untitled",
 start_url: `/${_.version}/${_.landingHash}/`,
 scope: `/${_.version}/`,
 display: "standalone",
 theme_color: color.bg,
 background_color: color.bg,
 icons: [
  {
   src,
   sizes: "192x192",
   type: "image/png",
   purpose: "any maskable"
  },
  {
   src,
   sizes: "512x512",
   type: "image/png",
   purpose: "any maskable"
  }
 ],
 description: _.application.description ?? "This is a part of something bigger.",
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)