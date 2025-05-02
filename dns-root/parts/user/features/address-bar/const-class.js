globe.FileHeader ??= class FileHeader {
 static useUTF8 = true
 static textBasedPrefixes = [
  'text/',
  'application/json',
  'application/xml',
  'application/javascript',
  'image/svg+xml'
 ]
 static mimeTypes = {
  'png': 'image/png',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'webp': 'image/webp',
  'ico': 'image/x-icon',
  'html': 'text/html',
  'htm': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'mjs': 'text/javascript',
  'json': 'application/json',
  'xml': 'application/xml',
  'txt': 'text/plain',
  'uri': 'text/uri-list',
  'woff': 'font/woff',
  'woff2': 'font/woff2',
  'ttf': 'font/ttf',
  'otf': 'font/otf',
 }
 #filename
 #extension
 #type
 #binary
 get extension() { return this.#extension }
 get type() { return this.#type }
 get binary() { return this.#binary }
 constructor(filename) {
  const lastDotIndex = filename.lastIndexOf('.')
  this.#filename = filename
  this.#extension = lastDotIndex === -1 || lastDotIndex === filename.length - 1 ? '' : filename.slice(lastDotIndex)
  this.#type = FileHeader.mimeTypes[this.#extension.slice(1).toLowerCase()] || "text/plain"
  this.#binary = !FileHeader.textBasedPrefixes.some(prefix => this.#type.startsWith(prefix))
  if (!this.#binary && FileHeader.useUTF8 && !this.#type.includes('charset'))
   this.#type += ';charset=UTF-8'
 }
 toString() {
  return this.#filename
 }
 toJSON() {
  return {
   filename: this.#filename,
   extension: this.extension,
   type: this.type,
   binary: this.binary
  }
 }
}

globe.Route ??= class Route {
 static defaultDesktopRouteID = 0n
 static defaultHost = "www.core.parts"
 static maxPathLength = 2000
 static maxSegmentLength = 250
 static defaultFilename = 'index.html'
 static pathSegmentRadix = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_0'
 static segmentToRouteID(segment) {
  let binaryValue = "0b0"
  let binaryOffset = "0b0"

  for (const character of segment) {
   const index = Route.pathSegmentRadix.indexOf(character)
   if (index === -1 || index >= 64) {
    warn("Route Error: ignoring unused segment (segments cannot include '" + character + "'). (" + segment + ")")
    binaryValue = "0b0"
    binaryOffset = "0b0"
    break;
   }
   binaryValue += index.toString(2).padStart(6, 0)
   binaryOffset += "000001"
  }
  return BigInt(binaryValue) + BigInt(binaryOffset) - 1n
 }
 static segmentFromRouteID(routeID) {
  routeID++

  let binaryValue = ""
  let segment = ""
  let tempRoute = routeID
  let chunkCount = 0n

  while (tempRoute > 0n) {
   const chunkAddend = 2n ** (chunkCount * 6n)
   if (tempRoute >= chunkAddend) {
    tempRoute -= chunkAddend
    chunkCount++
   } else {
    break
   }
  }

  let offset = 0n
  for (let i = 0n; i < chunkCount; i++)
   offset += 2n ** (i * 6n)

  binaryValue = (routeID - offset).toString(2)

  const finalLength = Number(chunkCount) * 6
  const paddedBinaryString = binaryValue.padStart(finalLength, '0')

  for (let i = 0; i < finalLength; i += 6) {
   const hexad = paddedBinaryString.slice(i, i + 6)
   segment += Route.pathSegmentRadix[parseInt(hexad, 2)]
  }

  return segment
 }

 #filename
 #segments
 #routeIDs
 #path
 #mark
 #header
 #url
 #desktopRouteID
 #taskRouteIDs

 constructor(url, base) {
  this.#url = new URL(url, base)
  if (!(this.#url.host in theme)) {
   this.#url.port &&= ''
   this.#url.host = Route.defaultHost
  }
  this.pathname = this.#url.pathname
 }

 get header() { return this.#header }

 get protocol() { return this.#url.protocol }
 set protocol(value) { this.#url.protocol = value }

 get username() { return this.#url.username }
 set username(value) { this.#url.username = value }

 get password() { return this.#url.password }
 set password(value) { this.#url.password = value }

 get hostname() { return this.#url.hostname }

 set hostname(value) {
  if (!(value in theme))
   value = Route.defaultHost
  this.#url.hostname = value
 }

 get host() { return this.#url.host }
 set host(value) {
  if (!(value in theme))
   value = Route.defaultHost
  this.#url.host = value
 }

 get origin() { return this.#url.origin }

 get pathname() { return this.#url.pathname }
 set pathname(pathname) {
  this.#path = String(pathname) || '/'
  this.#filename = ''
  this.#mark = ''
  if (this.#path.endsWith('!')) {
   const lastSlashIndex = this.#path.lastIndexOf('/')
   const filenameSegment = this.#path.substring(lastSlashIndex + 1, this.#path.length - 1)
   if (filenameSegment && filenameSegment !== Route.defaultFilename) {

    if (!/^[A-Za-z0-9_.-]+$/.test(filenameSegment))
     throw new TypeError("Route Error: filename contained invalid characters. " + filenameSegment)

    this.#filename = filenameSegment
    this.#mark = '!'
   }
   this.#path = this.#path.substring(0, lastSlashIndex + 1)
  }
  this.#routeIDs = []
  this.#segments = this.#path.split('/').filter(segment => {
   if (!segment)
    return

   const routeID = Route.segmentToRouteID(segment)

   if (routeID === -1n)
    return

   this.#routeIDs.push(routeID)
   return true
  })
  if (!this.#segments.length || this.#routeIDs[0] >= desktop.cardinality) {
   this.#routeIDs[0] = Route.defaultDesktopRouteID
   this.#segments[0] = Route.defaultDesktopSegment
   warn(new RangeError('Encountered out-of-range desktop routeID while setting pathname of Route.'), { route: this, pathname })
  }
  this.#path = `/${this.#segments.join("/")}${this.#segments.length ? "/" : ""}`
  this.#header = new FileHeader(this.#filename || Route.defaultFilename)
  this.#url.pathname = `${this.#path}${this.#filename}${this.#mark}`
  this.#taskRouteIDs = [...this.#routeIDs]
  this.#desktopRouteID = this.#taskRouteIDs.shift()
 }

 get filename() { return this.#filename || Route.defaultFilename }
 set filename(value) { this.pathname = `${this.#path}${value}!` }

 get desktopRouteID() { return this.#desktopRouteID }
 get taskRouteIDs() { return this.#taskRouteIDs }

 get extension() { return this.#header.extension }
 get type() { return this.#header.type }
 get binary() { return this.#header.binary }

 get segments() { return [...this.#segments] }
 set segments(segments) { this.pathname = `/${segments.join("/")}${segments.length ? "/" : ""}${this.#filename}${this.#mark}` }

 get routeIDs() { return [...this.#routeIDs] }
 set routeIDs(newRouteIDs) { this.segments = newRouteIDs.map(routeID => Route.segmentFromRouteID(routeID)) }

 get path() { return this.#path }
 set path(path) { this.pathname = `${path}${this.#filename}${this.#mark}` }

 get search() { return this.#url.search }
 set search(value) { this.#url.search = value }

 get searchParams() { return this.#url.searchParams }

 get hash() { return this.#url.hash }
 set hash(value) { this.#url.hash = value }

 get href() { return this.#url.href }
 set href(value) { this.#url.href = value }

 toJSON() { return this.#url.toJSON() }
 toString() { return this.#url.toString() }
}

Route.defaultDesktopSegment = Route.segmentFromRouteID(Route.defaultDesktopRouteID)
Route.maxSegmentCardinality = (64n ** 251n - 64n) / 63n

if (false) Do_Fuzz_Test: {
 for (const href of [
  "https://example.com/one/file.jpeg!",
  "https://example.com/one/two!",
  "https://example.com/one/two/three",
  "https://example.com/one//two/three/four///",
  "https://five.example.com/one//two/three/four///file.png!?myQuery=here#hash123",
  "https://six.example.com",
  "https://localhost:3000/v1/asd/f$Fv-/t-2-34/fwegr-g",
  "https://localhost:3000/"
 ]) {
  const r = new Route(href)
  const filenames = ["myFile.jpeg", "suziesFile.txt", "sarahsFile.pdf", "alexsFile.exe"]
  openLog(0, serialize(r))
  for (const prop of ["href", "path", "pathname", "routeIDs", "segments", "filename", "binary", "extension", "header"]) {
   debug(prop + " before change: " + serialize(r[prop]))
   const randomInteger = BigInt(Math.trunc(Math.random() * filenames.length))
   debug("change: set filename to " + filenames[randomInteger])
   r.filename = filenames[randomInteger]
   debug(prop + " after change: " + serialize(r[prop]))
  }
  closeLog(0)
 }
}