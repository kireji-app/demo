if (part.isAbstract)
 throw new Error(`Cannot attach to abstract part ${part.host}.`)

if (typeof EVENT_TYPE !== "string")
 throw new Error(`EVENT_TYPE must be a string (while trying to attach to ${part.host}).`)

if (!(EVENT_TYPE in part.callbacks))
 throw new Error(`Cannot attach to unknown event type "${EVENT_TYPE}" (while trying to attach to ${part.host}).`)

if (!(_.parts.abstract.part.isPrototypeOf(RECEIVER)))
 throw new Error(`Event receiver must be another part (while trying to attach to ${part.host}:${EVENT_TYPE}).`)

part.callbacks[EVENT_TYPE][RECEIVER.host + ":" + CALLBACK_NAME] = [RECEIVER, CALLBACK_NAME]