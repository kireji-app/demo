globe.title = part

if (!PART_MANIFEST)
 throw new PartError("No part manifest was provided.")

super({
 info: "info.glowstick.click",
 ...PART_MANIFEST
})