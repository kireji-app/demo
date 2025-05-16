part.query = window.matchMedia?.('(prefers-color-scheme: light)')
part.query.onchange = ({ matches }) => {
 debug('just got user\'s device color mode', { light: !!matches })
}
part.query.onchange(part.query)
// user.colorModeButton.setAttribute("data-state", part.stateData)