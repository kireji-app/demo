declare interface IMinosGameScoreLevel
 extends IPart<IMinosGameScore, null>,
 IWebView {

 // Components.
 readonly increment(): void
}

declare const MinosLevel: IMinosGameScoreLevel
type MinosLevel = T