return /* html */`<canvas id="onscreen-canvas">
 Your browser does not support the HTML canvas tag.
</canvas>
${OrbitalGame.manifest.debug ? OrbitalLevels.arm["part.html"] : ""}
<section id=hud>${OrbitalGame["hud.html"]}</section>
<section id=pause-menu>${OrbitalGame["pause-menu.html"]}</section>`