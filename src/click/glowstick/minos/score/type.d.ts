declare interface IMinosGameScore
 extends IPart<IMinosGame, null>,
 IWebComponent {

 // Subparts.
 readonly points: IMinosGameScorePoints
 readonly wins: IMinosGameScoreWins
 readonly trophies: IMinosGameScoreTrophies
 readonly moves: IMinosGameMovesCount
 readonly usedBomb: IBoolean<IMinosGameScore>
}

declare const minosScore: IMinosGameScore