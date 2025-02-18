this.container = this.parent.container
this.container.innerHTML = `<h1>503</h1><span id=float><img src=icon.svg><span class=thin>${APP_UID}</span><span>is coming soon.</span></span>`

this.styleSheet = this.parent.styleSheet
this.styleSheet.replaceSync(Build.archive[this.uid]["style.css"])