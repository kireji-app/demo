declare interface IKirejiAppSidebarOpen
 extends IPart<IApplicationSubpart, null> {

 // Runtime Properties.
 /** If the sidebar is set to open, returns the string "sidebar-open". Otherwise, returns the empty string. */
 readonly class: string
}