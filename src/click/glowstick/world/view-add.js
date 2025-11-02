world.element = document.querySelector("world-")

for (const region of world)
 region.element = document.querySelector(`world->[data-key="${region.key}"]`)