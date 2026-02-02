declare interface IMinosGameScoreWins
 extends IPart<IMinosGameScore, null>,
 IWebComponent {

 // Serialized Properties.
 readonly increment(): void
}

declare const minosWins: IMinosGameScoreWins