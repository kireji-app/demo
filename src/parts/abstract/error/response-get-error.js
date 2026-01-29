const payload = {}

if (ERROR_STRING.startsWith("Favicon")) {
 payload.logMessage = "Favicon"
 payload.status = 404
 payload.body = `<span class=thin>📜 favicon.ico -</span><span>We haven't had that spirit here since 1999.</span>`
} else if (ERROR_STRING.startsWith("Config 404")) {
 const version = ERROR_STRING.split(":").pop()
 payload.logMessage = "Config 404"
 payload.status = 404
 payload.body = `<span>We don't have</span><span class=thin>${ERROR_STRING.split(":").pop()}</span><span>... but we have <a href="/sitemap.xml">sitemap.xml</a> and <a href="/humans.txt">humans.txt</a>.</span>`
} else if (ERROR_STRING.startsWith("Bad Version: ")) {
 const version = ERROR_STRING.split(": ").pop()
 payload.logMessage = "Unknown Version"
 payload.status = 404
 payload.body = `<span>Version</span><span class=thin>${version}</span><span>was removed or never existed.</span>`
} else if (ERROR_STRING.startsWith("Bad Canonical Path: ") || ERROR_STRING.startsWith("Unsupported `from` ") || ERROR_STRING.startsWith("Pathname missing ")) {
 payload.logMessage = "Bad Path"
 payload.status = 400
 payload.body = "<span class=thin>The resource you requested</span><span>was removed or never existed.</span>"
} else if (ERROR_STRING.startsWith("Bad Hash Character: ")) {
 const character = ERROR_STRING.split(": ").pop()
 payload.logMessage = "Bad Hash"
 payload.status = 422
 payload.body = `<span>Path contained unsupported character "${character}".</span>`
} else if (ERROR_STRING.startsWith("Unknown Canonical Path: ")) {
 const path = ERROR_STRING.split(": ").pop()
 payload.logMessage = "Path Not Found"
 payload.status = 404
 payload.body = `<span>📄</span><span class=thin>${path.length > 18 ? "The requested path" : `"${path}"`}</span><span>was removed or never existed.</span>`
} else {
 error(ERROR_STRING)
 payload.logMessage = "Server Error"
 payload.status = 500
 payload.body = "<span>An unknown server error occurred.</span>"
}

const themeBGColor = (_.applications[REQUEST_HOST] ?? _.applications[_.defaultApplicationHost])[`theme-light-bg`];
payload.body = `<style>html {
  background-color: var(--bg);
  --app-height: 100vh;
  --bg: ${themeBGColor};
  --bg-un-mode: #${color.blendHex(themeBGColor, "cfcfcf", "multiply")};
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
 }${errorApp.getErrorCSS(payload.body)}
</style>
<body class=app-container>
${errorApp.getErrorHTML(payload.status, payload.body)}
</body>`

return payload