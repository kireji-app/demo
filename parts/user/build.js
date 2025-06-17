Object.defineProperties(part, {
 // Do not include the task subdomain in the cardinality list.
 // TODO: make sure that www always propagates up to this part.
 cardinality: { value: part.www.cardinality }
})