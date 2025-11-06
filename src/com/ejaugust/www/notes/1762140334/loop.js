const { now } = _
document.querySelector("#timestamp-s>span").innerHTML = Math.floor(now / 1000)
document.querySelector("#timestamp-ms>span").innerHTML = Math.floor(now)
document.querySelector("#timestamp-μs>span").innerHTML = Math.floor(now * 1000)