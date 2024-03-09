let t = 0
ON['shorts'](() => t++)
if (t === 0) {
 const buffer = buffers['shorts.ini'];
 dictionary.forEach(definition => {
  const
   w = definition.word,
   { index, 0: result } = buffer.match(new RegExp(`^${w}=.*(?![\s\S]*${w})`, 'm')) ?? {};
  if (result) {
   const start = index + w.length + 1, end = index + result.length;
   Object.defineProperties(definition, {
    short: {
     get() {
      return buffer.slice(start, end)
     }
    }
   })
  }
 })
 DO['shorts']()
}
if (!statics.cssMarks) {
 const
  chars = statics.characters = new Map,
  unmarked = new Set(dictionary.glossary);
 let fallback;
 statics.cssMarks = buffers['glyphs.ini'].split('\n').map(_ => {
  const result = _.match(/([\w-]+)=(\w+)/);
  if (!result) return '';
  const
   [, a, b] = result,
   code = parseInt(b, 16),
   cmd = a === 'fallback-' ? (fallback = code, '') : `([word="${a}"])`;
  if (!chars.has(code)) chars.set(code, new Set)
  chars.get(code).add(a)
  if (unmarked.has(a)) unmarked.delete(a)
  return `:host${cmd} {\n\t--mark: "\\${b}";\n}`;
 }).join('\n');
 if (!fallback) error('No fallback- key in glyphs.ini')
 else {
  const fallbackSet = chars.get(fallback);
  unmarked.forEach(a => fallbackSet.add(a))
 }
}