world.element = Q("world-")

for (const region of world)
 region.element = Q(`world->[data-key="${region.key}"]`)