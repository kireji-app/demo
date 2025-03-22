delete part.parent[LAYER].task
delete part.task

if (part.windowArray) {
 part.windowArray.splice(part.windowIndex, 1)
 delete part.windowArray
 delete part.windowIndex
}