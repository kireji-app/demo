part.nodes = {}

part.toolbar = part.parent[LAYER].parent[LAYER].getNestedToolbar()
part.toolbar.styleSheet.replaceSync(read("toolbar.css"))
part.parent[LAYER].styleSheet.replaceSync(read("preview.css"))

part.container = part.parent[LAYER].parent[LAYER].container