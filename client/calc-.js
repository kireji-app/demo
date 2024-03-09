const playground = echo('')[0],
memory = new Map();

playground.oncalculate = () => {
 memory.set(playground.expression, playground.value)
}