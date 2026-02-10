declare interface IMinosGameModal
 extends IMatch<IMinosGame, IMinosGameModalPage>,
 IWebComponent {

 // Subparts.
 readonly trophies: IMinosGameModalTrophies
 readonly none: IMinosGameModalPage
 readonly shop: IMinosGameModalShop

 // Serialized Properties.
 /** Closes any open modal. */
 readonly close(): void
}

declare const minosModal: IMinosGameModal

declare interface IMinosGameModalPage
 extends IPart<IMinosGameModal, null>,
 IWebComponent {

}