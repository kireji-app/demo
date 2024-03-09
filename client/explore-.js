state('tabs');

const panes = {};

let active = undefined;

tabs.split(' ').forEach(word => {
 const pane = panes[word] = echo(word)[0]
});

on.tab(word => {
 active?.unset('selected')
 active = panes[word]
 active.set('selected')
});