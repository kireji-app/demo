return `<p>Try opening the menu in the bottom left and visiting another app in the Kireji ecosystem. Don't worry - everything on <i>this</i> app will remain just as you left it, including your scroll position. Likewise, changes you make in another app will be retained when you navigate back to this one.</p>
<p>This is not accomplished using any storage API in javascript and you're not uploading your activity to the server. It's all stored in your address bar, in the URL itself.</p>
<p>The <b>Kireji Web Framework</b> is a reactive framework that unites a collection of apps into a single ecosystem and uses a <b>minimal perfect hash function (MPHF)</b> as its routing system.</p>
<p>My notebook is part of a larger ecosystem called the <b>Kireji Demo App Ecosystem</b>. The cardinality of all of these demo apps together is about ${scientific(_.cardinality, true)}. As an integer, it looks like this:</p>
<pre>${_.cardinality}</pre>
<p>That's a lot of states, but don't worry. You don't have to visit them all. Here's the one you're looking at right now, in base 10:</p>
<pre id=current-state-ecosystem>${_.routeID}</pre>
<p>Here's how it looks as a hash in base 64:</p>
<pre id=current-hash-ecosystem>${encodeSegment(_.routeID)}</pre>
<p>State hashing lays the foundation for the Kireji Web Framework's routing function which provides a permanent URL for every valid state in a given app ecosystem.</p>
<p>To generate the hashing URL to your current state, we join the above hash to the domain name of a specific app (in this case <code>"ejaugust.com"</code>) and the semantic version number of the hash function. That gives us the URL currently in your address bar:</p>
<pre id=current-hash-ecosystem>https://ejaugust.com<output id=current-encoded-pathname>${encodePathname(_.routeID)}</output></pre>
<p>It's quite short, all things considered.</p>
<p>It gives you a robust link back to this exact state - including the other demo apps - so that you can bookmark, share and/or analyze it.</p>`