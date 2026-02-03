declare interface IMinosGameCashTrophy
 extends IBoolean<IMinosGameTrophyCategory>,
 IMinosGameTrophy {

 // Serialized Properties.
 /** The amount of cash that must be earned to secure this trophy. */
 readonly goal: number
}

declare const minosCashTrophy: IMinosGameCashTrophy