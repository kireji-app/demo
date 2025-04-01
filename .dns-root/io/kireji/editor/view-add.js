part.nodes = {}

part.toolbar = part.parent.parent.getNestedToolbar()
part.toolbar.styleSheet.replaceSync(framework.openOwnStaticFile("toolbar.css"))
part.parent.styleSheet.replaceSync(framework.openOwnStaticFile("preview.css"))

part.container = part.parent.parent.container