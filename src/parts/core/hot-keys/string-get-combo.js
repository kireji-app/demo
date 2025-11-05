const terminalKeys = new Set()

let context, shift

for (const code of hotKeys.pressed)
 if (code.startsWith(hotKeys.contextPrefix))
  context = true
 else if (code.startsWith("Shift"))
  shift = true
 else if (code.startsWith("Key"))
  terminalKeys.add(code.slice(3).toLowerCase())
 else if (code.startsWith("Digit"))
  terminalKeys.add(code.slice(5).toLowerCase())
 else if (/^(Minus|Equal|Semicolon|Quote|Comma|Period|Slash|Backquote|Backslash|Bracket(Right|Left)|Arrow(Up|Down|Left|Right)|Escape|Tab|Enter|Backspace)$/.test(code))
  terminalKeys.add(code.toLowerCase())
 else warn(code)

const combo = [...terminalKeys].sort()

if (shift) combo.unshift("shift")
if (context) combo.unshift("context")

return combo.join("+")