if (part.isAbstract)
 throw new Error(`Cannot detach from abstract part ${part.host}.`)

if (typeof EVENT_TYPE !== "string")
 throw new Error(`EVENT_TYPE must be a string (while trying to detach from ${part.host}).`)

if (!(EVENT_TYPE in part.callbacks))
 throw new Error(`Cannot detach from unknown event type "${EVENT_TYPE}" (while trying to detach from ${part.host}).`)

if (!(_.parts.abstract.part.isPrototypeOf(RECEIVER)))
 throw new Error(`Event receiver must be another part (while trying to detach from ${part.host}:${EVENT_TYPE}).`)

delete part.callbacks[EVENT_TYPE][RECEIVER.host + ":" + CALLBACK_NAME]