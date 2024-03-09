const glyph = say(`<glyph-${this.has('word') ? ` word=${this.get('word')}` : ''}>`);

let timeout = 0
const observer = new ResizeObserver(([{ contentRect: { width, height } }]) => {
 if (timeout !== 0) clearTimeout(timeout)
 timeout = setTimeout(() => this.style.setProperty('--t', Math.min(width, height)/uw), 20)
})

observer.observe(this)