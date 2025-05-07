let result = ""

for (const subpart of user)
 result += `<desktop-icon><img class=icon /><span class=label>${subpart.title || 'Untitled'}</span></desktop-icon>`

return result