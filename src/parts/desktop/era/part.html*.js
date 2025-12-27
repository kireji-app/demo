return `<span id="era-control" tabIndex=0 data-state="${era.arm.stateData}" onclick=self._?.noop(event) onpointerdown="${era.runtimeReference}.setRouteID(1n, true)">
 <span class="label">${era.title}:</span><flex-spacer></flex-spacer>
 <span class="base"><span class="handle"></span></span>
</span>`