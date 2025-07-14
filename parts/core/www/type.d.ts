declare interface ICoreApplication extends IApplication {
 readonly "..": ICore
 readonly explorer: IExplorer
 readonly browser: IBrowser
}
declare const core: ICoreApplication