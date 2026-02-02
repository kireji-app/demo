declare interface IMinosGameModalTradeStage
 extends IMatch<IMinosGameModalTrade, IPart<IMinosGameModalTradeStage, null> & IWebComponent>,
 IWebComponent {

 // Subparts.
 readonly options: IMinosGameModelTradeOptions
 readonly confirm: IMinosGameModalTradePage
}

declare const minosTradeStage: IMinosGameModalTradeStage
declare const minosTradeConfirm: IMinosGameModalTradePage