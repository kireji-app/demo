declare interface IMinosGameScorePoints
 extends IPart<IMinosGameScore, null>,
 IWebView {

 // Components.
 readonly reset(): void
 readonly earn(EARNINGS: number): void
 readonly spend(COST: number): void
}

declare const MinosPoints: IMinosGameScorePoints
type MinosPoints = T