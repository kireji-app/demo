let result = ""

for (const subpart of user)
 result += `<desktop-icon tabIndex=${subpart.index}><img class=icon /><span class=label>${subpart.title}</span></desktop-icon>`

return result