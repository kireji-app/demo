return /* html */`<canvas id="onscreen-canvas">
 Your browser does not support the HTML canvas tag.
</canvas>
${orbitalGame.manifest.debug ? orbitalLevel["part.html"] : ""}
<section id=hud>${orbitalGame["hud.html"]}</section>
<section id=pause-menu>${orbitalGame["pause-menu.html"]}</section>`