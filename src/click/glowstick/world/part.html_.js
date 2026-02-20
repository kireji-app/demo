/*const meshData = world.getData()
const scale = glowstick.pixelRatio
const width = Math.max(...meshData.flatMap(triangle => triangle.map(point => point[0]))) * scale
const height = Math.max(...meshData.flatMap(triangle => triangle.map(point => point[1]))) * scale

return /* html * /`
<svg id=world style="---x:${world.x * -1};---y:${world.y * -1}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${meshData.map((triangle, triangleIndex) => /* svg * /`
 <polygon ${triangleIndex === world.triangleIndex ? "class=current" : ""} points="${triangle.map(point => `${point[0] * scale},${point[1] * scale}`).join(' ')}"/>`).join(`
 `)}
</svg>
`.trim()

*/

const meshData = world.getData()
const processed = world.triangles
const scale = glowstick.pixelRatio
const width = Math.max(...meshData.flatMap(points => points.map(point => point[0]))) * scale
const height = Math.max(...meshData.flatMap(points => points.map(point => point[1]))) * scale

// Build the pixel-perfect paths based on the discrete row data
const trianglePaths = processed.map((tri, triangleIndex) => {
 if (!tri.rows || tri.rows.length === 0) return '';

 let leftPoints = [];
 let rightPoints = [];

 tri.rows.forEach(row => {
  if (row) {
   const yTop = row.y * scale;
   const yBot = (row.y + 1) * scale;
   const xL = row.xMin * scale;
   const xR = (row.xMax + 1) * scale;

   // Left side: trace the start of the pixel row
   leftPoints.push(`${xL},${yTop}`);
   leftPoints.push(`${xL},${yBot}`);

   // Right side: trace the end of the pixel row
   rightPoints.push(`${xR},${yTop}`);
   rightPoints.push(`${xR},${yBot}`);
  }
 });

 const pathData = [...leftPoints, ...rightPoints.reverse()].join(' L ');
 const isCurrent = triangleIndex === world.triangleIndex;

 return `<path data-index="${triangleIndex}"
        ${isCurrent ? "class='current'" : ""} 
        d="M ${pathData} Z"
    />`;
}).join('\n ');

// 1px block for character position validation
const charX = Math.floor(world.x) * scale;
const charY = Math.floor(world.y) * scale;
const characterMarker = `
 <rect
  id="player-marker"
  x="${charX}" y="${charY}" 
  width="${scale}" height="${scale}" 
  fill="white" stroke="black" stroke-width="0.5" 
 />`;

return /* html */`
<svg id="world" style="---x:${world.x * -1};---y:${world.y * -1}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
 <defs>
  <pattern id="checkerboard" width="${scale * 2}" height="${scale * 2}" patternUnits="userSpaceOnUse">
   <rect width="${scale}" height="${scale}"/>
   <rect x="${scale}" y="${scale}" width="${scale}" height="${scale}"/>
  </pattern>
 </defs>
 ${trianglePaths}
 ${characterMarker}
</svg>
`.trim();