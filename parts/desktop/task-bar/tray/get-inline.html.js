return `<tray->${share["tray.html"]}${fullscreen["tray.html"]}<span id=clock>${new Intl.DateTimeFormat('en-US', {
 hour: 'numeric',
 minute: 'numeric',
}).format(Date.now())}</span></tray->`