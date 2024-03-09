<script>
 class Shape {
  #cache = {}
  constructor(tags, points, edges, tris, faces) {
   this.tags = tags
   this.points = points
   this.edges = edges
   this.tris = tris
   this.faces = faces
  }
  get length() {
   return this.points.length
  }
  getTaggedPoint(index, method) {
   const point = this.#cache[index] ?? (this.#cache[index] = this.points[index].reduce((result, tag) => ({
    ...result,
    ...this.tags[tag]
   }), {}))
   return method(point)
  }
  getEdge(e) {
   return this.edges[e]
  }
  getEdgePair(t) {
   const pair = this.tris[t].map(e => this.getEdge(e))
   return pair
  }
  getRenderTri(t, method) {
   return Object.values(this.getEdgePair(t).flat().reduce((O, p) => O[p] ? O : (O[p] = this.getTaggedPoint(p, method), O), {}))
  }
  getRenderTris(f, method) {
   return f.map(t => this.getRenderTri(t, method))
  }
  serialize(method) {
   return this.faces.map(f => this.getRenderTris(f, method)).flat(2)
  }
  point_serialize(method) {
   return this.points.map((_, i) => this.getTaggedPoint(i, method))
  }
  xyz(x, y, z, s) {
   const f = s / 2;
   return this.serialize(_ => [_.x * f + x, _.y * f + y, _.z * f + z]).flat()
  }
  point_xyz(x, y, z, s) {
   const f = s / 2;
   return this.point_serialize(_ => [_.x * f + x, _.y * f + y, _.z * f + z])
  }
  get rgba() {
   return this.serialize(_ => [_.r, _.g, _.b, 1]).flat()
  }
  get point_rgba() {
   return this.point_serialize(_ => [_.r, _.g, _.b, 1])
  }
  get g() {
   return this.serialize(_ => _.j)
  }
  get point_g() {
   return this.point_serialize(_ => _.j)
  }
 }
</script>