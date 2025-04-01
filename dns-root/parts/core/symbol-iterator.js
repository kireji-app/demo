let i = 0

return {
 next: () => ({
  done: i === part.length,
  value: part[i++]
 })
}