declare interface IMinosGameScore
 extends IPart<IMinosGame, null>,
 IWebComponent {

 // Subparts.
 readonly cash: IMinosGameScoreCash
 readonly wins: IMinosGameScoreWins
}

declare const minosScore: IMinosGameScore