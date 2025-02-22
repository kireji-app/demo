part.container = element(part.parent.container, "span")
part.populate = layer => {
 if (layer === root.primaryLayer)
  part.container.innerHTML = part.choice[layer].host
}