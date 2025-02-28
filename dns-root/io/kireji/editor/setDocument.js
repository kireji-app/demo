part.nodes = {}

part.toolbar = part.parent.parent.getNestedToolbar()
part.toolbar.styleSheet.replaceSync(read("toolbar.css"))
part.parent.styleSheet.replaceSync(read("preview.css"))

part.container = part.parent.parent.container