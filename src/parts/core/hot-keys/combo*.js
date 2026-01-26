const terminalKeys = new Set()

let context, shift, alt

for (const code of hotKeys.pressed)
 if (code.startsWith(hotKeys.contextPrefix))
  context = true
 else if (code.startsWith("Shift"))
  shift = true
 else if (code.startsWith("Alt"))
  alt = true
 else if (code.startsWith("Key"))
  terminalKeys.add(code.slice(3).toLowerCase())
 else if (code.startsWith("Digit"))
  terminalKeys.add(code.slice(5).toLowerCase())
 else if (/^(Minus|Equal|Semicolon|Quote|Comma|Period|Slash|Backquote|Backslash|Bracket(Right|Left)|Arrow(Up|Down|Left|Right)|Escape|Tab|Enter|Backspace)$/.test(code))
  terminalKeys.add(code.toLowerCase())
 else debug("Unhandled Key Code: " + code)

const combo = [...terminalKeys].sort()

if (shift) combo.unshift("shift")
if (alt) combo.unshift("alt")
if (context) combo.unshift("context")

return combo.join("+")