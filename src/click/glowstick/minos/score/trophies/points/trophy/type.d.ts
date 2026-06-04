declare interface IMinosGamePointsTrophy
 extends IBoolean<IMinosGameTrophyCategory>,
 IMinosGameTrophy {

 // Components.
 /** The amount of points that must be earned to secure this trophy. */
 readonly goal: number
}

declare const thisMinosPointsTrophy: IMinosGamePointsTrophy