return `<span id="color-control" tabIndex=0 data-state="${color.arm.stateData}" onpointerdown="console.log('use new pointer handling for this'); ${color.runtimeReference}.setRouteID(1n, true)">
 <span class="label">${color.title}:</span><flex-spacer></flex-spacer>
 <span class="base"><span class="handle"></span></span>
</span>`