declare interface IMinosGamePointsTrophy
 extends IBoolean<IMinosGameTrophyCategory>,
 IMinosGameTrophy {

 // Serialized Properties.
 /** The amount of points that must be earned to secure this trophy. */
 readonly goal: number
}

declare const minosPointsTrophy: IMinosGamePointsTrophy