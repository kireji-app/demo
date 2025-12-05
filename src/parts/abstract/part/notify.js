if (part.isAbstract)
 throw new Error(`Cannot notify from abstract part ${part.host}.`)

if (typeof EVENT_TYPE !== "string")
 throw new Error(`EVENT_TYPE must be a string (while trying to notify from ${part.host}).`)

if (!(EVENT_TYPE in part.callbacks))
 throw new Error(`Cannot notify unknown event type "${EVENT_TYPE}" (while trying to notify from ${part.host}).`)

for (const key in part.callbacks[EVENT_TYPE]) {
 const [receiver, callbackName] = part.callbacks[EVENT_TYPE][key]
 receiver[callbackName](part)
}