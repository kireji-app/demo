const { cos, sin } = Math

// ── World scale ───────────────────────────────────────────────────────────────
// Express near/far/scope in real-world meters and convert to world units here.
// To change unit scale later, only this constant needs updating.
const unitScale = 1  // world units per meter

const near = orbitalCamera.near * unitScale
const far = orbitalCamera.far * unitScale
const scope = orbitalCamera.scope * unitScale

// ── Matrix constructors (row-major, row-vector convention) ────────────────────
const matrix = {
 multiply: (a, b) => new Float32Array([
  a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
  a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
  a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
  a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],

  a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
  a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
  a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
  a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],

  a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
  a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
  a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
  a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],

  a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
  a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
  a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
  a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15],
 ]),

 rx: a => [
  1, 0, 0, 0,
  0, cos(a), sin(a), 0,
  0, -sin(a), cos(a), 0,
  0, 0, 0, 1
 ],

 ry: a => [
  cos(a), 0, -sin(a), 0,
  0, 1, 0, 0,
  sin(a), 0, cos(a), 0,
  0, 0, 0, 1
 ],

 rz: a => [
  cos(a), sin(a), 0, 0,
  -sin(a), cos(a), 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
 ],

 t: (x, y, z) => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  x, y, z, 1
 ]
}

// ── Perspective projection (WebGPU NDC depth range: 0 to 1) ───────────────────
const f = 1.0 / Math.tan((orbitalCamera.fov * Math.PI / 180) / 2)
const aspect = orbitalGame.onscreenContext.canvas.width /
 orbitalGame.onscreenContext.canvas.height
const nf = 1 / (near - far)

const perspective = [
 f / aspect, 0, 0, 0,
 0, f, 0, 0,
 0, 0, far * nf, -1,
 0, 0, far * near * nf, 0
]

// ── View transform chain ──────────────────────────────────────────────────────
// Reading right to left: translate to player, rotate, pull back by scope.
// In row-vector convention the rightmost matrix is applied last (closest to P).
const rotation = orbitalCamera.model
const position = orbitalGame.levels.arm.model

const t = matrix.t(-position.x, -orbitalCamera.height - position.y, -position.z)
const ry = matrix.ry(rotation.y * Math.PI / 180)
const rx = matrix.rx(rotation.x * Math.PI / 180)
const rz = matrix.rz(rotation.z * Math.PI / 180)

// Chain: t → ry → rx → rz → perspective
// reduceRight so leftmost matrix is outermost (applied last)
const viewProj = [perspective, rz, rx, ry, t]
 .reduceRight(matrix.multiply)

return new Float32Array([
 ...viewProj,
 _.now / 1000  // globalClock
])