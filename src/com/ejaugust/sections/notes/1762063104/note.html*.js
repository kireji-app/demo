return `<p>This notebook is a component in the Kireji Demo app ecosystem, where it's represented by runtime controllers in the <code>"ejaugust.com"</code> namespace.</p>
<p>This notebook can be in ${_.com.ejaugust.cardinality} states. This tells us the size of the notebook's configuration space.</pre>
<p>When you interact with the notebook, you change its state (even when you're just scrolling the page). Right now, its current state is:</p>
<pre id=current-state-app>${_.com.ejaugust.routeID}</pre>
<p>The base64 hash of this state is:</p>
<pre id=current-hash-app>"${encodeSegment(_.com.ejaugust.routeID)}"</pre>
<p>The <b>Kireji Web Framework</b> employs this state hashing in its routing system, providing a permalink to every notebook state and updating the URL in your addressbar in realtime as you interact with the notes.</p>
<p>However, because this notebook is embedded into a larger app ecosystem, the URL in your addressbar is a little more complicated than this simple hash. Check out <a ${_.pointAttr()} href=https://ejaugust.com/notes/1762063947>this note</a> to see the state of the ecosystem as a whole.</p>`