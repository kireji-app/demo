const uid = `${globalThis.constructor === globalThis.Window ? "client" : "worker"}.core.parts`
this.choice[layer] = this[uid]
this.layer[layer] = this.choice[layer].offset
await this.choice[layer].setDocument(layer)