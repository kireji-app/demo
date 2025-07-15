declare interface IKirejiAppApplication extends IApplication {
 readonly "..": IKirejiApp
 readonly explorer: IKirejiAppApplicationExplorer
 readonly browser: IKirejiAppApplicationBrowser
}
declare const kirejiApp: IKirejiAppApplication
