this.styleSheet = this.parent.styleSheet
this.styleSheet.replaceSync(Build.archive[this.uid]["style.css"])

this.container = this.parent.container
this.container.innerHTML = Build.archive[this.uid]["body.html"]