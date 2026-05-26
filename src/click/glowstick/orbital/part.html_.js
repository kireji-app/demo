return /* html */`<canvas id="onscreen-canvas" ${orbitalGame.clickAttr("doAction")}>
 Your browser does not support the HTML canvas tag.
</canvas>
${orbitalGame.manifest.debug ? orbitalLevel["part.html"] : ""}
<section id=pause-menu>
 <h1>Orbital</h1>
 <h2>Paused</h2>
 <button ${orbitalGame.clickAttr("playGameAsync")}>Play</button>
</section>
<section id=hud>
 <div id=reticle>
  <span class=label>No Action</span>
 </div>
</section>`