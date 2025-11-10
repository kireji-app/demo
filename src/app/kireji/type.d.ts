declare interface IKirejiApp extends IAppApplication {
 readonly outliner: IKirejiAppOutliner
 readonly propertyViewer: IKirejiAppPropertyViewer
}
declare const kirejiApp: IKirejiApp
