declare interface IKirejiAppToolBar
 extends IMatch<IKirejiApp, IKirejiAppToolBarItem>,
 IWebComponent {

 // Subparts.
 readonly hidden: IKirejiAppToolBarItem
 readonly outlinerDomains: IKirejiAppToolBarItem
 readonly outlinerTypes: IKirejiAppToolBarItem
}

declare interface IKirejiAppToolBarItem
 extends IPart<IKirejiAppToolBar, null>,
 IWebComponent { }

declare const toolBar: IKirejiAppToolBar