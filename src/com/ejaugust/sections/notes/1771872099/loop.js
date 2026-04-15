if (note.isPlaying) {
 const animFrame = Math.abs(Math.trunc(_.now / note.hangTime) % 10 - 5) * 2
 const depthEven = animFrame === 10 ? Infinity : animFrame
 const depthOdd = depthEven + 1
 Q("#mathML-anim-even").innerHTML = _.mathML(depthEven)
 Q("#mathML-anim-odd").innerHTML = _.mathML(depthOdd)
}