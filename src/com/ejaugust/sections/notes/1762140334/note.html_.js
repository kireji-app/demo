const { now } = _
return `<p>Without clocks, we'd be free from the tyranny of the schedule. Until then, here is the current unix timestamp.</p>
<p><b>Click or tap</b> the timestamp to copy it to the clipboard.</p>
<h2>Seconds</h2>
<pre ${note.pointAttr()} id="timestamp-s" class="copyable"><span>${Math.floor(now / 1000)}</span></pre>
<h2>Milliseconds</h2>
<pre ${note.pointAttr()} id="timestamp-ms" class="copyable"><span>${Math.floor(now)}</span></pre>
<h2>Microseconds</h2>
<pre ${note.pointAttr()} id="timestamp-μs" class="copyable"><span>${Math.floor(now * 1000)}</span></pre>`