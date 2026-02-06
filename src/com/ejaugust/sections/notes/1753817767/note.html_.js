
function logN(n, base) {
 if (typeof n !== "bigint" || typeof base !== "bigint" || n <= 0n || base <= 1n)
  return NaN
 let characteristic = 0n, remainder = n, step = 1n, power = base
 while (true) {
  const nextPower = power * power
  if (nextPower > remainder) break
  power = nextPower
  step *= 2n
 }
 while (step > 0n) {
  const candidate = base ** step
  if (candidate <= remainder) {
   remainder /= candidate
   characteristic += step
  }
  step /= 2n
 }
 const mantissa = Math.log(Number(remainder)) / Math.log(Number(base))
 return Number(characteristic) + mantissa
}

const lastState = _.cardinality - 1n
const lastHash = encodeSegment(lastState)
const log64OfLastState = logN(lastState, 64n)

return `<p>A <b>charm</b> (short for <b>char</b>acter <b>m</b>essage) is a unit of hartley entropy and storage capacity equal to six bits. It measures the entropy of a data model in terms of the length of base-64 encoded data needed to represent its worst-possible case, given an encoding method that perfectly achieves the lower-bound of compression. The unit is used throughout this platform to measure and discuss the size of a system's state space.</p>
<h2>Background</h2>
<p>The Kireji Web Framework builds ecosystems that unite multiple applications into a single common state space. It does this in order to offer a permanent link to every possible state the ecosystem can occupy. Part of the challenge of providing a dedicated URL to every state is making sure that those URLs are not too long or difficult to parse. Entropy here measures the number of states that a system can be in in terms of the number of symbols needed to disambiguate any one of those states from all of the others. The value of that measurement for the Kireji Web framework is that it makes it extremely clear how long a URL might need to get in order to encode the worst-case state of the ecosystem, given the best-case compression method.</p>
<p>Achieving the optimal compression in this case means achieving a minimal perfect hash function - a bijection between the space of all possible URL-encoded data strings (which is <a ${_.pointAttr()} href=${notes[1749276077].canonicalURL}>quite large</a>) and the space of all possible system states. No two URLs should point to the same state and vice versa and there should be no gaps (URLs that are structurally valid but don't point to a valid application state). Thanks to this bijection, the Kireji Web Framework achieves the <em>information-theoretic lower bound</em> — the hard limit for lossless, deterministic data compression. Because we achieve this bound, the question of how long URLs will get in the system is the same as the question of how much entropy is in the ecosystem.</p>
<p>Bits are a very common unit for measuring entropy but they aren't convenient for discussing URL length. Information theory pioneers Hartley and Shannon proposed measuring information content in terms of the real physical units that will be used to store and handle that information. When we talk about URLs with base-64-encoded data strings, each character of those data strings is a single sexagesiquaternary digit. In order to avoid having to repeatedly say "base-64 character" or "sexagesiquaternary digit", I coined the term charm.</p>
<h2>Computed from State Space Cardinality</h2>
<p>To measure the entropy in charms of an app ecosystem (or any component within that system), we simply measure the length of the base-64 data string representing the index of the last possible state in the system (starting at 0). This is similar - but not identical - to taking the logarithm of the number of states the system can be in.</p>
<p>Let <math><mi>k</mi></math> be the total cardinality of the set of all states a system can occupy. For this platform, <math><mi>k</mi></math> is equal to the following (rather large) number:</p>
<pre>${_.cardinality}</pre>
<p>The first state in our state space is assigned the number <math><mn>0</mn></math>, so the last state in the space is assigned the number <math><mrow><mi>k</mi><mo>−</mo><mn>1</mn></mrow></math>:</p>
<pre>${lastState}</pre>
<p>This is the largest possible integer that can be assigned to the platform. Other hashes may be smaller, but we're most interested in looking at the worst possible case. We could try and compute <math><msub><mo>log</mo><mn>64</mn></msub><mo>(</mo><mrow><mi>k</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></math>:</p>
<pre>${log64OfLastState}</pre>
<p>But, when discussing string length, the meaning of the fractional part of the logarithm (sometimes called the <a ${_.pointAttr()} href="https://www.etymonline.com/word/mantissa" class="external">"mantissa"</a>) becomes abstract. We can't have a URL with a fraction of a character and in the end, computing this logarithm is less convenient than simply hashing <math><mrow><mi>k</mi><mo>−</mo><mn>1</mn></mrow></math> using the framework's actual URL encoder:</p>
<pre>${lastHash}</pre>
<p>We know all other data strings will be the same length or shorter than than this. We can simply measure this string's length. The entropy of this platform in charms is:</p>
<pre>${lastHash.length} charms</pre>
<h2>Conclusion</h2>
<p>The word "charm" is short and sweet and it isn't used for any other units. I needed such a word to describe the unit of entropy and information content equal to one base-64 character, so that's what I chose. I hope you find this unit as useful and convenient as I have.</p>`