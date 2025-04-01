part.containerHost = document.createElement("window-")
desktop.taskbar.before(part.containerHost)
part.container = part.containerHost.attachShadow({ mode: "open" })
part.styleSheet = new CSSStyleSheet()
part.container.adoptedStyleSheets = [part.styleSheet]