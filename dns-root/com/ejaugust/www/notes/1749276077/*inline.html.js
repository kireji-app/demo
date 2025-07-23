const dynamicSection = _.built ? `<p>This notebook app is represented by a controller with the host name <code>"ejaugust.com"</code>. Here's how many states it has:</p>
<pre>${_.com.ejaugust.cardinality}</pre>
<p>Right now, this is which state its in, as an integer:</p>
<pre id=current-state-app>${_.com.ejaugust.routeID}</pre>
<p>In base64, that gives us the following hash:</p>
<pre id=current-hash-app>${encodeSegment(_.com.ejaugust.routeID)}</pre>
<p>When you interact with the platform you're changing that state, even when if you're just scrolling the page.</p>
<p>The entire platform includes a handful of apps, each one reachable at its own domain name. The total cardinality of the platform is about ${scientific(_.cardinality, true)}. The exact number looks like this:</p>
<pre>${_.cardinality}</pre>
<p>It is currently in the following state:</p>
<pre id=current-state-platform>${_.routeID}</pre>
<p>That state, when rendered in base 64, gives us the following hash:</p>
<pre id=current-hash-platform>${encodeSegment(_.routeID)}</pre>
<p>If you look at the URL in your addressbar, you'll see the very same hash.</p>
` : ""
return `<h2>Background</h2>
<p>For the past three years I've been trying to build an operating system that can do everything you expect an operating system to do while also encoding its entire state as a single URL. That way, we get a permalink to every state and achieve truly comprehensive deep linking.</p>
<p>For a long time, I struggled with finding a solid approach to achieving this goal. A user-friendly operating system involves many independent, dependent and otherwise tightly coupled components - especially when you want it to be a platform that supports third-party app development. I tried a variety of different methods to store that data in a URL without any redundancy.</p>
<p>Some of my attempts involved query parameters, some base64-encoded JSON objects, some domain-specific languages, and some my own custom syntax. They all had the same problem - they failed to capitalize on the <i>actual space available in URLs</i>.</p>
<p>An incredible combinatorial explosion appears when you try to compute the number of unique URLs that can exist. Query params, JSON objects, domain-specific languages and any other syntax will always suffer from the same problem: it encodes duplicate information and requires delimiters that take up space in the URL.</p>
<h2>The URL Space: Bigger Than the Universe</h2>
<p>According to some very lazy research I just did, the estimated number of particles in the observable universe is <math><msup><mn>10</mn><mn>96</mn></msup></math>. That's a 97-digit number. Have a look:</p>
<pre>1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</pre>
<p>Even though that's an unfathomably large number (imagine having to count to it), its not <i>that</i> long – it barely fills two lines of text on my screen.</p>
<p>If you could assign a unique natural number (or <i>hash</i>) to every particle in the known universe you'd never need more than 97 digits to do it.</p>
<p>If we change the base from 10 to 64, <math><msup><mn>10</mn><mn>96</mn></msup></math> items is fewer than <math><msup><mn>64</mn><mn>54</mn></msup></math>. That means you never need more than 54 characters to assign a unique base 64 hash to every particle in the known universe.</p>
<p>That's an incredibly short string of text for such a big feat. Here's a sample I made by mashing my keyboard 54 times:</p>
<pre>09m84COSM84wf897hos_t83740FW3M-8tdocs8374tyvsc9nc3b1nt</pre>
<p>In theory, this could be the URL of a random particle in the universe. Hopefully, it's one close by.</p>
<p>This kind of assignment, where each element in a set has an integer value and there are no gaps or collisions, is called a minimal perfect hash function (MPHF).</p>
<p>Of course, URLs have a more structured syntax than base64 integers. For example, the domain name takes up a little bit of space in the address bar and you don't normally encode numerical data in a domain name.</p>
<p>Yet, even if we add the longest possible domain name (255 characters)…</p>
<pre>https://heres.a.huge.domain.name.as.long.as.it.can.possibly.be.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.example.com/9m84COSM84wf897hos_t83740FW3M-8tdocs8374tyvsc9nc3b1nt</pre>
<p>… we still use only 317 characters, and this is the worst-case domain name. We know that URLs can be far longer than this. For example, here is the URL I get when I search Google for pictures for cats:</p>
<pre>https://www.google.com/search?sca_esv=c99a67a28e4a9644&q=cats&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zENwnGygERInUV_0g0XKeHGJtesk9Adz8V_3dCFxRHd-4rVc28Hvas3fJjxYa4l0bNk99rKkfyreU5lHIQnHuafulMAL-Uqa-w7l2q-jrp2K_DA_pRuYwavY1buYjWGJpBAMTtrbI6TDhEB-GyDqzxOrfIfwCQ&sa=X&ved=2ahUKEwiQhOe9hd6NAxVRRjABHUCvJ6oQtKgLegQIGRAB&biw=1223&bih=754&dpr=2</pre>
<p>Back when Internet Explorer was popular, URLs were allowed to have <i>thousands</i> of characters. Today, they can have <i>millions</i>.</p>
<h3>TL; DR:</h3>
<p>Based on current estimates, <b>there are far more unique URLs than there are particles in the known universe</b>. This had me thinking: how can a web app capitalize on all of that storage space?</p>
<h2>How many possible URLs are there?</h2>
<p>A lot.</p>
<p>To determine the actual cardinality of that set you'd need to make a few assumptions. For example, are consecutive slashes allowed or will they be normalized away? Do we limit it to <a href="https://support.microsoft.com/en-us/topic/maximum-url-length-is-2-083-characters-in-internet-explorer-174e7c8a-6666-f4e0-6fd6-908b53c12246#:~:text=Microsoft%20Internet%20Explorer%20has%20a,request%20and%20GET%20request%20URLs." target="_blank">two thousand characters like Internet Explorer</a> or <a href="https://chromium.googlesource.com/chromium/src/+/main/docs/security/url_display_guidelines/url_display_guidelines.md#:~:text=Chrome%20limits%20URLs%20to%20a,is%20used%20on%20VR%20platforms." target="_blank">two million like Chrome</a>?</p>
<p>Let's go factor-by-factor and, at each step, we'll assume the worst possible case.</p>
<h3>Worst-Case Length</h3>
<p>First, we start with the length. Let's use a hard limit of 2000 characters. Since Chrome supports 2MB, we just <em>removed 99.9% of the URLs from our set</em>. Even so, there is still a lot of nuance to computing the cardinality of that <em>remaining 0.1%</em>.</p>
<h3>No Protocol Mutability</h3>
<p>For the <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3.1" target="_blank">scheme/protocol</a>, forget about any cardinality imparted by that. I only want to think about secure browsing contexts (“https://”). We subtract those 8 characters, leaving us with 1992 characters.</p>
<h3>Worst Possible Host</h3>
<p>What about the host name? Well, what's the worst case we could possibly run in to?</p>
<p>Many projects and apps are meant to exist on only one origin, so let's not even allow any mutability in the host.</p>
<p>The maximum length of a host name is 255-characters. So let's bring back that behemoth of a domain that I showed earlier:</p>
<pre>https://heres.a.huge.domain.name.as.long.as.it.can.possibly.be.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.example.com</pre>
<p>Just to be clear, we removed every URL from our set that doesn't have this domain name which, as you know, was pretty much <em>all of them</em>. Yet, we're still left with 1737 characters we can store data in.</p>
<h3>No Optional Features</h3>
<p>There's still a lot of unpredictability in the size of our set, however. For example, the <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3.2.1" target="_blank">user credentials</a>, <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3.2.3" target="_blank">port</a>, <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3.4" target="_blank">query/search parameters</a>, and <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3.5" target="_blank">hash/fragment</a> all add a ton of cardinality to our set but they also add an incredible amount of complexity to the cardinality equation.</p>
<p>Luckily, they're all optional. We'll just remove all of the URLs that have these features (which, if you didn't know, were almost <em>all of the URLs we had left</em>).</p>
<h3>No Variable-length Pathnames</h3>
<p>At this point, we're really just counting the set of all valid <a href="https://datatracker.ietf.org/doc/html/rfc3986#section-3.3" target="_blank">pathnames</a> up to 1737 characters long. All pathnames require at least the initial slash and the empty pathname without an initial slash will often resolve to one with it or vice versa. So, that first pathname character is effectively useless for encoding data.</p>
<p>Furthermore, how do we account for the variable-length of pathnames? We'd have to add the number of 2-character pathnames to the number of 3-character pathnames to the number of 4-character pathnames and so on.</p>
<p>To compute that, we require a <a href="https://en.wikipedia.org/wiki/Geometric_series" target="_blank">geometric series</a>. That's too rich for my blood, so let's just remove <em>every URL whose pathname is not exactly 1737 characters long</em>. Again, we just removed almost every URL from our already stripped-down set.</p>
<h3>No Special Characters</h3>
<p>Modern browsers support 85+ characters in the URL pathname (once you include the percent symbol, comma, parenthesis, square brackets, period, exclamation point, etc.), suggesting it <em>might</em> be possible to approach base 85.</p>
<p>Sadly, though, many of these special symbol combinations will get stripped away/normalized down to others during URL resolution. Some will be treated inconsistently in platforms that let you embed links. Others will cause an error if used incorrectly. It isn't trivial to compute the cardinality of that.</p>
<p>The solution? You guessed it. We'll remove most of the URLs from our set! Let's only consider URLs that use the following 64 character alphabet to spell out their pathname segments:</p>
<pre>abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_</pre>
<p>But we can't just string together 1737 of these bad boys and call it a day…</p>
<h3>No Variable-length Segments</h3>
<p>A valid URL pathname can be broken up into segments, each separated by a forward slash. Some systems throw an error if even one of those segments is longer than 250 characters. It wouldn't be terribly hard to account for these arrangements but it <em>would</em> mean writing out a geometric series.</p>
<p>So, let's only count URLs that have this exact arrangement:</p>
<p>Seven fixed-length segments: six 250-character segments followed by one 230 character segment.</p>
<p>This requires seven slashes to split it all up; 1737 minus 7 leaves us with an even 1730 segment characters.</p>
<p>Not to sound like a broken record, but almost none of the URLs in our set had this exact arrangement. We just removed <em>almost everything we had left, yet again</em>.</p>
<p>Just for fun, here is a “random” sample from our set:</p>
<pre>https://heres.a.huge.domain.name.as.long.as.it.can.possibly.be.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnopqrstuvwxyz.example.com/ld9370LC9uzp83Mklv90dujd9v7774n0V7p7em5078B7S790dkb094977au9D07B098yAV76ouyf79J7uft7d5f77g90jki98765dc7hkji7865d7dgy77yuhjkIk8Kgf567hj9ny7GVNjn7677V9jbvr567bj099efbn49efg776ft5x4rxi7T8Yoih0n7hv6r4d657d8g9u8b779ub8yf7t7d75d674s77743s2a1a7772zqzdtcuhbi/007opkolpp7m777ko7n777ou77h8yvtcr7tds5es5241awzsx7dfchvj7jkhboi78g8765c6e4x421s576y57t6fv8iub9ub87ytvc64dc768fv897b9ub9yv7tc7tv8ybhvutF64d52as2zfxcghvbhininIonoi0ih9ubgiI0P1MS07vmllp0097f74d2wa1asswextyvunimlljo00987643212wzqz1a12aswzz23sxerc34dfcrvr/5fvtby65g67buh7nu98m09k0,00k9jubyuhubvtctvubuvtdcrd4dxw23314152375786e6d976f70867f97743d8742a13s7278rf97vtiyfcdtd7xtrwSte7wrxztewzyrTUCtivuyvbOUyv77utrs462s67546rv9vbyv8rtc6X4s13A2ezwrexrcYdexwa2WESDfgtyu789iujhnmko9iujhbVFdre321qasxcfvghuiuytr432was/zxcvfghyui9o876543wsaxcdfghyuI9Oijnjiuygtftdrezwertrytfugyhiu8978gtf7r6d53s64512zwxetCRYtfughioYG87f564dsetrcyvubhij9i8u7t6f5r7743217aqwezsxdcrft7gyh77ujikJHgt5432177777qwertyhj7kJHgre321qaszxcvghjio987654321QWErfcv7bhuyTRfdfgtyui987654321qwerfv77798/bnhjHGv7fghjio09oiujhn7b7VCxsaq12we7rty7u8Ikj7hgFD777seRTyu876YT7r4ewsDFghJiuy6543721Qas7zxcVBnjio9876574321qasDFGhbnJUytrfdsERtyuJHgbvfdeRthBVGCFdsw34543212qaszxcVbghjkio0987654321qasZXcvbnhJKo0987654ERD7sw21qas7ZXcfghyuI9O0okmjki87uyhgbvgt54edsxzsa/Q12qwasXCfrt56tygBnhjio909OIKjmnko09iujhY76tfgcder321q7aszxCvgbhjui7uY6T5r4e321234567879i8UytrfdsXcvbghjIuyTRewqA7SzxcvbgHJik7oKjmjI7UyhgfrEwszx7sAWaszxcdftYUijkmjNHBGfrtYuiuYTredFCghyui89876543eDfgyuytr43edfgyuhbghJUI987654321qaszxCVghui9o876543wErt/fGHYBUtcu63s312asydu6IYUTYVbokuvhtExt42at4wrexcutyvbo8ygoiyrc53yr3254Sdu6rfvoyboiybiutyvyuCtycurc6u5c865777ctycuyut7ityd7i6757DE7U7674s5u74s54sd7xry7txc7jyrfxd7j7yrDujdI7775edu77564st427as13szr7ezUT7rxiYGCkyuC77FJut7ykm79OM0p7978t</pre>
<p>I mashed my keyboard as fast as I could and didn't bother adding any underscores or dashes, and it still took a surprisingly long time to type this out.</p>
<h3>Final Cardinality of our Set</h3>
<p>Our set is now a fraction of a fraction of a fraction of a fraction of a fraction of a fraction of a fraction of its former self. Every URL in our set is a highly unlikely 264-character origin followed by a just-as-unlikely arrangement of 1730 base-64 digits. Ultimately, what we've got here isn't even a drop in the bucket compared to the set of all possible URLs.</p>
<p>But the good news is we finally have a set that can be represented by a trivial cardinality expression! Here it is: <math><mi>k</mi><mo>=</mo><msup><mn>64</mn><mn>1730</mn></msup></math></p>
<p>Remember how there are fewer than <math><msup><mn>64</mn><mn>54</mn></msup></math> particles in the known universe? Contrast that with <math><msup><mn>64</mn><mn>1730</mn></msup></math>. The ratio is basically 0:1. But what does our final number <em>look</em> like?</p>
<p>First, recall this number:</p>
<pre>1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</pre>
<p>You can hash <em>every particle in the universe</em> with this.</p>
<p>Now look at the number of URLs in our “tiny” worst-case set:</p>
<pre>${64n ** 1730n}</pre>
<p>Imagine what you could hash with <em>this</em>!</p>
<p>In the case of my project, the “<em>things</em>" I need to hash are <em>application states</em>.</p>
<p><em>Do I really need this many application states to make an operating system?</em></p>
<p>My guess was <em>no way</em> (especially if I embrace a minimalist approach to UI interaction design).</p>
<p>However, to take full advantage of all of that storage space, I would need to create a MPHF that could integrate naturally into today's web app technology stack.</p>
<h2>MVC + MPHF</h2>
<p>A breakthrough came when I realized that the structure I was building to support the bijection had a surprising amount in common with MVC architecture. In fact, the two ended up laying right on top of each other and being the <em>same thing</em>.</p>
<p>Think of an MVC controller object as a piece of the piecewise-defined hash function. Whether you assign a hash (which acts as the data model) to a controller or manipulate the controller directly (for example, in response to user interaction), the application state and the model are always be kept in sync.</p>
<p>Each controller is a reusable component. It has its own hash range from 0 to k-1, where k is the cardinality of the component's model.</p>
<p>These components assemble together like LEGO® blocks, and no matter what assembly you make with them, the result is still a minimal perfect hash function over the assembly's state domain.</p>
<p>This isn't just a theoretical exercise — the very notebook you're reading this in runs a minimal perfect hash function, perfectly encoding every possible app state in real time. It's proof that what sounds complex on paper can actually power smooth, practical web experiences.</p>
<p>The algorithm is fast (fast enough for 60Hz interaction) and powers my whole platform. Now, I'm having trouble <em>filling</em> the available space.</p>
<p>Leveraging the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain" target="_blank">JavaScript prototype chain</a>, I was able to add object-oriented concepts like inheritance into the equation.</p>
${dynamicSection}<p>These numbers may seem large, but the resulting URLs are really small for what they encode. I'm still adding features to the platform, though, like movable windows, the ability to have arbitrarily many windows open, and even a full read-write file system that behaves in the familiar way.</p>
<h2>Conclusion</h2>
<p>Thanks for reading! Hopefully, this shows you just how powerful a minimal perfect hash function is when employed for the purposes of data compression. The way that it overlays with MVC architecture is also very satisfying.</p>
<p>I look forward to writing more about the project soon!</p>`