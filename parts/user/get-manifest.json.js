const src = root.parts.user.themes.arm.render({ request: "theme.png", format: "datauri" })

return serialize({
 name: root.parts.user.themes.arm.title,
 short_name: root.parts.user.themes.arm.title,
 start_url: "/",
 display: "standalone",
 theme_color: root.parts.desktop.color.accent,
 background_color: root.parts.desktop.color.bg,
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
 description: root.parts.user.themes.arm.description,
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)