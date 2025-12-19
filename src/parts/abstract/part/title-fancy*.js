const domains = [...part.domains]

const tld = domains.pop()
const chars = []

for (const domain of domains) {
 for (const char of domain)
  chars.push(String.fromCodePoint((char.codePointAt(0) - 'a'.codePointAt(0)) + '𝗮'.codePointAt(0)))
 chars.push(".")
}

for (const char of tld)
 chars.push(String.fromCodePoint((char.codePointAt(0) - 'a'.codePointAt(0)) + '𝑎'.codePointAt(0)))

return chars.join("")