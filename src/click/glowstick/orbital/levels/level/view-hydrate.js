orbitalLevel.element = Q("world-")
orbitalLevel.camera = Vector.multiply(mesh.position, -1)
orbitalLevel.viewedTriIndex = mesh.triIndex
orbitalLevel.viewedPosition = { ...mesh.position }