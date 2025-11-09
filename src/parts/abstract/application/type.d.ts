/** An application part is a major component dedicated to displaying content (as the desktop wallpaper) and overriding the css of the desktop environment whenever the part's host is accessed as a webpage in a browser.
 * 
 * It represents a domain which has an `A` record that points to a server implementing the project's build artifact.*/
declare interface IApplication extends IMix {
 readonly "..": ITopLevelDomain
 /** The stylesheet for the application, which comes after other stylesheets. */
 readonly "inline.css"
 /** The html which becomes the desktop wallpaper for the application. */
 readonly "inline.html"
 /** For SEO, an xml file detailing this application's available canonical links, which will be fetched by search engines. */
 readonly "sitemap.xml"
 /** For SEO, the portion of the "sitemap.xml" file listing this application's available canonical links. */
 readonly "urls.xml"
 /** The apex domain that hosts this application. */
 readonly "..": IApexDomain
 /** This optional method converts the given human-readable, SEO-friendly canonical pathname to a stateful hash, using the current system state as the base state. */
 translateCanonicalPathname?(PATHNAME: string, HASH?: string): string
 /** Returns whether or not the current application is the one that is being used to access the platform. */
 isOpen(): boolean
 /** The canonical link to use for indexing pages in search results for a given page. */
 readonly canonicalPathname?: string
 /** A short optional description of the current application state which may appear in search results in relation to the application's current `canonicalLink` property. */
 readonly descriptionMeta?: string
 /** An optional menu title for showing apps in the taskbar menu. If undefined, the application's part title will be used instead. */
 readonly titleMenu?: string
 /** An optional string of attributes which will be added to the `<wallpaper->` tag of the desktop environment. */
 readonly attributes?: string
 /** An optional string representing the style attribute of the `<wallpaper->` tag, which can be used for making quick (quicker than replacing inline.css) changes to css variables. */
 readonly style?: string
}

declare const application: IApplication