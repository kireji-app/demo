return `<span id="era-control" tabIndex=0 data-state="${era.arm.stateData}" onpointerdown="console.log('use new pointer handling for this'); ${era.runtimeReference}.setRouteID(1n, true)">
 <span class="label">${era.title}:</span><flex-spacer></flex-spacer>
 <span class="base"><span class="handle"></span></span>
</span>`