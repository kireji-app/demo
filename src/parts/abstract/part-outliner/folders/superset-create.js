const superset = []

for (let i = 0; i < allParts.length; i++) {
 const childPart = allParts[i]
 const childArray = folders[".."].getChildren(childPart)

 if (childArray.length)
  superset.push(childPart)
}

return superset