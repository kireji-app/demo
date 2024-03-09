const data = atob(content), table = say('<table></table>')[0];

data.parseINI(([k,v])=>{
 const row = table.insertRow()
 row.insertCell().innerHTML = k.websafe()
 if (!v) return;
 row.insertCell().innerHTML = `<pre>${v.websafe()}</pre>`
})