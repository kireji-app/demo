let result = ""

for (const subpart of desktop)
 result += `<desktop-icon><img class=icon /><span class=label>${subpart.title || 'Untitled'}</span></desktop-icon>`

result += `<pre class=debug>
theme: ${theme.arm.key}
color mode: ${colorMode.arm.key}
vintage mode: ${vintageMode.arm.key}
menu clip: ${menu.arm.key}
menu frame: ${menu.arm.routeID}
</pre>`
return result