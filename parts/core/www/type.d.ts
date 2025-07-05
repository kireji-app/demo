declare interface ICoreTheme extends ITheme {
 readonly "..": ICore
 /** The most recent host at which the fetch function was requested.
  * 
  * This exists only on this theme because this theme is the fallback theme for all domain names which do not have a theme.*/
 readonly requestedHost: string
 readonly explorer: IExplorer
 readonly browser: IBrowser
}
declare const core: ICoreTheme