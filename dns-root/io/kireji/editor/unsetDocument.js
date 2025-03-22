delete part.container

part.toolbar.styleSheet.replaceSync("")
part.parent[LAYER].styleSheet.replaceSync("")
part.parent[LAYER].parent[LAYER].destroyNestedToolbar()
delete part.toolbar

delete part.nodes