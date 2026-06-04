declare interface IMinosGameModal
 extends IMatch<IMinosGame, IMinosGameModalPage>,
 IWebView {

 // Subparts.
 readonly trophies: IMinosGameModalTrophies
 readonly none: IMinosGameModalPage
 readonly shop: IMinosGameModalShop

 // Components.
 /** Closes any open modal. */
 readonly close(): void
}

declare const MinosModal: IMinosGameModal
type MinosModal = T

declare interface IMinosGameModalPage
 extends IPart<IMinosGameModal, null>,
 IWebView {

}