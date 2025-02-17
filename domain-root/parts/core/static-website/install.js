this.styleSheet = this.parent.styleSheet
this.styleSheet.replaceSync(archive[this.uid]["style.css"])

this.container = this.parent.container
this.container.innerHTML = archive[this.uid]["body.html"]