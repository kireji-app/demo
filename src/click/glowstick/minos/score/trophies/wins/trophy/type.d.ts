declare interface IMinosGameWinsTrophy
 extends IPart<IMinosGameTrophyCategory, null> {

 // Components.
 /** The number of wins that is needed to secure this trophy. */
 readonly goal: number
}

declare const thisMinosWinsTrophy: IMinosGameWinsTrophy