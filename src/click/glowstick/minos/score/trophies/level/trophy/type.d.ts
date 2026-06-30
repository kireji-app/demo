declare interface IMinosGameLevelTrophy
 extends IPart<IMinosGameTrophyCategory, null> {

 // Components.
 /** The level that must be reached to secure this trophy. */
 readonly goal: number
}

declare const thisMinosLevelTrophy: IMinosGameLevelTrophy