delete this.container

this.toolbar.styleSheet.replaceSync("")
this.parent.styleSheet.replaceSync("")
this.parent.parent.destroyNestedToolbar()
delete this.toolbar

delete this.nodes