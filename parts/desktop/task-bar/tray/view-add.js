const updateTime = () => {
 debug('settign minute to ' + new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
 }).format(Date.now()))
 document.getElementById("clock").innerHTML = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
 }).format(Date.now())
}

updateTime()

Object.defineProperty(part, "clockTimer", {
 value: setTimeout(() => {
  updateTime()
  part.clockTimer = setInterval(updateTime, 60000)
 }, 60000 - new Date().getSeconds() + 120), configurable: true, writable: true
})
