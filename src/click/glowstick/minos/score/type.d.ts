declare interface IMinosGameScore
 extends IPart<IMinosGame, null>,
 IWebComponent {

 // Subparts.
 readonly wins: IMinosGameScoreWins
}

declare const minosScore: IMinosGameScore