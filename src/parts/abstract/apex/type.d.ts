/** Represents any domain which is a direct subdomain of a top-level domain (e.g. `example.com`). */
declare interface IApexDomain extends IMix {
 /** The apex domain's application - used to set the wallpaper and override the css of the desktop when accessing the O/S via the apex domain's host. */
 readonly www: IApplication
 /** This optional method converts the given human-readable, SEO-friendly canonical pathname to a stateful hash, using the current system state as the base state. */
 translateCanonicalPathname?(PATHNAME: string, HASH?: string): string
}

/** Represents the `www` subdomain of any apex domain.
 * 
 * It represents a domain which has an `A` record that points to a server implementing the project's build artifact. */
declare interface IApplication extends IPart {
 /** The stylesheet for the application, which comes after other stylesheets. */
 readonly "inline.css"
 /** The html which becomes the desktop wallpaper for the application. */
 readonly "inline.html"
 /** The canonical link to use for indexing pages in search results for a given page. */
 readonly canonicalPathname?: string
 /** A short optional description of the current application state which may appear in search results in relation to the application's current `canonicalLink` property. */
 readonly descriptionMeta?: string
 /** An optional menu title for showing apps in the taskbar menu. If undefined, the application's part title will be used instead. */
 readonly titleMenu?: string
}