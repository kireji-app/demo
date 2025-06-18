part.query = window.matchMedia?.('(prefers-color-scheme: light)')
part.query.onchange = ({ matches }) => part.light = !!matches
part.query.onchange(part.query)
// _.parts.user.colorModeButton.setAttribute("data-state", part.stateData)
debug('added device mode here')