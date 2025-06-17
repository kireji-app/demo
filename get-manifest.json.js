const src = desktop.theme.render({ request: "theme.png", format: "datauri" })

return serialize({
 name: desktop.theme.title,
 short_name: desktop.theme.title,
 start_url: "/",
 display: "standalone",
 theme_color: desktop.color.accent,
 background_color: desktop.color.bg,
 icons: [
  {
   src, // request: "theme.png?size=192"
   sizes: "192x192",
   type: "image/png",
   purpose: "any maskable"
  },
  {
   src, // request: "theme.png?size=512"
   sizes: "512x512",
   type: "image/png",
   purpose: "any maskable"
  }
 ],
 description: desktop.theme.description,
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)