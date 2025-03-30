const icon_uri = part.render("icon.uri")
const [icon_type] = Framework.headerOf(icon_uri)

return JSON.stringify({
 name: part.niceName || part.host,
 short_name: part.niceName || part.host,
 start_url: "#0",
 display: "standalone",
 theme_color: part.render("theme.color"),
 background_color: "#1f2023",
 icons: [
  {
   src: part.createDataURI(icon_uri, "?size=192"),
   sizes: "192x192",
   type: icon_type,
   purpose: "any maskable"
  },
  {
   src: part.createDataURI(icon_uri, "?size=512"),
   sizes: "512x512",
   type: icon_type,
   purpose: "any maskable"
  }
 ],
 description: "This app is under development.",
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)