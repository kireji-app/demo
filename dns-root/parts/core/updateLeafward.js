console.groupCollapsed('UPDATE LEAFWARD on ' + part.host)
if (part.previousPrimaryState === -1n) {
 console.log('DOC - ENABLE https://' + part.host)
 await part.setDocument(LAYER)
}
if (part.state[LAYER] !== -1n) {
 console.log('DOC - UPDATE https://' + part.host)
 await part.updateDocument(LAYER)
}
console.groupEnd()