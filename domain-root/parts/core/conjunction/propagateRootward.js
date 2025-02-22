if (instances)
 for (const instance of instances) {
  this.layer[layer] += (instance.layer[layer] - instance.layerCache[layer]) * instance.conjunctionDivisor
  instance.layerCache[layer] = instance.layer[layer]
 }

super(instances)