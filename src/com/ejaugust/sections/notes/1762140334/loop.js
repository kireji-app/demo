const { now } = _
Q("#timestamp-s>span").innerHTML = Math.floor(now / 1000)
Q("#timestamp-ms>span").innerHTML = Math.floor(now)
Q("#timestamp-μs>span").innerHTML = Math.floor(now * 1000)