const container = ELEMENT.parentElement.parentElement
const opened = container.hasAttribute("open")
container[`${opened ? "remove" : "set"}Attribute`]("open", "")
ELEMENT.innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />
${opened ? `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />` : ``}`