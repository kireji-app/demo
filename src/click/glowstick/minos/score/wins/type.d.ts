declare interface IMinosGameScoreWins
 extends IPart<IMinosGameScore, null>,
 IWebView {

 // Components.
 readonly increment(): void
}

declare const MinosWins: IMinosGameScoreWins
type MinosWins = T