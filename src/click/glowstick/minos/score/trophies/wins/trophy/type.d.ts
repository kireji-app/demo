declare interface IMinosGameWinsTrophy
 extends IPart<IMinosGameTrophyCategory, null> {

 // Serialized Properties.
 /** The number of wins that is needed to secure this trophy. */
 readonly goal: number
}

declare const minosWinsTrophy: IMinosGameWinsTrophy