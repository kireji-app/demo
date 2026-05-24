const [points] = mesh.data.collision
const scale = 1
const width = Math.max(...points.flatMap(point => point[0])) * scale
const height = Math.max(...points.flatMap(point => point[1])) * scale

return /* html */`
<world- style="--x:${mesh.position.x * -1};--y:${mesh.position.y * -1};--user-x:${Math.floor(mesh.position.x)};--user-y:${Math.floor(mesh.position.y)}">
 <svg width="${width + 100 * scale}" height="${height + 100 * scale}" viewBox="${scale * -50} ${scale * -50} ${width + 100 * scale} ${height + 100 * scale}">
  <defs>
   <pattern id="checkerboard" width="${scale * 2}" height="${scale * 2}" patternUnits="userSpaceOnUse">
    <rect width="${scale}" height="${scale}"/>
    <rect x="${scale}" y="${scale}" width="${scale}" height="${scale}"/>
   </pattern>
  </defs>
  ${mesh.triTable.map((triData, triIndex) => {

 if (!triData.rows || triData.rows.length === 0)
  return ''

 let leftPoints = []
 let rightPoints = []

 triData.rows.forEach(row => {
  if (row) {
   const yTop = row.y * scale
   const yBot = (row.y + 1) * scale
   const xL = row.range.min * scale
   const xR = (row.range.max + 1) * scale

   // Left side: trace the start of the pixel row.
   leftPoints.push(`${xL},${yTop}`)
   leftPoints.push(`${xL},${yBot}`)

   // Right side: trace the end of the pixel row.
   rightPoints.push(`${xR},${yTop}`)
   rightPoints.push(`${xR},${yBot}`)
  }
 })

 return /* svg */`<path data-index="${triIndex}" ${triIndex === mesh.triIndex ? "class=current " : ""}d="M ${[...leftPoints, ...rightPoints.reverse()].join(' L ')} Z"/>`
}).join(`
   `)}
  <rect id="player-marker" x="${mesh.position.x * scale}" y="${mesh.position.y * scale}" width="${scale}" height="${scale}" fill="white" stroke="black" stroke-width="0.5"/>
 </svg>
</world->
<ui->
 <span class=debug>
  ${mesh["coords.html"]}
 </span>
</ui->`.trim()