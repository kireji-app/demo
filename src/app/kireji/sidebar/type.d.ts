declare interface IKirejiAppSidebar
 extends IMix<IKirejiApp, IKirejiAppSidebarPart>,
 IWebComponent {

 // Subparts.
 readonly open: IKirejiAppSidebarOpen
 readonly outlinerDomains: IPartOutliner<IKirejiAppSidebar>
 readonly outlinerTypes: IPartOutliner<IKirejiAppSidebar>
 readonly width: IKirejiAppSidebarWidth

 // Serialized Properties.
 readonly "static.css": string
 readonly "header.html": string
 readonly "view.html": string
 /** The part outliner currently assigned to the sidebar (resolves to a view even when the sidebar is hidden). */
 readonly "view": IPartOutliner<IKirejiAppSidebar>

 // Runtime Properties.
 readonly headerElement: HTMLHeadingElement
 readonly viewElement: HTMLElement
}

declare type IKirejiAppSidebarPart =
 IPart<IKirejiAppSidebar, IPart<IKirejiAppSidebarPart, IPartAny>>

declare const sidebar: IKirejiAppSidebar
declare const width: IKirejiAppSidebarWidth
declare const SUBJECT: IPartAny