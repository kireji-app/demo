declare interface IKirejiAppSidebarView
 extends IMatch<IKirejiAppSidebar, IKirejiAppSidebarViewItem>,
 IWebComponent {

 // Subparts.
 readonly hidden: IKirejiAppSidebarViewItem
 readonly outlinerDomains: IKirejiAppSidebarViewItem
 readonly outlinerTypes: IKirejiAppSidebarViewItem
}

declare interface IKirejiAppSidebarViewItem
 extends IPart<IKirejiAppSidebarView, null>,
 IWebComponent { }

declare const sidebarView: IKirejiAppSidebarView