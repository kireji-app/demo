const landingRID = OrbitalGame.modelToRID(_.landingModel.click.glowstick.orbital)
const isLandingRID = OrbitalGame.rid === landingRID

return /* html */`<h1>Orbital</h1>` + (isLandingRID ? /* html */`
<button ${OrbitalGame.pointAttr("playPoint")}>Campaign</button>
<button disabled></button>
` : /* html */`
<button ${OrbitalGame.pointAttr("playPoint")}>Resume Game</button>
<button ${OrbitalGame.pointAttr("restartPoint")}>Restart Level</button>
`) + (/* html */`
<button disabled ${OrbitalGame.pointAttr("settingsPoint")}>Settings (Coming Soon)</button>
<button disabled ${OrbitalGame.pointAttr("creditsPoint")}>Credits (Coming Soon)</button>
<button ${Windows.pointAttr("closePoint")}>Quit</button>
`)