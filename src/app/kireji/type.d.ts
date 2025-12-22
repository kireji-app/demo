declare interface IKirejiApp
 extends IAppApplication {

 // Subparts.
 readonly toolBar: IKirejiAppToolBar
 readonly sidebar: IKirejiAppSidebar
 readonly editor: IKirejiAppEditor
}

declare const kirejiApp: IKirejiApp