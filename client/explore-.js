const panes = {};

let active = undefined;

incoming(word => {
 const pane = panes[word] = echo(word)[0]
})

ON['goto tab'](word => {
 active?.unset('selected')
 active = panes[word]
 active.set('selected')
});