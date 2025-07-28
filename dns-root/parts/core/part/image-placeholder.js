let width, height

if (IMAGE_NAME.endsWith(".gif")) {
 const size = atob(part[IMAGE_NAME].slice(8, 16)).slice(0, 4)
 width = size.charCodeAt(0) | (size.charCodeAt(1) << 8)
 height = size.charCodeAt(2) | (size.charCodeAt(3) << 8)
} else if (IMAGE_NAME.endsWith(".png")) {
 const size = atob(part[IMAGE_NAME].slice(20, 32)).slice(1)
 width = (size.charCodeAt(0) << 24) | (size.charCodeAt(1) << 16) | (size.charCodeAt(2) << 8) | size.charCodeAt(3)
 height = (size.charCodeAt(4) << 24) | (size.charCodeAt(5) << 16) | (size.charCodeAt(6) << 8) | size.charCodeAt(7)
} else throw new TypeError(`Unsupported file type for placeholder image "${IMAGE_NAME}" (method supports .gif and .png files only).`)

let imgOwner = part

while (imgOwner && !imgOwner.filenames.includes(IMAGE_NAME))
 imgOwner = imgOwner.prototype

return `data:image/svg+xml;inert;${imgOwner.host}/${IMAGE_NAME},${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"/>`)}`