declare interface IMinosGameScorePoints
 extends IPart<IMinosGameScore, null>,
 IWebComponent {

 // Serialized Properties.
 readonly reset(): void
 readonly earn(EARNINGS: number): void
 readonly spend(COST: number): void
}

declare const minosPoints: IMinosGameScorePoints