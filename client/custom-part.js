this.label = 'Storage';
const table = say('<table></table>')[0];

this.code.parseINI(([k,v])=>{
 const row = table.insertRow()
 row.insertCell().innerHTML = k.websafe()
 if (!v) return;
 row.insertCell().innerHTML = `<pre>${v.websafe()}</pre>`
})