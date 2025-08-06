if (part.isAbstract)
 throw new Error(`Attempted to add event listener to abstract part ${part.host}.`)

part.callbacks[EVENT_TYPE]?.add(CALLBACK)