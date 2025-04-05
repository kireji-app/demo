const icon_uri = render({ request: "icon.uri", links: "no-follow" })
const [icon_type] = headerOf(icon_uri)

return JSON.stringify({
 name: render("title") || part.host,
 short_name: render("title") || part.host,
 start_url: "/",
 display: "standalone",
 theme_color: render("theme.color"),
 background_color: render("theme.color"),
 icons: [
  {
   src: render({ request: "icon.uri?size=192", format: "datauri" }),
   sizes: "192x192",
   type: icon_type,
   purpose: "any maskable"
  },
  {
   src: render({ request: "icon.uri?size=512", format: "datauri" }),
   sizes: "512x512",
   type: icon_type,
   purpose: "any maskable"
  }
 ],
 description: render("description"),
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)