if (part.isAbstract)
 throw new Error(`Attempted to remove event listener from abstract part ${part.host}.`)

part.callbacks[EVENT_TYPE]?.delete(CALLBACK)