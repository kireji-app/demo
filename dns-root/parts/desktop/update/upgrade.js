_.noop(EVENT)
document.body.classList.add("upgrading")
setTimeout(() => {
 const timestamp = Date.now()
 localStorage.setItem(timestamp, serialize(_.model))
 location.href = NONCE_HREF.replace("$2", timestamp)
}, 500)