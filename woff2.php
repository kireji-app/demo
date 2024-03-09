<script>
 class Woff2 {

  #source = undefined
  #byteCount = 0
  #header = undefined
  #tableDirectory = undefined
  #collectionDirectory = undefined
  #compressedFontData = undefined
  #extendedMetaData = undefined
  #privateData = undefined

  constructor(src) {
   const
    UINT16_255 = new Type(
     view => {
      throw 'not ready'
     },
     (view, uint16255) => {
      throw 'not ready'
     },
     1
    ),
    UINTBASE128 = new Type(
     view => {
      let accum = 0;
      for (let i = 0; i < view.byteLength; i++) {
       const data_byte = view.getUint8(i);
       if (i == 0 && data_byte == 0x80) throw 'UIntBase128 with leading zeros';
       if (accum & 0xFE000000) throw 'UIntBase128 top 7 bits are set';
       accum = (accum << 7) | (data_byte & 0x7F);
      }
      return accum;
     },
     (view, uintBase128) => {
      throw 'not ready'
     },
     5,
     'Variable-length base-128 sequence',
     byte => (byte & 0x80) == 0
    ),
    FLAG = Enum(
     UINT8,
     [
      'cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm', 'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT',
      'EBLC', 'gasp', 'hdmx', 'kern', 'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH',
      'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar',
      'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat', 'Gloc', 'Feat', 'Sill', 'cust'
     ],
     1,
     'Table directory flags'
    );
   if (!(src instanceof ArrayBuffer))
    throw 'Woff2 constructor requires an ArrayBuffer';

   this.#source = src;

   this.#header = new Struct(
    src, this.#byteCount,
    [WORD, 'signature'],
    [WORD, 'flavor'],
    [UINT32, 'length'],
    [UINT16, 'numTables'],
    [UINT16, 'reserved', false],
    [UINT32, 'totalSfntSize'],
    [UINT32, 'totalCompressedSize'],
    [UINT16, 'majorVersion'],
    [UINT16, 'minorVersion'],
    [UINT32, 'metaOffset'],
    [UINT32, 'metaLength'],
    [UINT32, 'metaOrigLength'],
    [UINT32, 'privOffset'],
    [UINT32, 'privLength'],
   );;
   this.#tableDirectory = new Struct(
    src, this.#byteCount += this.header.byteCount,
    [FLAG, 'flags'],
    [WORD, 'tag', null, null, struct => struct.flags == 'cust'],
    [UINTBASE128, 'origLength'],
    [UINTBASE128, 'transformLength', null, null, struct => ['hmtx', 'loca', 'glyf'].includes(struct.flags)],
   );
   if (this.header.flavor == '')

    /*
       this.#collectionDirectory = new Struct(src, cursor, [
       
       ])

       this.#compressedFontData = new Struct(src, cursor, [
       
       ])

       this.#extendedMetaData = new Struct(src, cursor, [
       
       ])

       this.#privateData = new Struct(src, cursor, [
       
       ])*/
    if (this.header.signature !== 'wOF2') throw 'Invalid Woff2 file!';
  }

  get header() {
   return this.#header
  }

  get tableDirectory() {
   return this.#tableDirectory
  }

  get collectionDirectory() {
   return this.#collectionDirectory
  }

  get compressedFontData() {
   return this.#compressedFontData
  }

  get extendedMetaData() {
   return this.#extendedMetaData
  }

  get privateData() {
   return this.#privateData
  }

  get byteCount() {
   return this.#byteCount
  }

  toFontFace(family) {
   return new FontFace(family, this.#source)
  }
 }
</script>