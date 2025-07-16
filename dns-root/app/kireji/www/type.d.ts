declare interface IKirejiAppApplication extends IApplication {
 readonly "..": IKirejiApp
 readonly outliner: IKirejiAppApplicationOutliner
 readonly editor: IKirejiAppApplicationEditor
}
declare const kirejiApp: IKirejiAppApplication
