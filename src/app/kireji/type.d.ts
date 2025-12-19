declare interface IKirejiApp
 extends IAppApplication {

 // Subparts.
 readonly sidebar: IKirejiAppSidebar
 readonly editor: IKirejiAppEditor
}

declare const kirejiApp: IKirejiApp