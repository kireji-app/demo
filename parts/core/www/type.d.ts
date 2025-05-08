declare class PartCoreTheme extends PartCore {
 /** The most recent host at which the fetch function was requested.
  * 
  * This exists only on this theme because this theme is the fallback theme for all domain names which do not have a theme.*/
 readonly requestedHost: string
}
declare const coreTheme: PartCoreTheme