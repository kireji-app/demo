declare interface IMinosGameModal
 extends IMatch<IMinosGame, IMinosGameModalPage>,
 IWebComponent {

 // Subparts.
 readonly trophies: IMinosGameModalTrophies
 readonly none: IMinosGameModalPage
 readonly trade: IMinosGameModalTrade
}

declare const minosModal: IMinosGameModal

declare interface IMinosGameModalPage
 extends IPart<IMinosGameModal, null>,
 IWebComponent {

}