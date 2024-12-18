// © 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved.
function boot() {
 const D = {
   // =============================================================================================================================================================================
   "https://base.core.parts/constructor.js": `this.index = -1n
this.size = 1n`,
   "https://base.core.parts/create.js": "",
   "https://base.core.parts/checkout.js": `if (index < -1n || index >= this.size) throw new RangeError(\`index \${index} out of range (size \${this.size}): \${this.origin}\`)
const oldIndex = this.index
this.index = index
if (oldIndex === -1n) await this.create()`,
   "https://base.core.parts/destroy.js": `this.index = -1n`,
   "https://base.core.parts/notify.js": `await this.controller?.notify(this.origin)`,
   "https://base.core.parts/goto.js": `await this.checkout(index)
await this.controller?.notify(this.origin)`,
   // =============================================================================================================================================================================
   "https://boot.core.parts/base.uri": "https://decision.core.parts",
   "https://boot.core.parts/constructor.js": `
info("Nothing exists. Dividing empty space into two areas: server and client.")
super(["https://server.core.parts", "https://client.core.parts"])
info("Space exists but nothing is in it. Creating an environment.")
const environmentOption = this.options[\`https://\${E}.core.parts\`]
this.index = environmentOption.offset
this.option = environmentOption
environmentOption.part.create()`,
   // =============================================================================================================================================================================
   "https://client.core.parts/base.uri": "https://decision.core.parts",
   "https://client.core.parts/constructor.js": `super(["https://fallback.cloud", "https://orenjinari.com", "https://ejaugust.com", "https://kireji.io"])`,
   "https://client.core.parts/create.js": `
info("The client exists but there is no application. Creating an application.")

const
 appOrigin = \`https://\${APP_HOST}\`,
 isKnown = appOrigin in this.options,
 trueOrigin = isKnown ? appOrigin : "https://fallback.cloud",
 applicationOption = this.options[trueOrigin]

this.index = applicationOption.offset
this.option = applicationOption

await applicationOption.part.create()
loop()
// await applicationOption.part.goto(applicationOption.part.documentIndex)
info("Process ends here.", this)`,
   // =============================================================================================================================================================================
   "https://kireji.io/base.uri": "https://menu.core.parts",
   "https://kireji.io/constructor.js": `super("editor")`,
   // =============================================================================================================================================================================
   "https://model.editor.kireji.io/base.uri": "https://decision.core.parts",
   "https://model.editor.kireji.io/constructor.js": `super(["b1", "b2", "b3", "k1"])`,
   "https://model.editor.kireji.io/destroy.js": `this.container.innerHTML = ""
await super.destroy()`,
   "https://model.editor.kireji.io/create.js": `this.toolbar = this.controller.toolbar
this.container = this.controller.container
this.label = this.toolbar.appendChild(document.createElement("label"))
this.select = this.toolbar.appendChild(document.createElement("select"))
this.label.innerHTML = "Grammar model:"
for (const model of this.parts) {
 const option = this.select.appendChild(document.createElement("option"))
 option.innerHTML = model.name
}
this.select.onchange = () => {
 this.goto(this.options[this.parts[this.select.selectedIndex].origin].offset)
}
this.randomButton = this.toolbar.appendChild(document.createElement("button"))
this.randomButton.innerHTML = "🍀 Random"
this.randomButton.onclick = () => {
 let i = this.option.part.size.toString(2).length, bin = "0b"
 while (i--) bin += Math.trunc(Math.random() * 2)
 this.option.part.goto(BigInt(bin) % this.option.part.size).then(() => {
  info(this)
 })
}`,
   // =============================================================================================================================================================================
   "https://option.model.editor.kireji.io/base.uri": "https://composite.core.parts",
   "https://option.model.editor.kireji.io/inputs.txt": "name polynomial parts",
   "https://option.model.editor.kireji.io/constructor.js": `super(parts)
this.name = name
this.polynomial = polynomial`,
   "https://option.model.editor.kireji.io/create.js": `this.container = this.controller.container
this.controller.select.selectedIndex = this.i`,
   // =============================================================================================================================================================================
   "https://b1.model.editor.kireji.io/base.uri": "https://option.model.editor.kireji.io",
   "https://b1.model.editor.kireji.io/constructor.js": `super("demo-001", "𝑛𝑣", ["nouns", "verbs"])`,
   // =============================================================================================================================================================================
   "https://b2.model.editor.kireji.io/base.uri": "https://option.model.editor.kireji.io",
   "https://b2.model.editor.kireji.io/constructor.js": `super("demo-002", "𝑎𝑛𝑣", [
 "adjectives",
 "https://nouns.b1.model.editor.kireji.io",
 "https://verbs.b1.model.editor.kireji.io"
])`,
   // =============================================================================================================================================================================
   "https://b3.model.editor.kireji.io/base.uri": "https://option.model.editor.kireji.io",
   "https://b3.model.editor.kireji.io/constructor.js": `super("demo-003", "(1 + 𝑎 + 𝑎² + 𝑎³)𝑣𝑛", [
 "adjectives",
 "https://nouns.b1.model.editor.kireji.io",
 "https://verbs.b1.model.editor.kireji.io"
])`,
   // =============================================================================================================================================================================
   "https://k1.model.editor.kireji.io/base.uri": "https://option.model.editor.kireji.io",
   "https://k1.model.editor.kireji.io/create.js": `await super.create()
this.populate = () => {
 const
  choice = this.parts[0],
  row = choice.model[choice.option.i],
  observation = row[4 + choice.option.part.option.i],
  [ ba, bb, aa, ab ] = row
 this.container.innerHTML = \`<p>\${aa} \${ab} and there is \${observation.join(" ")}</p><p>what is the \${observation.at(-1)} of one \${ba} \${bb}?</p>\`
}`,
   "https://k1.model.editor.kireji.io/destroy.js": `await super.destroy()
this.container.innerHTML = ""`,
   "https://k1.model.editor.kireji.io/constructor.js": `super("koan-001", "??? koan 1", ["choice"])`,
   "https://k1.model.editor.kireji.io/checkout.js": `await super.checkout(index)
this.populate()`,
   "https://k1.model.editor.kireji.io/notify.js": `await super.notify(...sources)
this.populate()`,
   // =============================================================================================================================================================================
   "https://choice.k1.model.editor.kireji.io/base.uri": "https://decision.core.parts",
   "https://choice.k1.model.editor.kireji.io/constructor.js": `const model = [
 ["hand", "clapping", "hands", "clap", ["a", "sound"], ["a", "rhythm"], ["an", "echo"], ["a", "beat"], ["a", "pulse"], ["a", "motion"], ["a", "gesture"], ["a", "signal"], ["a", "wave"], ["a", "sign"]],
 ["foot", "standing", "feet", "stand", ["a", "foundation"], ["a", "stance"], ["a", "base"], ["a", "support"], ["a", "position"], ["a", "grounding"], ["a", "posture"], ["a", "bearing"], ["a", "rest"], ["a", "halt"]],
 ["eye", "seeing", "eyes", "see", ["a", "view"], ["vision"], ["a", "perspective"], ["a", "glimpse"], ["a", "sight"], ["an", "image"], ["a", "look"], ["a", "stare"], ["a", "gaze"], ["an", "observation"]],
 ["voice", "speaking", "voices", "speak", ["a", "chorus"], ["silence"], ["a", "whisper"], ["a", "tone"], ["a", "sound"], ["an", "utterance"], ["a", "declaration"], ["a", "pronouncement"], ["a", "speech"], ["a", "conversation"]],
 ["seed", "growing", "seeds", "grow", ["a", "field"], ["potential"], ["a", "sprout"], ["a", "plant"], ["a", "forest"], ["a", "garden"], ["a", "harvest"], ["a", "yield"], ["a", "crop"], ["a", "tree"]],
 ["drop", "falling", "drops", "fall", ["a", "rainstorm"], ["emptiness"], ["a", "splash"], ["a", "drizzle"], ["a", "torrent"], ["a", "downpour"], ["a", "shower"], ["a", "trickle"], ["a", "leak"], ["a", "cascade"]],
 ["note", "sounding", "notes", "sound", ["a", "melody"], ["harmony"], ["a", "tone"], ["a", "chord"], ["a", "resonance"], ["a", "vibration"], ["a", "frequency"], ["a", "pitch"], ["a", "scale"], ["a", "composition"]],
 ["breath", "exhaling", "breaths", "exhale", ["a", "wind"], ["emptiness"], ["a", "sigh"], ["a", "gasp"], ["a", "whiff"], ["a", "puff"], ["a", "draft"], ["an", "inspiration"], ["an", "expiration"], ["a", "respiration"]],
 ["shadow", "lengthening", "shadows", "lengthen", ["a", "dusk"], ["absence"], ["a", "shade"], ["a", "darkness"], ["a", "silhouette"], ["a", "phantom"], ["a", "specter"], ["a", "trace"], ["a", "vestige"], ["a", "reminder"]],
 ["tear", "falling", "tears", "fall", ["a", "flood"], ["sorrow"], ["a", "drop"], ["a", "stream"], ["a", "river"], ["a", "flow"], ["an", "outpouring"], ["a", "weeping"], ["a", "lament"], ["a", "cry"]],
 ["wave", "breaking", "waves", "break", ["a", "shore"], ["power"], ["a", "crest"], ["a", "trough"], ["a", "swell"], ["a", "surge"], ["a", "rip"], ["a", "current"], ["a", "tide"], ["a", "sea"]],
 ["spark", "igniting", "sparks", "ignite", ["a", "fire"], ["potential"], ["a", "flame"], ["an", "explosion"], ["a", "conflagration"], ["an", "outburst"], ["an", "eruption"], ["an", "ignition"], ["an", "incandescence"], ["a", "glow"]],
 ["word", "spoken", "words", "speak", ["a", "message"], ["meaning"], ["a", "sentence"], ["a", "story"], ["a", "poem"], ["a", "novel"], ["a", "conversation"], ["a", "dialogue"], ["a", "narrative"], ["a", "discourse"]],
 ["star", "twinkling", "stars", "twinkle", ["a", "sky"], ["distance"], ["a", "glimmer"], ["a", "sparkle"], ["a", "shine"], ["a", "brightness"], ["a", "constellation"], ["a", "galaxy"], ["a", "universe"], ["a", "cosmos"]],
 ["leaf", "rustling", "leaves", "rustle", ["a", "breeze"], ["wind"], ["a", "whisper"], ["a", "sound"], ["a", "noise"], ["a", "murmur"], ["a", "crackle"], ["a", "stirring"], ["a", "movement"], ["a", "shiver"]],
 ["bell", "ringing", "bells", "ring", ["a", "sound"], ["resonance"], ["a", "peal"], ["a", "chime"], ["a", "toll"], ["a", "clang"], ["a", "gong"], ["a", "carillon"], ["a", "knell"], ["a", "ding"]],
 ["clock", "ticking", "clocks", "tick", ["time", "passage"], ["precision"], ["a", "rhythm"], ["a", "beat"], ["a", "pulse"], ["a", "cadence"], ["a", "tempo"], ["a", "measure"], ["a", "movement"], ["a", "duration"]],
 ["drop", "dripping", "drops", "drip", ["a", "leak"], ["persistence"], ["a", "trickle"], ["a", "flow"], ["a", "stream"], ["a", "drizzle"], ["a", "rain"], ["a", "waterfall"], ["a", "source"], ["a", "moisture"]],
 ["flame", "flickering", "flames", "flicker", ["a", "fire"], ["light"], ["a", "glow"], ["a", "dance"], ["a", "movement"], ["a", "heat"], ["an", "ember"], ["an", "illumination"], ["an", "ignition"], ["a", "blaze"]],
 ["wave", "lapping", "waves", "lap", ["a", "shore"], ["water"], ["a", "beach"], ["a", "coastline"], ["a", "seashore"], ["a", "bank"], ["an", "edge"], ["a", "border"], ["a", "margin"], ["a", "rim"]],
 ["mind", "wandering", "you", "try to focus", ["a", "distraction"], ["a", "constant", "noise"], ["an", "endless", "loop"], ["a", "fleeting", "thought"], ["a", "persistent", "worry"], ["a", "quiet", "moment"]],
 ["soul", "searching", "you", "seek enlightenment", ["a", "mystery"], ["an", "eternal", "question"], ["a", "lifelong", "journey"], ["a", "divine", "spark"], ["a", "cosmic", "dance"], ["a", "silent", "knowing"]],
 ["heart", "aching", "you", "feel sorrow", ["a", "pain"], ["a", "heavy", "burden"], ["a", "deep", "wound"], ["a", "bitter", "memory"], ["a", "lingering", "sadness"], ["a", "gentle", "grief"]],
 ["body", "aging", "you", "experience time", ["a", "limitation"], ["a", "constant", "decay"], ["an", "inevitable", "end"], ["a", "fleeting", "moment"], ["an", "aging", "process"], ["an", "eternal", "now"]],
 ["dream", "fading", "you", "wake up", ["a", "reality"], ["a", "fleeting", "moment"], ["an", "illusion"], ["a", "nightmarish", "vision"], ["a", "peaceful", "slumber"], ["a", "dreamlike", "state"]],
 ["word", "spoken", "you", "express yourself", ["a", "meaning"], ["a", "power"], ["a", "limitation"], ["a", "misunderstanding"], ["a", "truthful", "statement"], ["a", "poetic", "expression"]],
 ["eye", "seeing", "you", "perceive the world", ["an", "illusion"], ["a", "reality"], ["a", "mystery"], ["an", "optical", "illusion"], ["a", "vivid", "image"], ["a", "blurred", "vision"]],
 ["ear", "hearing", "you", "listen to the silence", ["a", "sound"], ["a", "noise"], ["a", "music"], ["a", "whisper"], ["a", "shout"], ["a", "heartbeat"]],
 ["nose", "smelling", "you", "experience the aroma", ["a", "fragrance"], ["a", "stench"], ["a", "memory"], ["a", "pungent", "odor"], ["a", "delicate", "scent"], ["a", "fresh", "air"]],
 ["tongue", "tasting", "you", "savor the flavor", ["a", "delight"], ["a", "disgust"], ["a", "craving"], ["a", "sweetness"], ["a", "bitterness"], ["a", "spiciness"]],
 ["hand", "touching", "you", "feel the texture", ["a", "connection"], ["a", "separation"], ["empathy"], ["a", "warmth"], ["a", "coldness"], ["a", "roughness"]],
 ["foot", "stepping", "you", "walk the path", ["a", "journey"], ["a", "destination"], ["a", "direction"], ["a", "step"], ["a", "stride"], ["a", "dance"]],
 ["breath", "inhaling", "you", "draw in life", ["a", "cycle"], ["a", "moment"], ["eternity"], ["a", "sigh"], ["a", "gasp"], ["a", "pant"]],
 ["thought", "arising", "you", "ponder the unknown", ["a", "question"], ["an", "answer"], ["a", "doubt"], ["a", "curiosity"], ["a", "confusion"], ["a", "certainty"]],
 ["feeling", "emerging", "you", "experience emotion", ["a", "joy"], ["a", "sorrow"], ["a", "peace"], ["anger"], ["a", "fear"], ["a", "love"]],
 ["desire", "growing", "you", "seek fulfillment", ["a", "want"], ["a", "need"], ["a", "greed"], ["a", "longing"], ["a", "craving"], ["a", "satisfaction"]],
 ["fear", "creeping", "you", "face uncertainty", ["a", "doubt"], ["a", "panic"], ["a", "courage"], ["anxiety"], ["a", "terror"], ["a", "bravery"]],
 ["love", "blooming", "you", "connect with others", ["a", "compassion"], ["empathy"], ["an", "understanding"], ["a", "kindness"], ["a", "care"], ["affection"]],
 ["anger", "flaming", "you", "confront frustration", ["a", "rage"], ["a", "resentment"], ["a", "forgiveness"], ["an", "irritation"], ["a", "fury"], ["a", "calm"]],
 ["peace", "settling", "you", "find tranquility", ["a", "calm"], ["a", "serenity"], ["a", "harmony"], ["a", "silence"], ["a", "stillness"], ["a", "contentment"]]
]
super(model.map((row, i) => new T\`https://topic\${{
 "index.txt": "" + i,
 "base.uri": "https://decision.core.parts",
 "constructor.js": \`super(new Array(\${row.length - 4}).fill(0).map((_, i) => "observation" + i))\`,
}}.choice.k1.model.editor.kireji.io\`()))
this.model = model
console.log(this)`,
   // =============================================================================================================================================================================
   "https://thingdo.k1.model.editor.kireji.io/base.uri": "https://decision.core.parts",
   "https://thingdo.k1.model.editor.kireji.io/constructor.js": `super(new Array(10).fill(0).map((_, i) => new T\`https://a\${{
 "index.txt": "" + i,
 "base.uri": "https://adjectives.b2.model.editor.kireji.io"
}}.b3.model.editor.kireji.io\`())))`,
   // =============================================================================================================================================================================
   "https://adjectives.b3.model.editor.kireji.io/base.uri": "https://decision.core.parts",
   "https://adjectives.b3.model.editor.kireji.io/constructor.js": `super(["empty", "https://adjectives.b2.model.editor.kireji.io", "a2", "a3"])`,
   "https://adjectives.b3.model.editor.kireji.io/create.js": `await super.create()
this.container = this.controller.container`,
   // =============================================================================================================================================================================
   "https://a2.adjectives.b3.model.editor.kireji.io/base.uri": "https://composite.core.parts",
   "https://a2.adjectives.b3.model.editor.kireji.io/constructor.js": `super(new Array(2).fill(0).map((_, i) => new T\`https://a\${{
 "index.txt": "" + i,
 "base.uri": "https://adjectives.b2.model.editor.kireji.io"
}}.b3.model.editor.kireji.io\`()))`,
   "https://a2.adjectives.b3.model.editor.kireji.io/create.js": `await super.create()
this.container = this.controller.container.appendChild(document.createElement("span"))`,
   // =============================================================================================================================================================================
   "https://a3.adjectives.b3.model.editor.kireji.io/base.uri": "https://composite.core.parts",
   "https://a3.adjectives.b3.model.editor.kireji.io/constructor.js": `super(new Array(3).fill(0).map((_, i) => new T\`https://a\${{
"index.txt": "" + i,
"base.uri": "https://adjectives.b2.model.editor.kireji.io"
}}.b3.model.editor.kireji.io\`()))`,
   "https://a3.adjectives.b3.model.editor.kireji.io/create.js": `await super.create()
this.container = this.controller.container`,
   // =============================================================================================================================================================================
   "https://word.model.editor.kireji.io/base.uri": "https://decision.core.parts",
   "https://word.model.editor.kireji.io/create.js": `
this.container = this.controller.container.appendChild(document.createElement("span"))
this.container.setAttribute("data-origin", this.origin)
this.populate = () => {
 this.container.innerHTML = this.option.part.origin.slice(8).split(".")[0]
}`,
   "https://word.model.editor.kireji.io/checkout.js": `await super.checkout(index)
this.populate()`,
   "https://word.model.editor.kireji.io/notify.js": `await super.notify(...sources)
this.populate()`,
   "https://word.model.editor.kireji.io/destroy.js": `this.container.remove()
await super.destroy()`,
   // =============================================================================================================================================================================
   "https://adjectives.b2.model.editor.kireji.io/base.uri": "https://word.model.editor.kireji.io",
   "https://adjectives.b2.model.editor.kireji.io/constructor.js": `super([
 "prime",
 "pre-origin",
 "post-origin",
 "redundant",
 "added",
 "reusable",
 "empty",
 "hash-stored",
 "dead",
 "implicit",
 "critical",
 "new",
 "explicit",
 "certain",
 "desirable",
 "real",
 "complete",
 "prior",
 "non-empty",
 "straight",
 "minimum",
 "executive",
 "necessary",
 "required",
 "intended",
 "non-zero",
 "static",
 "arbitrary",
 "constructed",
 "potential",
 "current",
 "old",
 "potential",
 "cloned",
 "resulting",
 "quick",
 "successive",
 "various",
 "large",
 "unique",
 "inherent",
 "physical",
 "rendered",
 "partial",
 "separate",
 "structural",
 "locked",
 "different",
 "apparent",
 "overall",
 "settable",
 "environmental",
 "independent",
 "single",
 "hybrid",
 "no-client",
 "entire-factor",
 "per-non",
 "client-side",
 "initial",
 "future",
 "consequential",
 "outgoing",
 "incoming",
 "alternate",
 "specific",
 "flaming",
 "supported",
 "key-value",
 "false",
 "open",
 "cached",
 "Missing",
 "same",
 "flat",
 "early",
 "ready",
 "previous",
 "new",
 "tagged",
 "signed",
 "expected",
 "leading",
 "Variable-length",
 "Invalid",
 "compressed",
 "extended",
 "private",
 "total",
 "major",
 "minor",
 "orig",
 "hasTransform",
 "installed",
 "parsed",
 "built",
 "styled",
 "inheriting",
 "loaded",
 "selected",
 "woff",
 "noFocus"
])`,
   // =============================================================================================================================================================================
   "https://nouns.b1.model.editor.kireji.io/base.uri": "https://word.model.editor.kireji.io",
   "https://nouns.b1.model.editor.kireji.io/constructor.js": `super([
 "cars", 
 "cats", 
 "dogs", 
 "birds",
 "subsets",
 "factors",
 "powersets",
 "poems",
 "primes",
 "websites",
 "menus",
 "origins",
 "states",
 "problems",
 "components",
 "results",
 "documents",
 "sites",
 "moments",
 "goals",
 "things",
 "landmines",
 "designs",
 "questions",
 "times",
 "introductions",
 "contents",
 "contrasts",
 "matters",
 "facts",
 "intents",
 "contexts",
 "environments",
 "numbers",
 "instructions",
 "classes",
 "apps",
 "parts",
 "arguments",
 "subparts",
 "tasks",
 "branches",
 "bugs",
 "offsets",
 "coefficients",
 "events",
 "objects",
 "signals",
 "changes",
 "settings",
 "data",
 "flows",
 "methods",
 "updates",
 "schemes",
 "indices",
 "inputs",
 "uris",
 "RangeErrors",
 "typenames",
 "integers",
 "structures",
 "representations",
 "examples",
 "versions",
 "computations"
])`,
   // =============================================================================================================================================================================
   "https://verbs.b1.model.editor.kireji.io/base.uri": "https://word.model.editor.kireji.io",
   "https://verbs.b1.model.editor.kireji.io/constructor.js": `super([
 "jump",
 "run",
 "eat",
 "smile",
 "must",
 "look",
 "perform",
 "subtract",
 "change",
 "rest",
 "wait",
 "forget",
 "step",
 "leave",
 "enter",
 "start",
 "extend",
 "showStatus",
 "assert",
 "await",
 "populate",
 "warn",
 "have",
 "construct",
 "maintain",
 "compute",
 "pass",
 "control",
 "stop",
 "repopulate",
 "check",
 "consider",
 "modify",
 "set",
 "invert",
 "integrate",
 "use",
 "remove",
 "craft",
 "harvest",
 "provide",
 "update",
 "return",
 "throw",
 "create",
 "slice",
 "replace",
 "extend",
 "eval",
 "log",
 "appear",
 "support",
 "gain",
 "imagine",
])`,
   // =============================================================================================================================================================================
   "https://editor.kireji.io/base.uri": "https://composite.core.parts",
   "https://editor.kireji.io/constructor.js": `super(["model"])`,
   "https://editor.kireji.io/create.js": `this.nodes = {}
this.toolbar = this.controller.getNestedToolbar()
this.toolbar.styleSheet.replaceSync(\`@media (width < 650px) {
 label {
  display: none;
 }
}\`)
this.controller.styleSheet.replaceSync(\`:host {
 background: silver;
 display: flex;
 flex-flow: row wrap;
 gap: 1ch;
 font-size: min(5vw, 5vh);
 justify-content: center;
 align-content: center;
}
:host > p {
 width: 55%;
 text-align: center;
 margin: 0;
}\`)
this.container = this.controller.container`,
   // =============================================================================================================================================================================
   "https://ejaugust.com/base.uri": "https://menu.core.parts",
   "https://ejaugust.com/constructor.js": `super("error404")`,
   "https://ejaugust.com/style.css": `#toolbar {
 background: transparent;
 box-shadow: none;
}
#toolbar > h1 {
 display: none
}`,
   "https://graph.error404.ejaugust.com/inputs.txt": "asciiGraph",
   "https://graph.error404.ejaugust.com/base.uri": "https://decision.core.parts",
   "https://graph.error404.ejaugust.com/render.js": `await super.render()
const
 ln = this.option.i,
 col = this.option.part.option.i

const
 lastLine = this.lines[ln],
 firstOldLine = this.oldLines[ln],
 lastChar = lastLine[col],
 firstOldChar = firstOldLine[col],
 lines = this.lines.slice(0, ln).map(line => \`<span class=newLine>\${line}</span>\`),
 oldLines = this.oldLines.slice(ln + 1).map(line => \`<span class=oldLine>\${line}</span>\`),
 segment = lastLine.slice(0, col),
 oldSegment = firstOldLine.slice(col + 1)

lines.push(\`<span id=ln><span class=newLine>\${segment}<span id=col>\${lastChar}</span></span><span class=oldLine>\${oldSegment}</span></span>\`, ...oldLines)

this.controller.graphNode.innerHTML = lines.join("\\n")`,
   "https://graph.error404.ejaugust.com/constructor.js": `super(new Array(24).fill(0).map((_, i) => new T\`https://line\${{
 "index.txt": "" + i,
 "base.uri": "https://decision.core.parts",
 "constructor.js": \`super(new Array(80).fill(0).map((_, i) => "char" + i))\`,
}}.graph.error404.ejaugust.com\`()))`,
   "https://graph.error404.ejaugust.com/create.js": `if (!this.ascii) {
 this.ascii ??= D[this.origin + "/ascii.txt"]
 this.oldOrigin ??= this.controller.parts[(this.i || this.controller.parts.length) - 1].origin
 this.oldAscii ??= D[this.oldOrigin + "/ascii.txt"]
 this.lines ??= this.ascii.split("\\n").slice(1, 25)
 this.oldLines ??= this.oldAscii.split("\\n").slice(1, 25)
 while(this.oldLines.length < 24) this.oldLines.push("".padEnd(80, " "))
 while(this.lines.length < 24) this.lines.push("".padEnd(80, " "))
}`,
   "https://graph0.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph0.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                   404                                          
                                Not found                                       
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
           The location hash                                                    
           1. is a base64-encoded integer up to 12 kilobits long.               
           2. determines how to render the page.                                
           3. encodes data across various categories.                           
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph1.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph1.error404.ejaugust.com/ascii.txt": `
                                   URL x ASCII                                  
                            +-------------------------+                         
                              0   0   1   1   1   1                             
                              1   1   0   0   1   1                             
                              0   1   0   1   0   1                             
                            +-------------------------+                         
                     0000   |     0●  @●  P●  \`○  p●                            
                     0001   | !●  1●  A●  Q●  a●  q●                            
                     0010   | "○  2●  B●  R●  b●  r●                            
                     0011   | #●  3●  C●  S●  c●  s●                            
                     0100   | $●  4●  D●  T●  d●  t●                            
                     0101   | %○  5●  E●  U●  e●  u●                            
                     0110   | &●  6●  F●  V●  f●  v●                            
                     0111   | '●  7●  G●  W●  g●  w●                            
                     1000   | (●  8●  H●  X●  h●  x●                            
                     1001   | )●  9●  I●  Y●  i●  y●                            
                     1010   | *●  :●  J●  Z●  j●  z●                            
                     1011   | +●  ;●  K●  [●  k●  {○                            
                     1100   | ,●  <○  L●  \\○  l●  |○                            
                     1101   | -●  =●  M●  ]●  m●  }○                            
                     1110   | .●  >○  N●  ^○  n●  ~●                            
                     1111   | /●  ?●  O●  _●  o●                                
                                                                                
                                                                                `,
   "https://graph2.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph2.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                   404                                          
                                Not found                                       
                                                                                
                                                                                
                                                                                
                                                                                
           "\\u{100000}": "\\u{10000a}\\u{f0000}\\u{e005}",                         
           "\\u{100001}": "\\u{e010}\\u{f0001}\\u{e005}",                           
           "\\u{100002}": "\\u{100001}\\u{100009}\\u{e007}",                        
           "\\u{100003}": "\\u{e010}\\u{100002}\\u{e008}",                          
           "\\u{100004}": "\\u{e00e}\\u{e00f}\\u{e006}",                            
           "\\u{100006}": "\\u{e00d}\\u{f0004}\\u{100007}\\u{e00b}",                 
           "\\u{100007}": "\\u{e011}\\u{f0003}\\u{e005}",                           
           "\\u{100008}": "\\u{e003}",                                            
           "\\u{100009}": "\\u{e004}",                                            
           "\\u{10000a}": "\\u{e000}\\u{f0000}\\u{e005}                             
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph3.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph3.error404.ejaugust.com/ascii.txt": `
     ○○○○○  =>  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○     
     ○○○○●  =>  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○                 
     ○○○●○  =>  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○             ○ ○ ○ ○ ○ ○     
     ○○○●●  =>  ○ ○ ○ ○ ○   ○ ○ ○ ○ ○   ○ ○ ○ ○ ○                               
     ○○●○○  =>  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○             ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○     
     ○○●○●  =>  ○ ○ ○   ○ ○ ○ ○ ○   ○ ○             ○ ○ ○ ○ ○                   
     ○○●●○  =>  ○   ○ ○ ○ ○ ○   ○ ○ ○ ○                         ○ ○ ○ ○ ○       
     ○○●●●  =>  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○           ●           ●           ●     
     ○●○○○  =>  ○ ○ ○ ○ ○ ○             ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○     
     ○●○○●  =>  ○ ○ ○ ○   ○             ○ ○ ○ ○ ○ ○ ○ ○ ○   ○ ○                 
     ○●○●○  =>  ○ ○   ○ ○ ○             ○ ○ ○ ○ ○ ○             ○ ○ ○   ○ ○     
     ○●○●●  =>  ○ ○ ○ ○ ○ ○           ● ○ ○ ○ ○ ○ ○       ●           ●         
     ○●●○○  =>    ○ ○ ○ ○ ○                         ○   ○ ○ ○ ○ ○   ○ ○ ○ ○     
     ○●●○●  =>  ○ ○ ○ ○ ○ ○       ●           ●     ○ ○ ○ ○ ○ ○   ●             
     ○●●●○  =>  ○ ○ ○ ○ ○ ○   ●           ●           ●         ○ ○ ○ ○ ○ ○     
     ○●●●●  =>  ○ ○ ○ ○ ○ ○                                                     
     ●○○○○  =>              ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○     
     ●○○○●  =>              ○ ○ ○ ○   ○ ○ ○ ○ ○   ○ ○ ○ ○ ○   ○                 
     ●○○●○  =>              ○ ○   ○ ○ ○ ○ ○   ○ ○ ○             ○ ○ ○ ○   ○     
     ●○○●●  =>            ● ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○         ●           ●       
     ●○●○○  =>              ○ ○ ○ ○ ○ ○             ○ ○   ○ ○ ○ ○ ○   ○ ○ ○     
     ●○●○●  =>        ●     ○ ○ ○ ○ ○ ○         ●   ○ ○ ○ ○ ○ ○     ●           
     ●○●●○  =>    ●         ○ ○ ○ ○ ○ ○     ●           ●       ○ ○ ○ ○ ○ ○     
     ●○●●●  =>              ○ ○ ○ ○ ○ ○                                         `,
   "https://graph4.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph4.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                                                                
                              1    1    1    1                                  
                    1    1    0    0    1    1                                  
               1    0    1    0    1    0    1                                  
          0╶───┬────┬────┬───────────────────╮                                  
          ┃    ╎    ╎    ╎                   │                                  
        1 ┗━━━━┓╶╶╶╶╎╶╶╶╶╎╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶│╴╴╴╴╴╴╴╴Red╴╴╴╴╴╴╴╴╴╴╴╴╴╴> valid  
          │    ┃    ╎    ╎                   │                                  
     1  0 ├╶╶╶╶┗━━━━┓╶╶╶╶╎╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶│╴╴╴╴╴╴╴╴╴╴╴╴╴Green╴╴╴╴╴╴╴> valid  
          │    ╎    ┃    ╎                   │                                  
     1  1 │    ╎    ┃    ╎                   │        Red  Green                
          │    ╎    ┃    ╎                   │                                  
  1  0  0 ├╶╶╶╶╎╴╴╴╴┗━━━━┓╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶│╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Blue╴> valid  
          │    ╎    ╎    ┃                   │                                  
  1  0  1 │    ╎    ╎    ┃                   │        Red         Blue          
          │    ╎    ╎    ┃                   │                                  
  1  1  0 │    ╎    ╎    ┃                   │             Green  Blue          
          │    ╎    ╎    ┃                   │                                  
  1  1  1 ╰────┴────┴───╴╹╶──────────────────╯        Red  Green  Blue          
                                                                                
                                                                                
                                                                                `,
   "https://graph5.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph5.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
      100                                  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╸      
       11                   ┏━━━━━━━━━━━━━━┛                                    
       10           ┏━━━━━━━┛              ╎                                    
        1       ┏━━━┛       ╎              ╎                                    
        0 ╺━━━━━┛   ╎       ╎              ╎                                    
                ╎   ╎       ╎              ╎                                    
                0   0       0              1                                    
                1   1       1              0                                    
                1   0       0              0                                    
                0   1       0              0                                    
                0   0       1              0                                    
                0   0       0              1                                    
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph6.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph6.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                   404                                          
                                Not found                                       
                                                                                
                                                                                
                                                                                
                    n | k                         k                             
                    0 | 2970                      │      /                      
                    1 | 2975                2980 ┄┼┄┄┄┄┄●                       
                    2 | 2980                      │    /┆                       
                    3 | 2985                2975 ┄┼┄┄┄● ┆                       
                    4 | 2990                      │  /┆ ┆                       
                    5 | 2995            k = 2970 ┄┼┄● ┆ ┆                       
                    6 | 3000                      ╰─┼─┼─┼─ n                    
                    ...                             0 1 2                       
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph7.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph7.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                   404                                          
                                Not found                                       
╭┄┄┄┄┄┄┄┄┄┄┄┄┬○┄┄┄┄┄┄┄┄┄┄┄┬●┄┄┄┄┄┄┄┄┄┄┄╮╭○━●┄┄┄┄┄┄┄┄┄○━○━●┄┄┄┄┄┄┄┄┬○━○━●━●┄┄┄┄┄╮
╎ ○          ┊○           ○━●          ╎┊●━○         ○━○━○━●      ┊●━○━○━●     ╎
╎ ● ○        ┊○           ○ ○━●        ╎┊○━●         ○ ○━○━●━●    ┊●━●━○━○     ╎
╎   ● ○      ┊○           ╎ ○ ○━●      ╎┊●━○         ╎ ○ ○━○━●━●  ┊○━●━●━○     ╎
╎     ● ○    ┊○           ╎   ○ ○━●    ╎┊○━●         ╎   ○ ○━○━●━●┊○━○━●━●     ╎
╎       ● ○  ┊○           ╎     ○ ○━●  ╎┊●━○         ╎     ○ ○━○━●┥●━○━○━●     ╎
╎         ● ○┊○           ╎       ○ ○━●╎┊○━●         ╎       ○ ○━○┥●━●━○━○     ╎
╎           ●┊○           ╎         ○ ○┥╎●━○         ╎         ○ ○┥○━●━●━○     ╎
╎            ┊● ○         ╎           ○╎╎○━●         ╎           ○┊○━○━●━●     ╎
╎            ┊  ● ○       ╎            ╎╎○ ○━●       ╎            ┊○ ○━○━●━●   ╎
╎            ┊    ● ○     ╎            ╎╎  ○ ○━●     ╎            ┊  ○ ○━○━●━● ╎
╎            ┊      ● ○   ╎            ╎╎    ○ ○━●   ╎            ┊    ○ ○━○━●━●
╎            ┊        ● ○ ╎            ╎╎      ○ ○━● ╎            ┊      ○ ○━○━●
╎            ┊          ● ╎            ╎╎        ○ ○━●            ┊        ○ ○━○
╎            ┊            ╎            ╎╎          ○ ○            ┊          ○ ○
╰┄┄┄┄┄┄┄┄┄┄┄┄┴┄┄┄┄┄┄┄┄┄┄┄┄┴┄┄┄┄┄┄┄┄┄┄┄┄╯╰┄┄┄┄┄┄┄┄┄┄┄┄○┄┄┄┄┄┄┄┄┄┄┄┄┴┄┄┄┄┄┄┄┄┄┄┄○╯
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph8.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph8.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                   404                                          
                                Not found                                       
                                                                                
                                                                                
                                                                                
                                                                                
╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ v ┄┄┄┬ c ╮╭┄ t ┄┬┄ n ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
│                            / | \\  │   ││ / \\ │ / \\                           │
│                           ●       │ ● ││ ●   │   ●                           │
│                           ●       │   ││   ● │   ●                           │
│                              ●    │ ● ││ ●   │   ●                           │
│                              ●    │   ││   ● │   ●                           │
│                              ●    │   ││     │ ●                             │
╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄●┄┴┄┄┄╯╰┄┄┄┄┄┴┄●┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph9.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph9.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                                                                
                                   404                                          
                                Not found                                       
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
      comment ╶╮╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╮                         
      text     ⎬╴ characters ╶╮                       ⎬╴ 1 of 4 minor types     
      cdata   ╶╯              ⎬╴ 1 of 2 major types   │                         
      element  }╴ container  ╶╯╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╯                         
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph10.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph10.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                    404                                         
                                 Not found                                      
                                                                                
                                                                                
                                                                                
                                                                                
                ╭one┄of┄your┄user┄states┄is┄only┄100┄grains┄of╮                 
                │y randomly added pepperoni, all of the flour │                 
                │ pepperoni, people do travel to random points│                 
                │entirely possible for 100% of users exploring│                 
                │ smaller space is the "default space" and doe│                 
                │Use Part.get() differently for the core ... a│                 
                │e... the first index is always 0 which we kno│                 
                ╰et┄us┄try┄to┄go┄to┄index┄5┄-┄where┄"."┄is┄sel╯                 
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph11.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph11.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                   404                                          
                                Not found                                       
                                                                                
                                                                                
                                                                                
                                                                                
                ╭collection┄of┄always-constraint-consistent┄va╮                 
                │tively maps to a point in the core part's con│                 
                │sents the cache of all values which are neede│                 
                │ins the state of every core part with each of│                 
                │tively maps to an integer address which is sa│                 
                │e changed only if the new state also correspo│                 
                │the document according to the values cached o│                 
                ╰┄all┄the┄references┄needed┄to┄trace┄the┄relat╯                 
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph12.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph12.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                                                                
                                 404                                            
                              Not found                                         
                                                                                
                                                                                
                                                                                
                ╭Thus,┄I┄have┄decided┄to┄change┄empty┄from┄a┄p╮                 
                │But wait ... we should not forget that the em│                 
                │The goal the empty document accomplished for │                 
                │1. We destroy the empty state the moment we b│                 
                │2. The "empty" state isn't empty; at a minimu│                 
                │The reason this is so is because the empty st│                 
                │We can *never* undo certain things once we've│                 
                ╰At┄least┄some┄of┄those┄things┄are┄desirable.┄╯                 
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                `,
   "https://graph13.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph13.error404.ejaugust.com/ascii.txt": `
                                                                                
                                    404                                         
                                 Not found                                      
                                                                                
                                                                                
                                                                                
                               3n, 100n, 5n                                     
                                |     |   |  1n   <-- start                     
                                |     |    \\ /|                                 
                                |     |     * |                                 
                                |     |    /  |                                 
                                |     |  5n, 1n                                 
                                |      \\ /|   |                                 
                                |       * |   |                                 
                                |      /  |   |                                 
                                |  500n, 5n, 1n                                 
                                 \\   /|   |   |                                 
                                  \\ / |   |   |                                 
                                   *  |   |   |                                 
                                  /   |   |   |                                 
                            1500n, 500n, 5n, 1n                                 
                                                                                
                                                                                
                                                                                `,
   "https://graph14.error404.ejaugust.com/base.uri": "https://graph.error404.ejaugust.com",
   "https://graph14.error404.ejaugust.com/ascii.txt": `
                                                                                
                                                                                
                                                                                
                                         404                                    
                                      Not found                                 
                                                                                
                                                                                
               00000 can add one:                                               
               00001 }----- first                                               
               00010 \\                                                          
               00100 |___ these four variants of the first                      
               01000 |                                                          
               10000 /                                                          
              00001 can add one: }                                              
               00011             }                                              
               00101             }---- first                                    
               01001             }                                              
               10001             }                                              
              00010 can add one: \\                                              
               00011              \\                                             
               ...                 \\_____ four more variants of the first       
                                                                                
                                                                                
                                                                                `,
   // =============================================================================================================================================================================
   "https://error404.ejaugust.com/base.uri": "https://decision.core.parts",
   "https://error404.ejaugust.com/constructor.js": `super(new Array(15).fill(0).map((_, i) => "graph" + i))`,
   "https://error404.ejaugust.com/create.js": `const
 lightColor = D["https://core.parts/light.color"],
 darkColor = D["https://core.parts/dark.color"]

