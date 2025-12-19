declare interface IKirejiAppSidebar
 extends IMix<IKirejiApp, IKirejiAppSidebarPart>,
 IWebComponent {

 // Subparts.
 readonly open: IPart<IKirejiAppSidebar, null>
 readonly outlinerDomains: IPartOutliner<IKirejiAppSidebar>
 readonly outlinerTypes: IPartOutliner<IKirejiAppSidebar>
 readonly width: IKirejiAppSidebarWidth
 readonly view: IKirejiAppSidebarView

 // Serialized Properties.
 readonly "static.css": string
}

declare type IKirejiAppSidebarPart =
 IPart<IKirejiAppSidebar, IPart<IKirejiAppSidebarPart, IPartAny>>

declare const sidebar: IKirejiAppSidebar
declare const width: IKirejiAppSidebarWidth
declare const SUBJECT: IPartAny