part.query = window.matchMedia?.('(prefers-color-scheme: light)')
part.query.onchange = ({ matches }) => part.light = !!matches
part.query.onchange(part.query)
base()