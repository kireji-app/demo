scroller.define({
 cardinality: { value: 10_000n },
 content: { value: null, writable: true },
 listener: { value: scrollEvent => scroller.onscroll(scrollEvent) },
 container: { value: null, writable: true },
 observer: { value: null, writable: true },
 scrollBar: { value: null, writable: true },
 thumb: { value: null, writable: true },
 skipDOMUpdate: { value: false, writable: true },
 skipRouteIDUpdate: { value: false, writable: true }
})