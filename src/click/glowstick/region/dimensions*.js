const xywhCache = region.xywh

if (!Array.isArray(xywhCache) || xywhCache.some(member => typeof member !== "bigint" && isNaN(member)) || xywhCache.length !== 4)
 throw new TypeError(`Cannot create region ${region.host} because its "xywh" property is invalid.`)

return xywhCache.slice(2)