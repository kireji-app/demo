<script>
 class Type {
  #readView
  #setView
  #logName
  #byteCount
  #terminalBytePredicate
  constructor(readView, setView, byteCount, logName, terminalBytePredicate) {
   this.#readView = readView;
   this.#setView = setView;
   this.#byteCount = byteCount;
   this.#logName = logName;
   this.#terminalBytePredicate = terminalBytePredicate;
  }
  cast(view) {
   let result = undefined;
   try {
    result = this.#readView(view)
   } catch (err) {
    throw err
   }
   return result;
  }
  write(view, data) {
   return this.#setView(view, data);
  }
  get logName() {
   return this.#logName
  }
  countBytes(source, offset) {
   if (this.#terminalBytePredicate) {
    const view = new DataView(source, offset, this.#byteCount);
    for (let i = 0; i < this.#byteCount; i++) {
     const isLast = this.#terminalBytePredicate(view.getUint8(i));
     if (isLast) return i + 1
    }
    throw `${this.logName}: string exceeded expected max length of ${this.#byteCount} (no terminator found)`;
   }
   return this.#byteCount
  }
 }
 const
  DECODER = new TextDecoder(),
  ENCODER = new TextEncoder(),
  NOT_READY = () => {
   throw 'not ready'
  },
  Native = (nameRoot, ...rest) => new Type(
   view => view['get' + nameRoot](0, 1),
   NOT_READY,
   ...rest
  ),
  Wrapper = (type, wrap, unwrap, ...rest) => new Type(
   view => wrap(type.cast(view)),
   (view, wrapped) => type.write(view, unwrap(wrapped)),
   ...rest
  ),
  Enum = (type, values, ...rest) => Wrapper(
   type,
   x => values[x],
   x => values.indexOf(x),
   ...rest
  ),
  FixedString = (...rest) => new Type(
   view => DECODER.decode(view),
   NOT_READY,
   ...rest
  ),
  UINT32 = Native('Uint32', 4, '32-bit unsigned integer'),
  UINT16 = Native('Uint16', 2, '16-bit unsigned integer'),
  INT16 = Native('Int16', 2, '16-bit integer'),
  UINT8 = Native('Uint8', 1, '8-bit unsigned integer'),
  WORD = FixedString(4, 'Four-letter word');
</script>