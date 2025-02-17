this.nodes = {}

this.toolbar = this.parent.parent.getNestedToolbar()
this.toolbar.styleSheet.replaceSync(archive[this.uid]["toolbar.css"])
this.parent.styleSheet.replaceSync(archive[this.uid]["preview.css"])

this.container = this.parent.parent.container