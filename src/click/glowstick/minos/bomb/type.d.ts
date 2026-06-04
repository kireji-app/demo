declare interface IMinosGameBomb
 extends IMatch<IMinosGame, IPart<IMinosGameBomb, null>>,
 IWebView {

 // Subparts.
 readonly none: IPart<IMinosGameBomb, null>
 readonly radial: IPart<IMinosGameBomb, null>
 readonly crosshair: IPart<IMinosGameBomb, null>
}

declare const MinosBombLayer: IMinosGameBomb
type MinosBombLayer = T