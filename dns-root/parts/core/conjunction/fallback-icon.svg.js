const italicize = x => String.fromCodePoint((x.codePointAt(0) - 'a'.codePointAt(0)) + '𝑎'.codePointAt(0))
const firstLetter = HOST[HOST.startsWith("www.") ? 4 : 0]
const size = PARAMS.get("size") ?? 512
const theme_color = await part.resolve("theme.color", "#ccc")
const isSelf = part.host === scriptHost

return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <style>
 circle {
  fill: ${theme_color};
 }
 text {
  fill: "#fff";
 }
 </style>
 <circle cx="12" cy="12" r="24" />
 <text x="12" y="12" text-anchor="middle" dominant-baseline="central">${isSelf ? "∏" : italicize(firstLetter)}</text>
</svg>`
