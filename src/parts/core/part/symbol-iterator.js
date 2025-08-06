let i = 0

return {
 next: () => ({
  done: i === part.subpartKeys.length,
  value: part[part.subpartKeys[i++]]
 })
}