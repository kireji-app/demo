
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

return `<p>A <strong>charm</strong> (short for <b>char</b>acter <b>m</b>essage) is a unit of entropy and storage capacity. It can be thought of as roughly six bits. Yet, it is a non-linear ruler that accounts for the fact that a self-limiting variable-length string imparts more information than a fixed-length string, even when the two strings are identical.</p>
<p>This unit is used throughout this platform to measure the amount of information needed to differentiate between all of the system's available states.</p>
<h2>Background</h2>
<p>This platform offers a permanent link to every possible state it can occupy. Part of the challenge is ensuring that there is a dedicated URL to every state and that those URLs are not too long or difficult to parse. For best results, no two URLs should point to the same state and vice versa. Achieving the optimal compression in this case means achieving a minimal perfect hash function over the state space, where the hash range is the available URL space. I talk more about the size of the URL space in <a href=https://www.ejaugust.com/notes/1749276077  onclick=_.go(this,event)>this note</a> I wrote a while back.</p>
<p>Thanks to that perfect hash function, encoded states achieve the <em>information-theoretic lower bound</em> — the hard limit for lossless, deterministic data compression. Because we reach this lower bound, the question of how long URLs will get in the system is actually a question of how much entropy is in the system.</p>
<p>Bits are a very common unit for measuring entropy and storage space. They have a convenient name, but they aren't strictly relevant to URL length and they fail to account for the capacity imparted by the variable-length. To reason about entropy in terms of how many characters a variable base-64 string will require, I coined the term charm.</p>
<h3>A Non-Linear Ruler</h3>


Using a variable length hash is easy here because URL segments are variable length strings delimited by slashes.

<p>The charm aims to measure the entropy of the platform's state space in terms that are directly applicable to this base-64 variable-length encoding method. Entropy in this case refers to the amount of information needed to disambiguate one platform state from the rest. We're performing that measurement against a non-linear ruler that makes it more useful for our specific storage method.</p>
<h2>Computed from State Space Cardinality</h2>
<p>To measure the number of charms a system has, we simply need to convert the largest possible natural number in the system — its last possible state — into its variable-length base-64 equivalent. Then, we simply measure the length of that hash. This is similar - but not identical - to taking the logarithm of its cardinality.</p>
<p>Let <math><mi>k</mi></math> be the total cardinality of the set of all states a system can occupy. For this platform, <math><mi>k</mi></math> is equal to:</p>
<pre>${_.cardinality}</pre>
<p>In our case, the first state in our state space is assigned the number <math><mn>0</mn></math>, so the last state in the space is assigned the number <math><mrow><mi>k</mi><mo>−</mo><mn>1</mn></mrow></math>:</p>
<pre>${lastState}</pre>
<p>This is the largest possible integer that can be assigned to any state on the platform. Other hashes may be smaller, but we're specifically looking at the worst possible case. We can get a close approximation by computing <math><msub><mo>log</mo><mn>64</mn></msub><mo>(</mo><mrow><mi>k</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></math>:</p>
<pre>${log64OfLastState}</pre>
<p>When discussing string length, the meaning of the <a href="https://www.etymonline.com/word/mantissa" target="_blank">mantissa</a> becomes abstract. We can't use a partial character, so we need to round up to <math><mn>${Math.trunc(log64OfLastState) + 1}</mn></math>.</p>
<p>However, this isn't exactly the same as charms, because our URL encoding isn't a straight base 64 numeral. Because our hashing method is the very same entropy-perfect base-64 string that defines the charm as a unit, the easiest way to compute the entropy of the system in charms is to hash <math><mrow><mi>k</mi><mo>−</mo><mn>1</mn></mrow></math>:</p>
<pre>${lastHash}</pre>
<p>All other states will have hashes that are the same length or shorter than than this hash. Now, we can say that the entropy of the platform in charms is:</p>
<pre>${lastHash.length} charms</pre>
<h2>Conclusion</h2>
<p>Thanks to its minimal perfect hash function, this platform uses entropy-perfect encoding when it hashes its state. This means that measuring the worst case URL is the same as measuring the entropy of the system's state space. Because hashes store some information in their length, a linear measurement like <math><msub><mo>log</mo><mn>64</mn></msub><mo>(</mo><mrow><mi>k</mi><mo>−</mo><mn>1</mn></mrow><mo>)</mo></math> fails to reflect the contribution of variable-length structure to entropy capacity. It becomes easier and more meaningful to measure the system's entropy in charms.</p>`