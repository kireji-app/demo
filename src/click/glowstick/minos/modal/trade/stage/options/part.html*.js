const options = []

for (let optionIndex = 0n; optionIndex < minosTradeStage.confirm.cardinality; optionIndex++)
 options.push(`<button ${minosTradeOptions.pointAttr("point", optionIndex)}>Replacement #${optionIndex}</button>`)

return `<h2>Trade piece #${minosTradeModal.target.routeID}</h2>${minosTradeOptions.scroller.wrap(options.join(""))}`