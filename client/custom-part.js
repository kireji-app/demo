const data = atob(content), menu = say('<part-menu label="Arguments">')[0], table = say('<table></table>')[0];

data.parseINI(([k,v])=>{
 const row = table.insertRow()
 row.insertCell().innerHTML = k.websafe()
 if (!v) return;
 row.insertCell().innerHTML = `<pre>${v.websafe()}</pre>`
})