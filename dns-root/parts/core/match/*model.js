if (!match.enabled)
 return null

return match.arm.cardinality === 1n ? match.arm.key : {
 [match.arm.key]: match.arm?.model
}