world.define({
 gridColor: { value: "var(--fg-mode-er)" },
 element: { value: null, writable: true }
})

const regions = [...world]
const k = regions.length

for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) {
 const { [i]: I, [j]: J } = regions
 if (I.overlaps(J)) {
  I.neighbors.push(J)
  J.neighbors.push(I)
 }
}