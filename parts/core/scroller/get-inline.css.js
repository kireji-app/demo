return `body[inert] ${scroller.query}>outer-wrapper>inner-wrapper {
 transform: translateY(-${100 * Number(scroller.routeID) / Number(scroller.cardinality - 1n)}%);
}

${scroller.query}>outer-wrapper>inner-wrapper {
 display: block;
}`