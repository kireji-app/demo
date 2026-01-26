declare interface IMinosGameBomb
 extends IMatch<IMinosGame, IPart<IMinosGameBomb, null>>,
 IWebComponent {

 // Subparts.
 readonly none: IPart<IMinosGameBomb, null>
 readonly radial: IPart<IMinosGameBomb, null>
 readonly crosshair: IPart<IMinosGameBomb, null>
}

declare const minosBomb: IMinosGameBomb