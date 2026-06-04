declare interface IMinosGameModalShop
 extends IMix<IMinosGameModal, IPart<IMinosGameModalShop, null>> {

 // Subparts.
 readonly target: IPart<IMinosGameModalShop, null>
 readonly scroller: IScroller<IMinosGameModalShop>

 // Components.
 /** Opens the shop options for the given mino. */
 readonly open(MINO): void
 /** The pointer event handler that reacts to picking an option from the shop modal. */
 readonly select(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, REPLACEMENT_INDEX: number): void
 /** The inner HTML content showing the shop options and their prices. */
 readonly "options.html": string
}

declare const MinosShopModal: IMinosGameModalShop
type MinosShopModal = T