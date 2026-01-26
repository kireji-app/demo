let imageWidth, imageHeight

let imageOwner = part

while (imageOwner && !imageOwner.filenames.includes(IMAGE_NAME))
 imageOwner = imageOwner.prototype

if (!imageOwner)
 throw new ReferenceError(`can't find placeholder image called "${IMAGE_NAME}" on ${part.instancePath} or any of its prototypes.`)

if (IMAGE_NAME.endsWith(".gif")) {
 const size = atob(imageOwner[IMAGE_NAME].slice(8, 16)).slice(0, 4)
 imageWidth = size.charCodeAt(0) | (size.charCodeAt(1) << 8)
 imageHeight = size.charCodeAt(2) | (size.charCodeAt(3) << 8)
} else if (IMAGE_NAME.endsWith(".png")) {
 const size = atob(imageOwner[IMAGE_NAME].slice(20, 32)).slice(1)
 imageWidth = (size.charCodeAt(0) << 24) | (size.charCodeAt(1) << 16) | (size.charCodeAt(2) << 8) | size.charCodeAt(3)
 imageHeight = (size.charCodeAt(4) << 24) | (size.charCodeAt(5) << 16) | (size.charCodeAt(6) << 8) | size.charCodeAt(7)
} else throw new TypeError(`Unsupported file type for placeholder image "${IMAGE_NAME}" (method supports .gif and .png files only).`)

return `data:image/svg+xml;inert;${imageOwner.host}/${IMAGE_NAME},${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageHeight}"/>`)}`