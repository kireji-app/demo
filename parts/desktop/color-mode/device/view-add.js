part.query = window.matchMedia?.('(prefers-color-scheme: light)')
part.query.onchange = ({ matches }) => {
 debug('react to getting device color mode here', { light: !!matches })
}
part.query.onchange(part.query)
// user.colorModeButton.setAttribute("data-state", part.stateData)