this.controller.styleSheet.replaceSync(\`:host {
 background: \${lightColor};
 color: \${darkColor};
 display: flex;
 flex-flow: column;
 align-items: center;
 justify-content: center;
 top: 0;
 font-size: min(4vh, 3vw);
 box-sizing: border-box;
 border-radius: 18px;
 overflow: hidden;
 background-color: rgb(0, calc(1 * 63), 0, 0.1);
 background-image: radial-gradient(#0004 min(0.09vh, 0.06vw), transparent 0);
 line-height: min(3vh, 2vw);
 background-size: 1ch min(3vh, 2vw);
 /* letter-spacing: min(3vh, 2vw); */
 transform: scale(.75);
 box-shadow: 1.5px 6px 7px #0007;
 font-size: min(2vh, 1.5vw);
 color: rgb(0, calc(1 * 63), 0);
}
h1, p {
 margin: 0;
 padding: 0;
 color: rgb(0, calc(1 * 63), 0);
}
pre {
 width: 80ch;
}\`)

this.controller.container.innerHTML = \`<h1>404</h1><p>Not found.</p>\`
this.graphNode = this.controller.container.appendChild(document.createElement("pre"))

const loop = () => {
 const x = BigInt(Date.now()), q = this.parts[0].size, p = 10n, max = (...args) => args.reduce((m, e) => e > m ? e : m)
 this.goto(((x/q)*q+max(0n,(x%q)*p-q*(p-1n))) % this.size)
 requestAnimationFrame(loop)
}
requestAnimationFrame(loop)`,
   "https://error404.ejaugust.com/destroy.js": `await super.destroy()
   this.container.innerHTML = ""
   this.styleSheet.replaceSync("")`,
   // =============================================================================================================================================================================
   "https://orenjinari.com/base.uri": "https://menu.core.parts",
   "https://orenjinari.com/constructor.js": `super("error404")`,
   "https://orenjinari.com/style.css": `#toolbar {
 background: transparent;
 box-shadow: none;
}
#toolbar > h1 {
 display: none
}`,
   // =============================================================================================================================================================================
   "https://error404.orenjinari.com/create.js": `const
 lightColor = D["https://core.parts/light.color"],
 darkColor = D["https://core.parts/dark.color"]

this.controller.styleSheet.replaceSync(\`:host {
 background: \${lightColor};
 color: \${darkColor};
 display: flex;
 flex-flow: column;
 align-items: center;
 justify-content: center;
 top: 0;
 font-size: min(4vh, 3vw);
}
h1, p {
 margin: 0;
 padding: 0;
}
#img404 {
 max-width: 75vw;
 max-height: 50vh;
}\`)

this.controller.container.innerHTML = \`<h1>404</h1>
<p>Page not found... perhaps elsewhere</p>
<img id=img404 src="404.png">\``,
   "https://error404.orenjinari.com/destroy.js": `await super.destroy()
   this.container.innerHTML = ""
this.styleSheet.replaceSync("")`,
   // =============================================================================================================================================================================

   // =============================================================================================================================================================================
   "https://core.parts/version.txt": "0.90.0",
   "https://core.parts/logging.txt": "false",
   "https://core.parts/verbose.txt": "false",
   "https://core.parts/light.color": "#faf9f8",
   "https://core.parts/dark.color": "#1f2023",
   // =============================================================================================================================================================================
   "https://composite.core.parts/inputs.txt": `factors`,
   "https://composite.core.parts/constructor.js": `super()
if (!factors) throw new RangeError(\`missing constructor input: "factors" (\${this.origin})\`)
const units = this.units = [1n]
this.factors = {}
this.parts = factors.reduceRight((parts, part, i) => {
 if (typeof part === "string") part = part.startsWith("https://") ? new (T([part]))() : new (T([\`https://\${part}.\${this.origin.slice(8)}\`]))()
 if (!(part instanceof T\`https://base.core.parts\`)) throw new TypeError(\`unexpected \${typeof part} encountered as factor of composite \${this.origin}\`)
 if (part.origin in this.factors) throw new RangeError(\`duplicate part \${part.origin} in composite \${this.origin}\`)
 this.factors[part.origin] = { part, i, indexCache: part.index, get unit() { return units[i] } }
 parts.unshift(part)
 units.unshift(units[0] * part.size)
 part.controller = this
 part.i = i
 return parts
}, [])
this.size = this.units.shift()`,
   "https://composite.core.parts/checkout.js": `if (this.index !== index) {
 await super.checkout(index)
 for (let x = 0; x < this.units.length; x++) {
  const
   part = this.parts[x],
   factor = this.factors[part.origin],
   unit = factor.unit,
   subindex = index / unit
  await part.checkout(subindex)
  factor.indexCache = subindex
  index %= unit
 }
}`,
   "https://composite.core.parts/destroy.js": `await super.destroy()
for (const part of this.parts) await part.destroy()`,
   "https://composite.core.parts/notify.js": `for (const source of sources) {
 const
  factor = this.factors[source],
  { part, indexCache } = factor,
  { index: subindex } = part,
  unit = factor.unit,
  difference = subindex - indexCache,
  deltaIndex = difference * unit

 this.index = this.index + deltaIndex
 factor.indexCache = subindex
}
await super.notify(...sources)`,
   // =============================================================================================================================================================================
   "https://bitmask.core.parts/inputs.txt": "length",
   "https://bitmask.core.parts/constructor.js": `super()
this.size = 2n ** BigInt(length)`,
   // =============================================================================================================================================================================
   "https://decision.core.parts/inputs.txt": "parts",
   "https://decision.core.parts/constructor.js": `super()
let offset = 0n
this.size = 0n
this.options = {}
if (!parts || !parts.length) throw new RangeError(\`a decision must have at least 1 option (\${this.origin})\`)
this.parts = parts.map((part, i) => {
 if (typeof part === "string") part = part.startsWith("https://") ? new (T([part]))() : new (T([\`https://\${part}.\${this.origin.slice(8)}\`]))()
 if (!(part instanceof T\`https://base.core.parts\`)) throw new TypeError(\`unexpected \${typeof e} encountered at part = \${i} of decision \${this.origin}\`)
 this.options[part.origin] = { part, i, offset }
 offset += part.size
 this.size += part.size
 part.controller = this
 part.i = i
 return part
})`,
   "https://decision.core.parts/checkout.js": `if (this.index !== index) {
 await super.checkout(index)
 for (const part of this.parts) {
  if (index < part.size) {
   if (this.option?.part !== part) {
    await this.option?.part?.destroy()
    this.option = this.options[part.origin]
    await part.checkout(index)
   } else await part.checkout(index)
   break
  }
  index -= part.size
 }
}`,
   "https://decision.core.parts/destroy.js": `await super.destroy()
await this.option?.part?.destroy()
delete this.option`,
   "https://decision.core.parts/notify.js": `this.index = this.option.offset + this.option.part.index
await super.notify(...sources)`,
   // =============================================================================================================================================================================
   "https://server.core.parts/create.js": `
const cache = {},
   boilerplate = "© 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved."
  _.onfetch = e => {
   // TODO: detect and throw error on any cross-deployment-stage resource fetches.
   const { pathname, host, origin } = new URL(e.request.url),
    isDevHost = host.startsWith("dev.") || host === "ejaugust.github.io",
    shortname = host
     .split(".")
     .slice(isDevHost ? 1 : 0, -1)
     .join("."),
    cacheKey = host + pathname
   if (isDevHost !== IS_DEV_HOST) throw new ReferenceError(\`cannot request assets across deployment stages (\${e.request.url})\`)
   if (!(cacheKey in cache)) {
    let body, type, base64Encoded
    switch (pathname) {
     case "/.gitignore":
      type = "text/plain"
      body = \`# \${boilerplate}
**/.DS_Store
**/Icon
**/.well-known
**/.tmp.driveupload
**/.tmp.drivedownload
**/*.gdoc
.vscode/scratch/*
favicon.gif
favicon.ico\`
      break
     case "/.htaccess":
      type = "text/plain"
      body = \`# \${boilerplate}
AddCharset utf-8 .js
ErrorDocument 404 /index.html
ErrorDocument 403 /index.html
Options -Indexes\`
      break
     case "/README.md":
      type = "text/markdown; charset=UTF-8"
      body = \`<!--- \${boilerplate} --->
# About core_parts
This project aims to meet a large number of requirements which we will detail later.
Every app has a host (domain name) where it can be publically reached.
Domains beginning with the "dev." subdomain are dedicated to an unstable (but still publically available) version of the app used for staging changes.\`
      break
     case "/server.js":
     case "/client.js":
       body = \`// \${boilerplate}\n\${boot}\nboot()\`
      type = "text/javascript; charset=UTF-8"
      break
     case "/manifest.json":
      const manifest = {
       name: host,
       short_name: shortname,
       start_url: ".",
       display: "standalone",
       theme_color: "#faf9f8",
       background_color: "#faf9f8",
       description: "This app is under development.",
       display_override: ["window-controls-overlay"],
       icons: [
        {
         src: "favicon.svg",
         sizes: "144x144",
         type: "image/svg+xml",
        },
        {
         src: "favicon.svg",
         sizes: "any",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-192x192.png",
         sizes: "192x192",
         type: "image/svg+xml",
        },
        {
         src: "/android-chrome-512x512.png",
         sizes: "512x512",
         type: "image/svg+xml",
        },
       ],
       categories: ["entertainment", "games", "utilities"] /*
       protocol_handlers: [
        {
         protocol: "web+core_parts",
         url: "/core_parts?pathname=%s",
        },
       ],
       shortcuts: [
        {
         name: "New Item...",
         short_name: "New...",
         icons: [
          {
           src: "favicon.svg",
           sizes: "any",
           type: "image/svg+xml",
          },
         ],
         url: "/new",
         description: "This is just a placeholder/hint for future development.",
        },
       ],
       screenshots: [
        {
         src: "desktop-screenshot.svg",
         sizes: "640x480",
         type: "image/svg+xml",
         form_factor: "wide",
         label: "This is a placeholder for the image of the app.",
        },
        {
         src: "mobile-screenshot.svg",
         sizes: "640x360",
         type: "image/svg+xml",
         form_factor: "narrow",
         label: "This is a placeholder for the image of the app.",
        },
       ],*/,
      }
      body = JSON.stringify(manifest, null, 1)
      type = "application/json; charset=UTf-8"
      break
      type = "image/svg+xml"
      break
     case "/404.png":
      type = "image/png"
      base64Encoded = true
      body = "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"
      break
     case "/favicon.svg":
     case "/favicon.ico":
     case "/apple-touch-icon.png":
     case "/mobile-screenshot.svg":
     case "/desktop-screenshot.svg":
     case "/android-chrome-192x192.png":
     case "/android-chrome-512x512.png":
      type = "image/svg+xml"
      body = \`<svg width="144px" height="144px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <style>
  svg { background: white }
  text { fill: #333445 }
  @media (prefers-color-scheme = dark) {
   svg { background: #333445 }
   text { fill: white }
  }
 </style>
 <text x="12" y="12" dominant-baseline="central" text-anchor="middle">\${shortname[0]}</text>
</svg>\`
      break
     default:
      body = \`<!DOCTYPE html>
<html lang=en>
<head>
 <!-- \${boilerplate} -->
 <link rel=manifest href="\${origin}/manifest.json">
 <link rel="me" href="https://universeodon.com/@kireji" />
 <meta name=robots content=noindex>
 <meta name=viewport content="width=device-width,initial-scale=1">
 <script defer src="\${origin}/client.js"></script>
 <title>Loading ...</title>
</head>
</html>\`
      type = "text/html; charset=UTF-8"
    }
    
   if (base64Encoded) {
    const B = atob(body), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A);
    for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
    body = new Blob([I], { type });
   }

    cache[cacheKey] = new Response(body, {
     headers: {
      "content-type": type,
      expires: "Sun, 20 Jul 1969 20:17:00 UTC",
      server: "kireji",
     },
    })
   }
   e.respondWith(cache[cacheKey].clone())
  }
  _.oninstall = e => _.skipWaiting()
  _.onactivate = e => _.clients.claim()
  _.onmessage = e => [onactivate, () => registration.unregister().then(() => e.source.postMessage({ code: 0 }))][e.data.code]()`,
   // =============================================================================================================================================================================
   "https://app.core.parts/base.uri": "https://composite.core.parts",
   "https://app.core.parts/create.js": `
info("An application exists but it doesn't do anything. Setting up universal application events and variables.")
const
 n = navigator,
 a = n.userAgent,
 c = n.serviceWorker,
 g = n.gpu,
 isMac = a.indexOf("Mac") > -1,
 throttleDuration = /^((?!chrome|android).)*safari/i.test(a) ? 350 : 75

 if (c) {
 info("Installing serviceworker...")
 const reg = await c.register(location.origin + "/server.js"),
  sw = reg.active ?? (await new Promise(r => ((reg.waiting ?? reg.installing).onstatechange = ({ target: t }) => t.state == "activated" && r(t))))
 c.controller || (await new Promise(r => ((c.oncontrollerchange = r), sw.postMessage({ code: 0 }))))
 c.oncontrollerchange = c.onmessage = () => location.reload()
 document.querySelector('[rel="manifest"]').href = location.origin + "/manifest.json"
 addEventListener("focus", () => reg.update().catch(() => location.reload()))
 info("Installing serviceworker... Done.")
}

if (g) {
 info("Installing GPU...")
 _.GPU = await (await g.requestAdapter()).requestDevice()
 info("Installing GPU... Done.")
}

info("Creating global style sheet.")
this.globalStyleSheet = new CSSStyleSheet()
document.adoptedStyleSheets.push(this.globalStyleSheet)

info("Adding undo/redo keyboard shortcuts.")
let
 contextKeysDown = 0,
 shiftKeysDown = 0

onblur = e => {
 contextKeysDown = shiftKeysDown = 0
}

onkeyup = e => {
 if (isMac) {
  if (e.key === "Meta") contextKeysDown = Math.max(0, contextKeysDown - 1)
 } else if (e.key === "Control") contextKeysDown = Math.max(0, contextKeysDown - 1)
 if (e.key === "Shift") shiftKeysDown = Math.max(0, shiftKeysDown - 1)
 e.preventDefault()
}

onkeydown = e => {
 if (isMac) {
  if (e.key === "Meta") contextKeysDown++
 } else if (e.key === "Control") contextKeysDown++
 if (e.key === "Shift") shiftKeysDown++
 if (contextKeysDown === 1 && !shiftKeysDown && e.key === "z") history.back()
 if (contextKeysDown === 1 && !shiftKeysDown && e.key === "y") history.forward()
 if (contextKeysDown === 1 && shiftKeysDown && e.key === "z") history.forward()
 e.preventDefault()
}

info("Listening for externally-triggered navigation.")

let
 addressbarIndex,
 throttleStartTime,
 time = performance.now()

_.onhashchange = () => {
 let { pathname, search, hash, origin } = location
 if (pathname !== "/" || search || !hash || hash.length <= 1) history.replaceState({}, null, \`\${origin}/\${hash ||= "#0"}\`)
 this.documentIndex = decode(hash)

 addressbarIndex = this.documentIndex
 throttleStartTime = time
}

info("Creating the game loop.")
let
 animationFrameID,
 meanFrameTime = 1000,
 fps = 1

_.halt = () => {
 cancelAnimationFrame(animationFrameID)
}

_.loop = now => {
 fps = Math.round(1000 / (meanFrameTime += (now - time - meanFrameTime) / 20))
 time = now
 if (time - throttleStartTime >= throttleDuration && addressbarIndex !== this.documentIndex) {
  const hash = encode(this.documentIndex)
  history.pushState({}, null, hash)
  addressbarIndex = this.documentIndex
  throttleStartTime = time
 }
 if(this.index !== this.documentIndex) this.goto(this.documentIndex)
 animationFrameID = requestAnimationFrame(loop)
}

info("Retroactively handling initial navigation.")
onhashchange()
this.index = Infinity`,
   "https://app.core.parts/destroy.js": `throw new Error("a client application cannot be destroyed")`,
   "https://app.core.parts/notify.js": `await super.notify(...sources)
this.documentIndex = this.index`,
   // =============================================================================================================================================================================
   "https://menu.core.parts/base.uri": "https://app.core.parts",
   "https://menu.core.parts/inputs.txt": "application",
   "https://menu.core.parts/constructor.js": `
super(["https://sidebar.menu.core.parts", "https://colormode.core.parts", application])
this.apps = ["kireji.io", "core.parts", "orenjinari.com", "ejaugust.com", "fallback.cloud", "glowstick.click", "ejaugust.github.io"]`,
   "https://menu.core.parts/create.js": `
info("A menu-based application now exists but it lacks the core application functionality. Creating the base behavior.")
await super.create()

info("A menu-based application now exists but it is displaying a blank document. Rendering the persistent menu.")
const
 containerHost = document.body.appendChild(document.createElement("main")),
 toolbar = document.body.appendChild(document.createElement("nav")),
 menuButton = toolbar.appendChild(document.createElement("button")),
 homeButton = toolbar.appendChild(document.createElement("h1")),
 spacer = toolbar.appendChild(document.createElement("span")),
 shareButton = toolbar.appendChild(document.createElement("button"));
if (document.fullscreenEnabled) {
 const fullscreenButton = toolbar.appendChild(document.createElement("button"))
 fullscreenButton.onclick = () => {
  if (!document.fullscreenElement) {
   if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
   } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen()
   } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen()
   }
  } else {
   if (document.exitFullscreen) {
    document.exitFullscreen()
   } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
   } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
   }
  }
 }

 fullscreenButton.innerText = "⛶"
}
containerHost.tabIndex = 1
menuButton.innerText = "≡"
this.menuButton = menuButton
this.toolbar = toolbar
let nestedToolbar, shadow
this.getNestedToolbar = () => {
 if (!nestedToolbar) {
  nestedToolbar ??= document.createElement("nested-toolbar")
  spacer.before(nestedToolbar)
  nestedToolbar.setAttribute("id", "nested")
  shadow = nestedToolbar.attachShadow({ mode: "open" })
  shadow.styleSheet = new CSSStyleSheet()
  shadow.adoptedStyleSheets.push(shadow.styleSheet)
 }
 return shadow
}
spacer.setAttribute("class", "spacer")
toolbar.setAttribute("id", "toolbar")
homeButton.innerHTML = \`<img src=https://\${HOST_PREFIX}\${APP_HOST}/favicon.svg /><span class=label>\${APP_SHORT_NAME}</span>\`
homeButton.onclick = () => {
 this.goto(0n)
}

if (navigator.share) {
 shareButton.onclick = () =>
  navigator.share({ title: document.title, url: location.href }).catch(error => {
   if (error.name !== "AbortError") console.error("Error sharing:", error)
  })
 shareButton.innerText = "➦"
}

this.styleSheet = new CSSStyleSheet()
this.sidebar = document.body.appendChild(document.createElement("menu"))
this.sidebar.setAttribute("id", "sidebar")
const sidebarHeading = this.sidebar.appendChild(document.createElement("h2"))
sidebarHeading.innerHTML = \`<span id=logo>Kireji</span><span class=label>\${APP_SHORT_NAME}</span><span id=version>\${D["https://core.parts/version.txt"]}</span>\`
const appsModule = this.sidebar.appendChild(document.createElement("section")),
 appsTitle = appsModule.appendChild(document.createElement("h3")),
 appList = appsModule.appendChild(document.createElement("ul"))
appsTitle.innerText = "Apps"
appsModule.setAttribute("class", "module")
appsModule.setAttribute("id", "apps")
const pinsModule = this.sidebar.appendChild(document.createElement("section")),
pinsTitle = pinsModule.appendChild(document.createElement("h3")),
pinList = pinsModule.appendChild(document.createElement("ul"))
pinsTitle.innerText = "Recent"
pinsModule.setAttribute("class", "module")
pinsModule.setAttribute("id", "pins")
this.appNodes = {}
this.pinNodes = {}

function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return \`\${years}y ago\`;
  } else if (days > 0) {
    return \`\${days}d ago\`;
  } else if (hours > 0) {
    return \`\${hours}h ago\`;
  } else if (minutes > 0) {
    return \`\${minutes}m ago\`;
  } else {
    return \`\${seconds}s ago\`;
  }
}

const
 menuFactorOrigins = this.parts.slice(0, 2).map(part => part.origin),
 makePin = (hash, timestamp) => {
  const
   node = pinList.appendChild(document.createElement("li")),
   date = new Date(timestamp),
   isLong = hash.length >= 13

  node.innerHTML = \`<span class=hash>\${isLong ? hash.slice(0, 10) + "..." : hash}</span><span class=date>\${timeAgo(timestamp)}</span>\`
  this.pinNodes[hash] = node

  node.onclick = () => {
   let index = decode(hash)
   for (const origin of menuFactorOrigins) {
    const factor = this.factors[origin]
    index += factor.indexCache * factor.unit
   }
   this.goto(index)
  }
 }
 
for (let i = 0; i < localStorage.length; i++) {
 const hash = localStorage.key(i)
 makePin(hash, parseInt(localStorage.getItem(hash)))
}

this.pin = () => {
 const
  hash = encode(this.parts[2].index),
  now = Date.now(),
  isNew = localStorage.getItem(hash) === null

 localStorage.setItem(hash, now)
 if (isNew) makePin(hash, now)
}

const TMenu = T\`https://menu.core.parts\`
for (let i = 0; i < this.apps.length; i++) {
 const appname = this.apps[i],
  appParts = appname.split(".").slice(0, -1),
  shortName = appParts.join(" "),
  appNode = appList.appendChild(document.createElement("li"))
 appNode.innerHTML = \`<img src=https://\${HOST_PREFIX}\${appname}/favicon.svg /><span class=label>\${appname}</span>\`
 this.appNodes[appname] = appNode
 appNode.onclick = () => {
  if (APP_HOST !== appname) {
   const
    origin = "https://" + appname,
    isFallback = !(origin in this.controller.options),
    TOrigin = T([origin]),
    partPerSe = isFallback ? this.controller.parts[0] : this.controller.options[origin].part

   if (isFallback || TOrigin.prototype instanceof TMenu) {
    let index = 0n
    for (const origin of menuFactorOrigins) {
     const 
      { indexCache: localIndex } = this.factors[origin],
      { unit: remoteUnit } = partPerSe.factors[origin]
     index += localIndex * remoteUnit
    }
    if (appname === "ejaugust.github.io") location = "https://" + appname + encode(index)
    else location = "https://" + HOST_PREFIX + appname + encode(index)
   } else {
    if (appname === "ejaugust.github.io") location = "https://" + appname
    else location = "https://" + HOST_PREFIX + appname
   }
  }
 }
}
this.appNodes[APP_HOST]?.setAttribute("data-selected", "true")
this.sidebar.tabIndex = 1
this.container = containerHost.attachShadow({ mode: "closed" })
this.container.adoptedStyleSheets.push(this.styleSheet)
document.title = APP_SHORT_NAME`,
   // "https://menu.core.parts/...": `this.pin()`,
   "https://menu.core.parts/destroy.js": `await super.destroy()
document.body.innerHTML = ""`,
   // =============================================================================================================================================================================
   "https://sidebar.menu.core.parts/base.uri": "https://decision.core.parts",
   "https://sidebar.menu.core.parts/constructor.js": `super(["closed", "introduce", "open", "dismiss"])`,
   "https://sidebar.menu.core.parts/create.js": `this.button = this.controller.menuButton
this.sidebar = this.controller.sidebar`,
   // =============================================================================================================================================================================
   "https://closed.sidebar.menu.core.parts/create.js": `this.sidebar = this.controller.sidebar
this.button = this.controller.button
this.button.onclick = async () => {
 await this.controller.goto(1n)
}
this.sidebar.setAttribute("style", "--sidebar-tween: 0")`,
   "https://closed.sidebar.menu.core.parts/destroy.js": `await super.destroy()
if (document.activeElement === this.sidebar) this.sidebar.blur()
this.button.onclick = undefined
this.sidebar.removeAttribute("style")`,
   // =============================================================================================================================================================================
   "https://introduce.sidebar.menu.core.parts/base.uri": "https://decision.core.parts",
   "https://introduce.sidebar.menu.core.parts/constructor.js": `super(["half"])`,
   "https://introduce.sidebar.menu.core.parts/create.js": `this.sidebar = this.controller.sidebar
this.sidebar.setAttribute("style", "--sidebar-tween: 0.5")
requestAnimationFrame(() => {
 this.controller.goto(2n)
})`,
   "https://introduce.sidebar.menu.core.parts/destroy.js": `await super.destroy()
this.sidebar.removeAttribute("style")`,
   // =============================================================================================================================================================================
   "https://open.sidebar.menu.core.parts/create.js": `this.sidebar = this.controller.sidebar
this.sidebar.focus()
this.sidebar.onblur = () => {
 this.controller?.goto(3n)
}
this.sidebar.setAttribute("style", "--sidebar-tween: 1")`,
   "https://open.sidebar.menu.core.parts/destroy.js": `await super.destroy()
if (document.activeElement === this.sidebar) this.sidebar.blur()
this.sidebar.onblur = undefined
this.sidebar.removeAttribute("style")`,
   // =============================================================================================================================================================================
   "https://dismiss.sidebar.menu.core.parts/base.uri": "https://decision.core.parts",
   "https://dismiss.sidebar.menu.core.parts/constructor.js": `super(["half"])`,
   "https://dismiss.sidebar.menu.core.parts/create.js": `this.sidebar = this.controller.sidebar
this.sidebar.setAttribute("style", "--sidebar-tween: 0.5")
requestAnimationFrame(() => this.controller.goto(0n))`,
   "https://dismiss.sidebar.menu.core.parts/destroy.js": `await super.destroy()
this.sidebar.removeAttribute("style")`,
   // =============================================================================================================================================================================
   "https://fallback.cloud/base.uri": "https://menu.core.parts",
   "https://fallback.cloud/constructor.js": `super("error503")`,
   // =============================================================================================================================================================================
   "https://error503.fallback.cloud/create.js": `this.styleSheet = this.controller.styleSheet
const
 lightColor = D["https://core.parts/light.color"],
 darkColor = D["https://core.parts/dark.color"],
 isLight = this.controller.factors["https://colormode.core.parts"].part.option.origin !== "https://dark.colormode.core.parts",
 background = isLight ? lightColor : darkColor,
 color = isLight ? darkColor : lightColor

this.styleSheet.replaceSync(\`
:host {
 display: block;
 color: \${color};
 background: \${background};
 overflow: clip;
 box-sizing: border-box;
 padding: 15px;
 font: 18px system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

h1 {
 text-align: center;
 line-height: calc(100vh - 61px);
 height: 100%;
 position: absolute;
 width: 100%;
 left: 0;
 top: 0;
 margin: 0;
 padding: 0;
}

h1 {
 font-size: 35vw;
 color: \${color}0f;
}

.thin {
 font-weight: 200;
}

#float {
 font-size: 32px;
 height: 100%;
 align-items: center;
 justify-content: center;
 display: flex;
 gap: 0.5ch;
 line-height: 1em;
}

img {
 width: 64px;
 height: 64px;
}

#host {
 font-weight: 600;
}\`)
this.container = this.controller.container
this.container.innerHTML = \`<h1>503</h1>
<span id=float>
<img src=https://\${HOST_PREFIX}\${APP_HOST}/favicon.svg><span class=thin>\${APP_SHORT_NAME}</span><span>is coming soon.</span>
</span>\``,
   "https://error503.fallback.cloud/destroy.js": `await super.destroy()
   this.container.innerHTML = ""
   this.styleSheet.replaceSync("")`,
   // =============================================================================================================================================================================
   "https://colormode.core.parts/base.uri": "https://decision.core.parts",
   "https://colormode.core.parts/constructor.js": `super(["device", "light", "dark"])`,
   "https://colormode.core.parts/create.js": "this.styleSheet = this.controller.globalStyleSheet",
   "https://device.colormode.core.parts/base.uri": "https://option.colormode.core.parts",
   "https://light.colormode.core.parts/base.uri": "https://option.colormode.core.parts",
   "https://dark.colormode.core.parts/base.uri": "https://option.colormode.core.parts",
   // =============================================================================================================================================================================
   "https://option.colormode.core.parts/create.js": `const
 lightColor = D["https://core.parts/light.color"],
 darkColor = D["https://core.parts/dark.color"],
 isLight = this.origin === "https://light.colormode.core.parts",
 background = isLight ? lightColor : darkColor,
 color = isLight ? darkColor : lightColor,
 custom = D[\`\${this.controller.origin}/style.css\`] ?? ""
this.controller.styleSheet.replaceSync(\`html, body {
 --system-ui:
  system-ui,
  "Segoe UI",
  Roboto,
  Helvetica,
  Arial,
  sans-serif,
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol";

 --system-ui-mono:
  ui-monospace, 
  Menlo,
  Monaco, 
  "Cascadia Mono",
  "Segoe UI Mono", 
  "Roboto Mono", 
  "Oxygen Mono", 
  "Ubuntu Mono", 
  "Source Code Pro",
  "Fira Mono", 
  "Droid Sans Mono", 
  "Consolas",
  "Courier New",
  monospace;

  --sidebar-tween: 0;
  --sidebar-width: 256px;
  --bottom-accent: 0 1.5px \${color}2f;

 font: 13px var(--system-ui);
 height: 100vh;
 width: 300vw;
 position: fixed;
 left: -100vw;
 right: -100vw;
 margin: 0;
 overscroll-behavior: contain !important;
 color: \${color};
 background: \${background};
 -webkit-user-select: none;
 -ms-user-select: none;
 user-select: none;
 overflow: hidden;
}
body > main {
 position: absolute;
 top: 61px;
 left: 0;
 right: 0;
 padding: 0 100vw;
 height: calc(100vh - 61px);
}
#version {
 text-align: center;
 padding: 0 8px;
 font-family: var(--system-ui-mono);
 font-size: 10px;
 line-height: 18px;
 color: \${color};
 background-color: \${background};
 box-sizing: border-box;
 border-radius: 7px;
 font-weight: 900;
 margin: auto;
 box-shadow: 0 0 1px \${color};
}
#sidebar {
 margin: 0;
 padding: 0;
 position: fixed;
 left: calc((var(--sidebar-tween) - 1) * var(--sidebar-width));
 top: 0;
 height: 100vh;
 width: var(--sidebar-width);
 background: \${background};
 opacity: var(--sidebar-tween);
 box-shadow: 0px 0px 22px 8px #0001;
 display: flex;
 flex-flow: column;
 margin: 0;
 box-sizing: border-box;
 flex: 2;
 min-width: 64px;
 color: \${color};
 outline: none;
}

#sidebar > .tagline {
 font-weight: 300;
 opacity: 60%;
 max-height: 100%;
 margin: 0;
}
#sidebar > h2 {
 display: flex;
 margin: 0;
 gap: 0.5ch;
 padding: 21px 21px 27px 21px;
 box-sizing: border-box;
 font-weight: 400;
}
#sidebar > h2 > .label {
 flex: 1;
}
#sidebar > * {
 box-shadow: var(--bottom-accent);
}
#apps {
 min-height: 128px !important;
}
#pins {
 display: none;
}
#pins li {
 display: flex;
}
#pins h3 {
 background: \${background};
}
#pins .hash {
 flex: 1;
}
#pins .date {
 font-size: 10px;
}
#sidebar .module {
 padding: 1px 16px;
 overflow: hidden;
 overflow-y: auto;
 flex: 1 1 0;
 min-height: 64px;
}
#sidebar .module > h3 {
 margin: 0;
 padding: 8px 0;
 margin-bottom: 12px;
 position: sticky;
 top: 0;
}
#sidebar .module > ul {
 margin: 0;
 display: flex;
 flex-flow: column;
 gap: 1px;
 counter-reset: item;
 overflow: hidden;
 flex: 0 1 auto;
 box-sizing: border-box;
 line-height: 29px;
 padding: 0;
 min-height: 32px;
}
#sidebar .module > ul > li {
 list-style-type: none;
 display: flex;
 gap: 1.5ch;
 padding: 4px 13px;
 font-size: 13.5px;
 border-radius: 3px;
 flex: 0;
 font-weight: 500;
 margin: -1px;
 line-height: 25px;
}
#sidebar .module > ul > li > img {
 height: 25px;
 width: 25px;
}
#sidebar .module > ul > li > .label {
 overflow-y: visible;
 overflow-x: clip;
 text-overflow: ellipsis;
 min-width: 0;
 flex: 1 1;
}
#sidebar .module > ul > [data-selected="true"] {
 color: rgba(12,103,192,1);
}
#sidebar .module > ul > li:not([data-selected="true"]):hover {
 color: rgba(12,103,192,1);
 cursor: pointer;
}
#logo {
 font-weight: 700;
}
#toolbar {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 height: 61px;
 background: \${background};
 margin: 0;
 padding: 0 100vw;
 line-height: 61px;
 display: flex;
 color: \${color};
 box-sizing: border-box;
 box-shadow: \${isLight ? "0px 2px 7px #0002" : "var(--bottom-accent)"};
}
#toolbar > button {
 height: 29px;
 width: 29px;
 cursor: pointer;
 margin: 16px;
 border-radius: 5px;
 border: none;
 color: inherit;
 background: transparent;
 font-size: 29px;
 line-height: 29px;
 padding: 0;
 margin: 16px;
}
#toolbar > button:hover {
 background: #fff5;
}
#toolbar > h1 {
 cursor: pointer;
 margin: 16px 0;
 padding: 0;
 font-size: 21px;
 line-height: 29px;
 font-weight: 400;
 display: flex;
}
#toolbar > h1 > img {
 height: 39px;
 width: 39px;
 margin: -5px;
 margin-right: 1ch;
}
#toolbar > h1 > .label {
 flex: 1;
 line-height: 29px;
}
#toolbar > h1:hover {
 text-decoration: underline;
}
#toolbar > .spacer {
 flex: 1;
}
#nested {
 line-height: 29px;
 padding: 16px;
 display: flex;
 box-sizing: border-box
 height: 61px;
 gap: 6px;
}
@media (width < 400px) {
 #toolbar > h1 > img {
  display: none;
 }
}
@media (width < 500px) {
 #nested {
  position: fixed;
  top: 61px;
  left: 0;
  right: 0;
  width: 100vw;
  box-shadow: \${isLight ? "0px 2px 7px #0002" : "var(--bottom-accent)"};
 }
}
@media (display-mode: window-controls-overlay) {
 #toolbar {
  padding-left: env(titlebar-area-x, 0);
  top: env(titlebar-area-y, 0);
  padding-right: calc(100% - env(titlebar-area-width, 100%) - env(titlebar-area-x, 0));
  height: 61px;
  width: 100%;
  -webkit-app-region: drag;
  app-region: drag;
 }
 #toolbar > h1,
 #toolbar > button {
  -webkit-app-region: no-drag;
  app-region: no-drag;
 }
}
\${custom}\`)`,
  },
  _ = globalThis,
  HAS_DEV_PREFIX = location.host.startsWith("dev."),
  IS_GITHUB = location.host === "ejaugust.github.io",
  IS_DEV_HOST = HAS_DEV_PREFIX || IS_GITHUB,
  APP_HOST = location.host.slice(4 * HAS_DEV_PREFIX),
  HOST_PREFIX = IS_DEV_HOST ? "dev." : "",
  APP_SHORT_NAME = APP_HOST.slice(0, -1 - APP_HOST.split(".").at(-1).length),
  ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
  encode = index => {
   const hexads = [],
    binaryString = index.toString(2),
    newLength = Math.ceil(binaryString.length / 6),
    fullbin = binaryString.padStart(newLength * 6, 0)
   for (let i = 0; i < newLength; i++) hexads.push(fullbin.slice(i * 6, (i + 1) * 6))
   return "#" + hexads.reduce((hash, hexad) => hash + ALPHABET[parseInt(hexad, 2)], "")
  },
  decode = hash => {
   let binaryString = "0b"
   for (let i = 1; i < hash.length; i++) binaryString += ALPHABET.indexOf(hash[i]).toString(2).padStart(6, 0)
   return BigInt(binaryString)
  },
  info = (...args) => (L ? console.info(`[${E}]`, ...args) : null),
  L = D["https://core.parts/logging.txt"] === "true",
  V = D["https://core.parts/verbose.txt"] === "true",
  E = _.constructor === _.Window ? "client" : "server",
  𝕋 = {},
  T = (a, b, origin = b ? a.join(b["index.txt"] ?? "") : a[0]) =>
   (𝕋[origin] ??= eval(
    `(class ${origin.slice(8).replaceAll(".", "_").replaceAll("-", "___")}${
     origin === "https://base.core.parts" ? "" : ` extends T\`${b?.["base.uri"] ?? (D[`${origin}/base.uri`] || "https://base.core.parts")}\``
    } {\n get origin() { return "${origin}" }\n ${[
     ["constructor", (b?.[`inputs.txt`] ?? D[`${origin}/inputs.txt`] ?? "").replaceAll(/\s+/g, ", "), 1],
     ["notify", "...sources"],
     ["create"],
     ["checkout", "index"],
     ["destroy"],
     ["goto", "index"],
    ]
     .map(([ƒ, x = ""], i) =>
      b?.[`${ƒ}.js`] || `${origin}/${ƒ}.js` in D || (L && V)
       ? `${i === 0 ? "" : "async "}${ƒ}(${x}) {${
          L && (V || i !== 0)
           ? `\n  console.group(\`[${E}] ${i === 0 ? `` : ` | \${this.origin} | \${this.index}`} | ${origin} --> ${ƒ}(${[3, 5].includes(i) ? "${index}" : x})\`);\n  `
           : ""
         }${b?.[`${ƒ}.js`] ?? D[`${origin}/${ƒ}.js`] ?? `${i === 0 ? "" : "await "}super${i === 0 ? "" : "." + ƒ}(${x})`}${
          L && (V || i !== 0) ? `\n  ;console.groupEnd()` : ""
         }\n }`
       : "",
     )
     .join("\n ")}\n})`,
   ))

 new T`https://boot.core.parts`()
}
boot()
