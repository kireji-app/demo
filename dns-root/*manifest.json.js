const src = `data:image/png;base64,${_.application["part.png"]}`

return serialize({
 name: _.application.title ?? "Untitled App",
 short_name: _.application.title ?? "untitled",
 start_url: "/",
 display: "standalone",
 theme_color: desktop.color.accent,
 background_color: desktop.color.bg,
 icons: [
  {
   src, // request: "part.png?size=192"
   sizes: "192x192",
   type: "image/png",
   purpose: "any maskable"
  },
  {
   src, // request: "part.png?size=512"
   sizes: "512x512",
   type: "image/png",
   purpose: "any maskable"
  }
 ],
 description: _.application.description ?? "This is a part of something bigger.",
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)