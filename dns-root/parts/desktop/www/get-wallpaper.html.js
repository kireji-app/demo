let result = ""

for (const subpart of desktop)
 result += `<desktop-icon><img class=icon /><span class=label>${subpart.title || 'Untitled'}</span></desktop-icon>`

return result