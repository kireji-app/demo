const uid = `${globalThis.constructor === globalThis.Window ? "client" : "worker"}.core.parts`
this.choice = this[uid]
this.state = this.choice.offset
await this.choice.install()