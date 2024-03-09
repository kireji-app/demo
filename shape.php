<script>
 class Shape {
  get companyId() {
   return 'shape'
  }
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
  getEdgePoints(e, method) {
   return e.map(p => this.getTaggedPoint(p, method))
  }
  serialize_shade(method) {
   return this.faces.map(f => this.getRenderTris(f, method)).flat(2)
  }
  serialize_wire(method) {
   return this.edges.map(e => this.getEdgePoints(e, method)).flat(2)
  }
  serialize_point(method) {
   return this.points.map((_, i) => this.getTaggedPoint(i, method))
  }
  xyz(x, y, z, sx, sy=sx, sz=sx) {
   const fx = sx / 2, fy = sy / 2, fz = sz / 2;
   return this.serialize_shade(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z]).flat()
  }
  wire_xyz(x, y, z, sx, sy=sx, sz=sx) {
   const fx = sx / 2, fy = sy / 2, fz = sz / 2;
   return this.serialize_wire(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z]).flat()
  }
  point_xyz(x, y, z, sx, sy=sx, sz=sx) {
   const fx = sx / 2, fy = sy / 2, fz = sz / 2;
   return this.serialize_point(_ => [_.x * fx + x, _.y * fy + y, _.z * fz + z])
  }
  get rgba() {
   return this.serialize_shade(_ => [_.r, _.g, _.b, (_.a ?? 1)]).flat()
  }
  get wire_rgba() {
   return this.serialize_wire(_ => [_.r, _.g, _.b, (_.a ?? 1)]).flat()
  }
  get point_rgba() {
   return this.serialize_point(_ => [_.r, _.g, _.b, 1])
  }
  get g() {
   return this.serialize_shade(_ => _.layer)
  }
  get wire_g() {
   return this.serialize_wire(_ => _.layer)
  }
  get point_g() {
   return this.serialize_point(_ => _.layer)
  }
  get point_type() {
   return this.serialize_point(_ => Utils.getColorKey(_.type))
  }
 }
</script>