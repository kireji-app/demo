const superset = partMask.createSuperset()

partMask.define({
 cardinality: { value: 2n ** BigInt(superset.length) },
 superset: { value: superset },
 chosenParts: { value: new Set() }
})