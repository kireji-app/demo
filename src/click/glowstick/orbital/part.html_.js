return /* html */`<canvas id="onscreen-canvas">
 Your browser does not support the HTML canvas tag.
</canvas>
${orbitalGame.manifest.debug ? orbitalLevel["part.html"] : ""}
<section id=pause-menu>
 <h1>Orbital</h1>
 <h2>Paused</h2>
 <button ${orbitalGame.pointAttr("playGame")}>Play</button>
</section>`