const animFrame = Math.abs(Math.trunc(_.now / note.hangTime) % 10 - 5) * 2
const depthEven = animFrame === 10 ? Infinity : animFrame
const depthOdd = depthEven + 1

return /* html */`
<p>From the start, I've envisioned my web framework as one that allows me to see components represented as equations. These equations would represent components as a relationship between their subcomponents. As it happens, all ecosystem components extend directly or indirectly from the same base type, meaning that I don't have to typeset an equation for every single part. They can just inherit and override their prototype's markup.</p>
<p>On top of that, <a ${_.pointAttr()} class=external href="">MathML</a> is now <a ${_.pointAttr()} class=external href="https://caniuse.com/mathml">widely supported</a> across the web! This is a fairly recent development that was two and a half decades in the making (<a ${_.pointAttr()} class=external href="https://www.w3.org/TR/1998/REC-MathML-19980407/">MathML 1.0</a> was recommended by the W3C in 1998). This means that I can typeset these equations without third-party tools.</p>
<p>Still, I didn't have a reliable method of looking at the entire cardinality expression of the demo app ecosystem with various levels of detail... until today. Let's dive in and explore the approach that I used.</p>
<h2>Method</h2>
<p>I started by equipping the base part type with a new function. This will be inherited by every part of the ecosystem. You can think of it like this:</p>
<pre>interface IPart {<br> // ...<br><br> mathML(<br>  DEPTH: number = 0,<br>  EQUATION_TYPE: string = "none",<br>  PARENTHESIZE: boolean = false<br> ): string<br><br> // ...<br>}</pre>
<p>With default parameters, every part provides a single variable that can represent the cardinality of its state space. When I say <code>part.mathML()</code>, where <code>part</code> represents some component of the ecosystem, I get the following string as output:</p>
<pre>${sanitizeAttr(_.parts.abstract.part.mathML(0, false))}</pre>
<p>Your browser renders that string like this:</p>
<p class="math">${_.parts.abstract.part.mathML(0, false)}</p>
<p>Every part is represented by a variable that looks more or less the same as this. It's what we get when we don't pass any arguments to <code>part.mathML()</code>. For example, the part that controls which note you're viewing in the notebook is represented by this variable:</p>
<p class="math">${notes.mathML(0, false)}</p>
<p>The parent part of <code>notes</code> is <code>sections</code>. It controls which section of <code>https://ejaugust.com</code> you are on (currently, there's only <code>notes</code> and <code>home</code>) and it has a variable too. It looks like this:</p>
<p class="math">${sections.mathML(0, false)}</p>
<p>The root of the entire app ecosystem has one as well, which looks like this:</p>
<p class="math">${_.mathML(0, false)}</p>
<p>These single-variable expressions don't tell us a lot. It's not until we start changing these arguments that we get to see more detail.</p>
<h3>Parameter <code>DEPTH</code></h3>
<p>Let's try and kick up the <code>DEPTH</code> parameter a little bit. Here's that same <code>notes</code> component given four different depths:</p>
<h4><code>DEPTH = 0</code></h4>
<p class="math">${notes.mathML(0)}</p>
<h4><code>DEPTH = 1</code></h4>
<p class="math">${notes.mathML(1)}</p>
<h4><code>DEPTH = 2</code></h4>
<p class="math">${notes.mathML(2)}</p>
<h4><code>DEPTH = 3</code></h4>
<p class="math">${notes.mathML(3)}</p>
<p>Here is how <code>sections.mathML(...)</code> looks at four different depths:</p>
<h4><code>DEPTH = 0</code></h4>
<p class="math">${sections.mathML(0)}</p>
<h4><code>DEPTH = 1</code></h4>
<p class="math">${sections.mathML(1)}</p>
<h4><code>DEPTH = 2</code></h4>
<p class="math">${sections.mathML(2)}</p>
<h4><code>DEPTH = 3</code></h4>
<p class="math">${sections.mathML(3)}</p>
<p>And now here's the ecosystem root (via <code>_.mathML(...)</code>) at four different depths:</p>
<h4><code>DEPTH = 0</code></h4>
<p class="math">${_.mathML(0)}</p>
<h4><code>DEPTH = 1</code></h4>
<p class="math">${_.mathML(1)}</p>
<h4><code>DEPTH = 2</code></h4>
<p class="math">${_.mathML(2)}</p>
<h4><code>DEPTH = 3</code></h4>
<p class="math">${_.mathML(3)}</p>
<p>This tells us that <code>notes</code> and <code>sections</code> are each the sum of their parts and that the overall ecosystem cardinality is the product of each top-level domain's cardinality. That makes sense because mutually exclusive state spaces (like <code>notes</code> and <code>sections</code>) are accounted for using simple addition. Their combined state space is the disjoint union of their subpart state spaces. The applications in the ecosystem each have a domain name and an independent state. Independent variables are accounted for using multiplication. The ecosystem's state space is therefore the cartesian product of its individual application state spaces. The applications are grouped by their top-level domain name, so each top-level domain is also a cartesian product space.</p>
<p>What we're really demonstrating, however, is that the <code>DEPTH</code> parameter gives us control over how deeply we will traverse into a part's hierarchy in order to pull out nested MathML expressions. It's a simple approach that lets us reach in and pull out only the details we want to see.</p>
<h3>Parameter <code>EQUATION_TYPE</code></h3>
<p>Let's take a look at that second parameter, <code>EQUATION_TYPE</code>. Its a string argument that switches between a simple expression (<code>"none"</code>, the default which we've already seen) and three styles of equation (<code>"variable"</code>, <code>"value"</code>, and <code>"both"</code>). I'm not totally satisfied with this approach and I may replace this argument with a configuration object that will provide much greater control. For now, though, this method will do.</p>
<h4>The <code>"variable"</code> Type</h4>
<p>The <code>"variable"</code> equation type takes the expressions we've seen so far and makes them the right-hand side of a cardinality <em>equation</em>. The left-hand side of this equation is going to be the expression we saw before when we said <code>DEPTH = 0</code>. So when I say <code>part.mathML(0, "variable")</code>, I get the following:</p>
<p class="math">${_.parts.abstract.part.mathML(0, "variable")}</p>
<p>If I want to render those <code>sections</code> expressions as simple variable equations, I'd say <code>notes.mathML(depth, "variable")</code>:</p>
<h5><code>DEPTH = 0</code></h5>
<p class="math">${sections.mathML(0, "variable")}</p>
<h5><code>DEPTH = 1</code></h5>
<p class="math">${sections.mathML(1, "variable")}</p>
<h5><code>DEPTH = 2</code></h5>
<p class="math">${sections.mathML(2, "variable")}</p>
<p>It's a simple way go beyond the expression and say <em>which part</em> the expression is describing.</p>
<h5>The <code>"value"</code> Type</h5>
<p>The <code>"value"</code> type flips the equation a bit. It takes our <code>DEPTH</code>-controlled expression and makes it the left-hand side of an equation whose right-hand side is the actual cardinality of the part's state space as an integer. This integer will be in scientific notation whenever <math><msub><mi>log</mi><mn>10</mn></msub><mo>(</mo>${_.parts.abstract.part.mathML()}<mo>)</mo><mo>></mo><mn>15</mn></math>. So if we run <code>sections.mathML(depth, "value")</code>, we'll see:</p>
<h5><code>DEPTH = 0</code></h5>
<p class="math">${sections.mathML(0, "value")}</p>
<h5><code>DEPTH = 1</code></h5>
<p class="math">${sections.mathML(1, "value")}</p>
<h5><code>DEPTH = 2</code></h5>
<p class="math">${sections.mathML(2, "value")}</p>
<p>When we want to depict the cardinality of the entire ecosystem as a simple equation, we can say <code>_.mathML(0, "value")</code>:</p>
<p class="math">${_.mathML(0, "value")}</p>
<h4>The <code>"both"</code> Type</h4>
<p>As you may have surmised, the <code>"both"</code> type combines both approaches. We get to see the variable name on the left, the <code>DEPTH</code>-controlled expression in the middle, and the cardinality integer on the right. So <code>sections.mathML(depth, "both")</code> looks like:</p>
<h5><code>DEPTH = 0</code></h5>
<p class="math">${sections.mathML(0, "both")}</p>
<h5><code>DEPTH = 1</code></h5>
<p class="math">${sections.mathML(1, "both")}</p>
<h5><code>DEPTH = 2</code></h5>
<p class="math">${sections.mathML(2, "both")}</p>
<h3>Parameter <code>LABELS</code></h3>
<p>There is also a nifty boolean parameter that enables curly brackets underneath expressions in order to clarify their origin in a larger expression. Let's look at the labels parameter in action.</p>
<h4><code>_.mathML(3, "value", true)</code></h4>
<p class="math">${_.mathML(3, "value", true)}</p>
<h4><code>sections.mathML(2, "none", true)</code></h4>
<p class="math">${sections.mathML(2, "none", true)}</p>
<h4><code>_.parts.desktop.mathML(4, "value", true)</code></h4>
<p class="math">${_.parts.desktop.mathML(4, "value", true)}</p>
<h4><code>_.app.kireji.editor.mathML(4, "value", true)</code></h4>
<p class="math">${_.app.kireji.editor.mathML(4, "value", true)}</p>
<h3>How deep can we go?</h3>
<p>The point of this note is not just to talk about the parameters of <code>part.mathML(...)</code>. It's to see the entire ecosystem's equation at increasing depths. <code>part.mathML(...)</code> accepts a <code>DEPTH</code> value of <code>Infinity</code> so it's only <em>logical</em> that we work our way up to the deepest depth we can...</p>
<h4>Even Depths</h4>
<p>Because of the way that the <code>DEPTH</code> parameter is handled, even-numbered depths depict cardinality expressions as simply operators and variables.</p>
<h4><code>DEPTH = 0</code></h4>
<p class="math">${_.mathML(0)}</p>
<h5><code>DEPTH = 2</code></h5>
<p class="math">${_.mathML(2)}</p>
<h5><code>DEPTH = 4</code></h5>
<p class="math">${_.mathML(4)}</p>
<h5><code>DEPTH = 6</code></h5>
<p class="math">${_.mathML(6)}</p>
<h5><code>DEPTH = 8</code></h5>
<p class="math">${_.mathML(8)}</p>
<h4>Odd Depths</h4>
<p>Meanwhile, odd-numbered depths depict the cardinality as sums and products of sequences.</p>
<h5><code>DEPTH = 1</code></h5>
<p class="math">${_.mathML(1)}</p>
<h5><code>DEPTH = 3</code></h5>
<p class="math">${_.mathML(3)}</p>
<h5><code>DEPTH = 5</code></h5>
<p class="math">${_.mathML(5)}</p>
<h5><code>DEPTH = 7</code></h5>
<p class="math">${_.mathML(7)}</p>
<h5><code>DEPTH = 9</code></h5>
<p class="math">${_.mathML(9)}</p>
<h4>To <code>Infinity</code>!</h4>
<p>Let's see the ecosystem cardinality expanded <em>all the way</em>:</p>
<p class="math">${_.mathML(Infinity)}</p>
<p>Now we can add <code>EQUATION_TYPE = "both"</code> to make it even more verbose:</p>
<p class="math">${_.mathML(Infinity, "both")}</p>
<p>Now, let's enable <code>LABELS = true</code>:</p>
<p class="math">${_.mathML(Infinity, "both", true)}</p>
<p>Yeah, that's a big equation. <em>Too</em> big. I've noticed that these large labels are beyond the limit of what certain browsers (like Chrome) can render.</p>
<h4>Better Animated?</h4>
<p>Could <em>animation</em> be the secret to depicting the cardinality of the ecosystem? Press play to find out!</p>
<button id=anim-button ${note.pointAttr()} data-playing=${note.isPlaying}>
 ${note["confetti.html"]}
 <b>Even Depths</b>
 <div id=mathML-anim-even>${_.mathML(depthEven, "both")}</div>
 <b>Odd Depths</b>
 <div id=mathML-anim-odd>${_.mathML(depthOdd, "both")}</div>
</button>
<p>Ummm.... No. I don't think animation is the answer. Press on it again to <em>make it stop</em>.</p>
<h2>Conclusion</h2>
<p>Perhaps equations that expand and contract with confetti are ahead of their time. Perhaps it will <em>never</em> be the right time. But the <code>part.mathML(...)</code> method is ready <em>today</em> and I've already put it to good use in the <a ${_.pointAttr()} href="https://kireji.app/">Kireji Part Viewer</a> (in each part summary, within the <b>State Space</b> subheading).</p>
`.trim()