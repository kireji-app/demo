const landingRoute = orbitalGame.modelToRouteID(_.landingModel.click.glowstick.orbital)
const isLandingRoute = orbitalGame.routeID === landingRoute

return /* html */`<h1>Orbital</h1>` + (isLandingRoute ? /* html */`
<button ${orbitalGame.pointAttr("playPoint")}>Campaign</button>
<button disabled></button>
` : /* html */`
<button ${orbitalGame.pointAttr("playPoint")}>Resume Game</button>
<button ${orbitalGame.pointAttr("restartPoint")}>Restart Level</button>
`) + (/* html */`
<button disabled ${orbitalGame.pointAttr("settingsPoint")}>Settings (Coming Soon)</button>
<button disabled ${orbitalGame.pointAttr("creditsPoint")}>Credits (Coming Soon)</button>
<button ${_.parts.desktop.windows.pointAttr("closePoint")}>Quit</button>
`)