const [points] = thisWalkable.data.walkable
const scale = 1
const mapTop = Math.min(...points.flatMap(point => point[2])) * scale
const mapRight = Math.max(...points.flatMap(point => point[0])) * scale
const mapBottom = Math.max(...points.flatMap(point => point[2])) * scale
const mapLeft = Math.min(...points.flatMap(point => point[0])) * scale

return /* html */`
<world- style="--map-left:${mapLeft};--map-top:${mapTop};--x:${thisWalkable.position.x * -1};--z:${thisWalkable.position.z * -1};--user-x:${thisWalkable.position.x};--user-z:${thisWalkable.position.z}">
 <svg width="${mapRight - mapLeft}" height="${mapBottom - mapTop}" viewBox="${mapLeft} ${mapTop} ${mapRight - mapLeft} ${mapBottom - mapTop}">
  <defs>
   <pattern id="checkerboard" width="${scale * 2}" height="${scale * 2}" patternUnits="userSpaceOnUse">
    <rect width="${scale}" height="${scale}"/>
    <rect x="${scale}" y="${scale}" width="${scale}" height="${scale}"/>
   </pattern>
  </defs>
  ${thisWalkable.triTable.map((triData, triIndex) => {

 if (!triData.rows || triData.rows.length === 0)
  return ''

 let leftPoints = []
 let rightPoints = []

 triData.rows.forEach(row => {
  if (row) {
   const zTop = row.z * scale
   const zBot = (row.z + 1) * scale
   const xL = row.xyRange.min.x * scale
   const xR = (row.xyRange.max.x + 1) * scale

   // Left side: trace the start of the pixel row.
   leftPoints.push(`${xL},${zTop}`)
   leftPoints.push(`${xL},${zBot}`)

   // Right side: trace the end of the pixel row.
   rightPoints.push(`${xR},${zTop}`)
   rightPoints.push(`${xR},${zBot}`)
  }
 })

 return /* svg */`<path data-index="${triIndex}" ${triIndex === thisWalkable.triIndex ? "class=current " : ""}d="M ${[...leftPoints, ...rightPoints.reverse()].join(' L ')} Z"/>`
}).join(`
   `)}
  <rect id="player-marker" x="${thisWalkable.position.x * scale}" y="${thisWalkable.position.z * scale}" width="${scale}" height="${scale}" fill="white" stroke="black" stroke-width="0.5"/>
 </svg>
</world->
<ui->
 <span class=debug>
  ${thisWalkable["coords.html"]}
 </span>
</ui->`.trim()