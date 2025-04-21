const src = theme.arm.render({ request: "theme.png", format: "datauri" })

return serialize({
 name: theme.arm.title || "Untitled Part",
 short_name: theme.arm.title || "untitled",
 start_url: "/",
 display: "standalone",
 theme_color: theme.arm["theme.color"],
 background_color: theme.arm["bg.color"],
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
 description: theme.arm.description,
 display_override: ["window-controls-overlay"],
 categories: ["entertainment", "games", "utilities"],
}, null, 1)