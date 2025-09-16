const clockElement = document.querySelector("clock-")

const oneMinute = 60000

/** Added because `new Date` is imprecise for security reasons. */
const securityDelay = 10

setTimeout(() => {
 clockElement.textContent = tray.time;
 setInterval(() => clockElement.textContent = tray.time, oneMinute)
}, oneMinute - new Date().getSeconds() * 1000 + securityDelay)