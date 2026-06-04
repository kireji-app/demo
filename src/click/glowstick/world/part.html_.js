const [points] = GlowstickWorld.data.walkable
const scale = 1
const width = Math.max(...points.flatMap(point => point[0])) * scale
const height = Math.max(...points.flatMap(point => point[1])) * scale

const props = []
for (let index = 0; index < GlowstickWorld.manifest.props.length; index += 7) {
 const [sheetIndex, top, left, width, height, offsetLeft, offsetTop] = GlowstickWorld.manifest.props.slice(index, index + 7)
 const sheetData = GlowstickWorld.manifest.sheets[sheetIndex]
 props.push({ sheet: { name: sheetData[0], width: sheetData[1], height: sheetData[2] }, top, left, width, height, offsetLeft, offsetTop })
}

const layout = []
for (let index = 0; index < GlowstickWorld.manifest.layout.length; index += 3) {
 const [propIndex, left, top] = GlowstickWorld.manifest.layout.slice(index, index + 3)
 layout.push({ prop: props[propIndex], propIndex, left, top })
}

return /* html */`
<world- style="--x:${GlowstickWorld.position.x * -1};--z:${GlowstickWorld.position.z * -1};--user-x:${Math.floor(GlowstickWorld.position.x)};--user-z:${Math.floor(GlowstickWorld.position.z)}">
 <svg width="${width + 100 * scale}" height="${height + 100 * scale}" viewBox="${scale * -50} ${scale * -50} ${width + 100 * scale} ${height + 100 * scale}">
  <defs>
   <pattern id="checkerboard" width="${scale * 2}" height="${scale * 2}" patternUnits="userSpaceOnUse">
    <rect width="${scale}" height="${scale}"/>
    <rect x="${scale}" y="${scale}" width="${scale}" height="${scale}"/>
   </pattern>
  </defs>
  ${GlowstickWorld.triTable.map((triData, triIndex) => {

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

 return /* svg */`<path data-index="${triIndex}" ${triIndex === GlowstickWorld.triIndex ? "class=current " : ""}d="M ${[...leftPoints, ...rightPoints.reverse()].join(' L ')} Z"/>`
}).join(`
   `)}
  <rect id="player-marker" x="${GlowstickWorld.position.x * scale}" y="${GlowstickWorld.position.z * scale}" width="${scale}" height="${scale}" fill="white" stroke="black" stroke-width="0.5"/>
 </svg>
${layout.map(({ prop: { sheet: { name, width: sheetWidth, height: sheetHeight }, width, height, offsetLeft, offsetTop, top: propTop, left: propLeft }, top, left }) => /* html */`
 <prop- style="--x:${left - offsetLeft};--z:${top - offsetTop};--z-index:${top};--w:${width};--h:${height};--bg-x:${propLeft};--bg-z:${propTop};--sheet:var(${name});--bg-w:${sheetWidth};--bg-h:${sheetHeight}"></prop->`).join("")}
 ${GlowstickUser["part.html"]}
</world->
<ui->
 <span class=debug>
  ${GlowstickWorld["coords.html"]}
 </span>
</ui->`.trim();