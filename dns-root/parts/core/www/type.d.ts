declare interface ICoreApplication extends IApplication {
 readonly "..": ICore
 readonly explorer: ICoreApplicationExplorer
 readonly browser: ICoreApplicationBrowser
}
declare const core: ICoreApplication