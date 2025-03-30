const italicize = x => String.fromCodePoint((x.codePointAt(0) - 'a'.codePointAt(0)) + '𝑎'.codePointAt(0))
const firstLetter = HOST[HOST.startsWith("www.") ? 4 : 0]
const size = PARAMS.get("size") ?? 512
const theme_color = part.render("theme.color", "#ccc")
const isSelf = part.host === framework.host

return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <style>
 .bg {
  fill: ${theme_color};
 }
 .outside {
  fill: #06f3;
 }
 .inside {
  fill: #fffa;
 }
 .max {
  fill: #00f9;
 }
 .min {
  fill: #ff09;
 }
 .exit {
  fill: #f009;
 }
 text {
  fill: "#fff";
 }
 </style>
 <circle class="bg" cx="12" cy="12" r="24" />
 <rect class="outside" x="2" y="2" width="20" height="16" rx="3" />
 <rect class="inside" x="4" y="6" width="16" height="10" rx="2" />
 <circle class="exit" cx="19" cy="4" r="1.5" />
 <circle class="min" cx="16" cy="4" r="1.5" />
 <circle class="max" cx="13" cy="4" r="1.5" />
 ${isSelf ? "" : `<text x="12" y="12" text-anchor="middle" dominant-baseline="central">${italicize(firstLetter)}</text>`}
</svg>`
