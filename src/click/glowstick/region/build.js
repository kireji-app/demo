const xywhCache = region.xywh

// Don't need to check validity of xywh property here because is checked in the dimensions getter.

region.define({
 element: { value: null, writable: true },
 neighbors: { value: [] },
 x: { value: xywhCache[0] },
 y: { value: xywhCache[1] },
})