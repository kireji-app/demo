globe.title = part

if (!PART_MANIFEST)
 throw new PartError("No part manifest was provided. " + title.host)

super({
 info: "info.glowstick.click",
 ...PART_MANIFEST
})