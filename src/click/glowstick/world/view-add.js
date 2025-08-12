world.element = document.querySelector("world-")

const regions = [...world]
const k = regions.length

for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) {
 const { [i]: I, [j]: J } = regions
 if (I.overlaps(J)) {
  I.neighbors.push(J)
  J.neighbors.push(I)
 }
}