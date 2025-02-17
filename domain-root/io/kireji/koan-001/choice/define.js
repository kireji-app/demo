const m = [
 ["hand", "clapping", "hands", "clap", ["a", "sound"]],
 ["foot", "standing", "feet", "stand", ["a", "stance"], ["a", "posture"]],
 ["eye", "seeing", "eyes", "see", ["a", "perspective"], ["a", "parallax"]],
 ["voice", "speaking", "voices", "speak", ["a", "chorus"], ["a", "conversation"], ["an", "exchange"], ["a", "meeting"], ["an", "argument"], ["a", "debate"], ["an", "agreement"], ["an", "accompanyment"], ["harmony"]],
 ["seed", "growing", "seeds", "grow", ["a", "field"], ["a", "forest"], ["a", "garden"], ["a", "harvest"], ["a", "yield"], ["a", "crop"]],
 ["drop", "falling", "drops", "fall", ["white", "noise"], ["a", "rainstorm"], ["a", "torrent"], ["a", "downpour"], ["a", "shower"], ["a", "cascade"]],
 ["note", "sounding", "notes", "sound", ["a", "melody"], ["harmony"], ["a", "chord"], ["a", "composition"]],
 ["dude", "clapping", "the audience", "claps", ["a", "standing", "ovation"], ["an", "applause"]],
 ["leaf", "shadow", "leaves", "cast shadows", ["shade"]],
 ["word", "spoken", "words", "speak", ["a", "story"], ["a", "poem"], ["a", "novel"], ["a", "conversation"], ["a", "dialogue"], ["a", "narrative"], ["a", "discourse"]],
 ["star", "shining", "stars", "shine", ["a", "constellation"], ["a", "galaxy"], ["a", "universe"], ["a", "cosmos"]]
]

super(m.map((row, i) => new getPartConstructor`topic${{
 "index.txt": "" + i,
 ".unit": "disjunction.core.parts",
 "define.js": `super(new Array(${row.length - 4}).fill(0).map((_, i) => "observation" + i))`,
}}.choice.koan-001.kireji.io`()))

this.model = m