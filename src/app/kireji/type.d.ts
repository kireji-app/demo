declare interface IKirejiApp extends IAppApplication {
 readonly outliner: IKirejiAppOutliner
 readonly editor: IKirejiAppEditor
}
declare const kirejiApp: IKirejiApp
