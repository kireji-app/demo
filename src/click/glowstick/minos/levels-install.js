/**
 * Levels are defined as experiences where one or more of the following might be true:
 * 1. The level begins with a specific board layout
 * 2. The level begins with three specific pieces
 * 3. The level has a preset queue of next pieces
 * 4. There are specific check-state rules
 * 6. There are specific colors and/or graphics
 * 7. There are specific trophy that can only be earned on that level
 * 
 * Levels are mathematically an unordered subset (bitmask) over the possible set plus an "active" state which has the same cardinality as the unlocked levels.
 * For each level to have trophies means that you can't have unlocked trophies for levels that you haven't unlocked.
 * This means that the current level status is actually ∑ (k * 2^k * 2^t) over 0 < k ≤ n_levels given constant t custom trophies per level.
 * This allows an unordered, player-driven unlocking paradigm.
 * The alternative is to have trophy-based unlocking which is very likely more complex to implement.
 * Yet, for the unordered unlock paradigm, players must still achieve a certain number of trophies to be able to unlock levels.
 * The quick solution to this is to track "spent" trophies. Yet, this would need to ensure that more trophies cannot be spent than are had, which is again complex to implement.
 * The super simple solution is to make levels cost points instead of trophies.
 * Any entanglment between trophies (some of which are not booleans but simply implicit upon other score aspects) and level unlocks (wherein each level's trophies cannot be earned until the level is unlocked and then can be unlocked in any order) makes it challenging to consider the cardinality of the state system.
 * 
 * Level 0 is automatically unlocked. It has three trophies. That's 2^3 states.
 * Level 1 has three trophies. It has 2^3 states for trophies which are independent of Level 0's.
 * Level 1 cannot be unlocked until the user has acquired n or more trophies.
 * Some of the trophies unlockable in level 0 are 1-bit flags. Others are 0-bit/implicit.
 * A very simple solution is to place the levels in a canonical order and demand that the user achieve all 3 trophies from each level in order to unlock the next one.
 * A bonus level (like one with a pencil?) can be unlocked by simply removing the meta-meta trophy and making the entire trophies set a match: the current mix of all trophies and the meta-meta trophy.
 * Although, this has the unfortunate aspect of duplicate representation since the meta-meta trophy is implicit upon a full match for the entire trophies set.
 * This is elegantly resolved by letting the switch between fully-set trophies and the meta-meta mask indicate whether or not the user has spent points to unlock the meta-meta level.
 * The meta-meta level should have art tools like a pencil and a bomb. To implement speedrun plays, we can require the level's trophies to be completed already.
 * We make each level a match between two arms: the bitmask of the trophy and the timestamp.
 * Some pieces are special and can only appear in the random queue if the corresponding level is in its speedrun arm.
 * In order to prevent impossible states (like having the pencil in the piece array when the meta-meta level is not unlocked), the pieces would somehow have to be an element of the level unlock mechanism.
 * 
 * Let each level be purchased by points in any order.
 * Let there be a match over every k where k is the number of levels currently unlocked (our of a possible j).
 * Let each arm be a mix of two factors:
 * 1. The currently set level
 * 2. The j choose k combinations index.
 * Let each level be a match between two arms:
 * 1. The trophy grind state.
 * 2. The speedrun state.
 * Let each speedrun state unlock the same number of custom pieces (one?).
 * 
 * Let the pieces superset be a component of each arm.
 */
minos.define({
 levels: {
  value: {
   noise: {
    // Everything is left random.
   },
   skull: {
    board: 54538784753132372812239451939922428n,
    pieces: [19, 19, 19],
    queue: [19, 0, 19, 0, 19, 0, 19, 0, 19, 0, 19, 0]
   },
   minos: {
    board: 2050170099309742521972756347412707008512n
   }
  },
 }
})