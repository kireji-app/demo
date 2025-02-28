delete part.container

part.toolbar.styleSheet.replaceSync("")
part.parent.styleSheet.replaceSync("")
part.parent.parent.destroyNestedToolbar()
delete part.toolbar

delete part.nodes