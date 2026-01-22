let imgOwner = part

while (imgOwner && !imgOwner.filenames.includes(IMAGE_NAME))
 imgOwner = imgOwner.prototype

if (!imgOwner)
 throw new ReferenceError(`can't find image called "${IMAGE_NAME}" on ${part.instancePath} or any of its prototypes.`)

return `var(--${imgOwner.host.replaceAll("-", "_").replaceAll(".", "-")}--${IMAGE_NAME.replaceAll("-", "_").replaceAll(".", "-")})`