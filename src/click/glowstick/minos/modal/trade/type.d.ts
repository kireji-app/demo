declare interface IMinosGameModalTrade
 extends IMix<IMinosGameModal, IMinosGameModalTradePage> {

 // Subparts.
 readonly target: IMinosGameModalTradePage
 readonly stage: IMinosGameModalTradeStage
 readonly scroller: IScroller<IMinosGameModalTrade>

 // Serialized Properties.
 /** Opens the trade options for the given piece. */
 readonly open(MINOS_PIECE): void
}

declare const minosTradeModal: IMinosGameModalTrade

declare interface IMinosGameModalTradePage
 extends IPart<IMinosGameModalTrade, IPartAny>,
 IWebComponent {

}