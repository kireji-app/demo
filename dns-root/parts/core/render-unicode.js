const host = addressBar.hostname

return String.fromCodePoint((host[host.startsWith("www.") ? 4 : 0].codePointAt(0) - 'a'.codePointAt(0)) + '𝑎'.codePointAt(0))