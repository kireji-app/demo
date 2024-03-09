let time = parseInt(t), text_row = 3, row = text_row + 1 + (2 * time), column = 1 + parseInt(x), color = 'blue';
const
 anchored = host.word === this.word,
 is1 = a => a === $1,
 is0 = a => a === $0,
 not = a => is1(a) ? $0 : $1,
 $0 = '0',
 $1 = '1',
 dot = (x, y) => echo(`+<dot- color=${color} x=${x + column} y=${y + row}>+`)[0],
 arrow = (ax, ay, bx, by) => echo(`+<vector- color=${color} ax=${ax + column} ay=${ay + row} bx=${bx + column} by=${by + row}>+`),

 [top_left_raw, top_right_raw] = top.split('.'),
 [bottom_left_raw, bottom_right_raw] = bottom.split('.'),
 top_left = top_left_raw?.replace(/^0+/, '') ?? '',
 bottom_left = bottom_left_raw?.replace(/^0+/, '') ?? '',
 top_right = top_right_raw?.replace(/0+$/, '') ?? '',
 bottom_right = bottom_right_raw?.replace(/0+$/, '') ?? '',
 top_offset = top_left.length,
 bottom_offset = bottom_left.length,
 delta_offset = top_offset - bottom_offset,
 top_no_point = top_left + top_right,
 bottom_no_point = bottom_left + bottom_right;

arrow(top_offset - 0.5, -3, top_offset - 0.5, -1)

let topHeavy = false
for (let a = top_no_point, b = bottom_no_point, i = 1; i < Math.max(a.length, b.length); i++) {
 const aa = a[i] ?? $0, bb = b[i] ?? $0;
 if (aa === bb) continue
 if (is1(aa)) { topHeavy = true; column++ }
 break
}

const
 bottom_adjusted = (topHeavy ? '' : $0) + bottom_no_point,
 top_delta = top_no_point.padEnd(bottom_adjusted.length, $0),
 bottom_delta = bottom_adjusted.padEnd(top_no_point.length, $0);
let
 findings = new Array(bottom_delta.length).fill('0'),
 successor_array = new Array(bottom_delta.length).fill('0'),
 carry = false,
 found = undefined;

[...top_delta].reduceRight((_, a, i, [], b = bottom_delta[i]) => {
 let marked = undefined;
 const
  anchor = () => {
   if (anchored) return
   dot(i, 0)
  },
  find = () => {
   if (found === undefined) {
    found = marked = i
    arrow(i, 1, i, -1)
    findings[i] = '1'
    echo(`+<symbol- color=${color} word=one- x=${i + column} y=${text_row}>+`)
   }
   dot(i, 1)
  },
  serve = () => {
   dot(i, 2)
   successor_array[i] = '1'
  },
  finish = () => {
   if (marked !== undefined) return
   if (!found) return
   if (anchored && bottom_delta.length - i > parseInt(x)) return
   echo(`+<symbol- color=${color} word=zero- x=${i + column} y=${text_row}>+`)
  }
 if (!carry) {
  if (a === b) {
   if (is1(a)) { anchor(); find() }
   finish()
   return
  }
  carry = is1(b)
  if (carry) find()
  else anchor()
  serve()
  finish()
  return
 }
 if (is0(a)) {
  if (is0(b)) serve()
  else find()
  finish()
  return
 }
 anchor()
 carry = is1(b)
 if (carry) { find(); serve() }
 finish()
 return
}, '')

const top_successor_no_point = successor_array.join('');
successor_array.splice(top_offset, 0, '.')
const top_successor = successor_array.join('');

let successor_offset = 0;
for (let a = top_successor_no_point; successor_offset < a.length; successor_offset++) {
 if (is1(a[successor_offset])) break
}

// log(`offset ${successor_offset} top ${top_successor} bottom ${bottom}`)
if (time < 5) {
 say(`<one-platform top=${top_successor} bottom=${bottom} x=${successor_offset} t=${time + 1}>`);
}