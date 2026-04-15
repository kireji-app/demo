const alphabet = "0123456789(),-"
return /* html */`
<span class="char" style="--cx:10"></span>
<span>${[...Math.trunc(world.position.x).toString()].map(char => /* html */`
 <span class="char" style="--cx:${alphabet.indexOf(char)}"></span>`).join(`
 `)}
</span>
<span class="char" style="--cx:12"></span>
<span class="char" style="background:transparent"></span>
<span>${[...Math.trunc(world.position.y).toString()].map(char => /* html */`
 <span class="char" style="--cx:${alphabet.indexOf(char)}"></span>`).join(`
 `)}
</span>
<span class="char" style="--cx:11"></span>`