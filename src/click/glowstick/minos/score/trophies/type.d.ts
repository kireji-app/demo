declare interface IMinosGameScoreTrophies
 extends IMix<IMinosGameScore, IMinosGameTrophyCategory>,
 IWebComponent {

 // Subparts.
 readonly basic: IMinosGameTrophyCategory
 readonly cash: IMinosGameTrophyCategory
 readonly createA: IMinosGameTrophyCategory
 readonly meta: IMinosGameTrophyCategory
 readonly moveLimit: IMinosGameTrophyCategory
 readonly special: IMinosGameTrophyCategory
 readonly trades: IMinosGameTrophyCategory
 readonly wins: IMinosGameTrophyCategory

 // Serialized Properties.
 /** Scans the trophies to determine which ones have been completed. This does not evaluate the trophy win conditions for all cases. */
 readonly recompute(): void
 /** *Client-only*
  * 
  * Scans the trophies and win conditions to determine if any new trophies should be awarded. */
 readonly checkState(): void

 // Runtime Properties.
 /** The set of earned trophies. */
 readonly earned: Set<IMinosGameTrophy>
 /** The complete set of trophies available in the game. */
 readonly possible: Set<IMinosGameTrophy>
 /** The set of earned trophies, the last time the trophy view was updated. */
 readonly viewedEarned: Set<IMinosGameTrophy>
 /** Indicates whether or not the system is looping in the `recompute()` method, preventing duplicate checks to trophy conditions by meta trophies. */
 readonly recomputing: boolean
}

declare const minosTrophies: IMinosGameScoreTrophies

declare interface IMinosGameTrophyCategory
 extends IPart<IMinosGameScoreTrophy, IMinosGameTrophy> {

}

declare interface IMinosGameTrophy
 extends IPart<IMinosGameTrophyCategory, null> {

 // Serialized Properties.
 /** Returns true if the trophy has been earned. */
 readonly isEarned: boolean
}