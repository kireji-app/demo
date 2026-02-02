declare interface IMinosGameScoreCash
 extends IPart<IMinosGameScore, null>,
 IWebComponent {

 // Serialized Properties.
 readonly reset(): void
 readonly earn(EARNINGS: number): void
}

declare const minosCash: IMinosGameScoreCash