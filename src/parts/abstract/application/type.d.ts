/** An application part is a major component dedicated to displaying content (as the desktop wallpaper) and
 * overriding the css of the desktop environment whenever the part's host is accessed as a webpage in a browser.
 * 
 * It represents a domain which has an `A` record that points to a server implementing the project's build artifact.*/
declare interface IApplication<TOwner, TFactor>
 extends IMix<TOwner, TFactor>, IApplicationDetails {

 // Serialized Properties.
 /** An optional menu title for showing apps in the taskbar menu. If undefined, the application's part title will be used instead. */
 readonly "titleMenu"?: string
 /** One of the six theme colors for this part. This is the accent/hover color when dark mode is enabled. */
 readonly "darkAccentTheme": string
 /** One of the six theme colors for this part. This is the background color when dark mode is enabled. */
 readonly "darkBgTheme": string
 /** One of the six theme colors for this part. This is the foreground color when dark mode is enabled. */
 readonly "darkFgTheme": string
 /** One of the six theme colors for this part. This is the accent/hover color when the dark is disabled. */
 readonly "lightAccentTheme": string
 /** One of the six theme colors for this part. This is the background color when the dark is disabled. */
 readonly "lightBgTheme": string
 /** One of the six theme colors for this part. This is the foreground color when the dark is disabled. */
 readonly "lightFgTheme": string
 /** For SEO, an xml file detailing this application's available canonical links, which will be fetched by search engines. */
 readonly "sitemap.xml"
 /** A JSON-serialized map of hot-key combos that the application should listen to and the methods each combo should call. */
 readonly "hot-keys.json"
 /** This optional method converts the given human-readable, SEO-friendly canonical pathname to a stateful hash, using the current system state as the base state. */
 readonly translateCanonicalPathname?(PATHNAME: string, HASH?: string): string
}

declare interface IApplicationDetails {

 // Serialized Properties.
 /** A string that impacts the way the current page of the application appears in search results. */
 readonly "canonicalPathname": string
 /** A passthrough description that becomes the application's overall description in search results when the current page of the application is active. */
 readonly "descriptionMeta": string
 /** The absolute URL to the current page of the application, depending on its substate. */
 readonly "canonicalURL": string
 /** The partial pathname or segment corresponding to the current page of the application. */
 readonly "pathname": string
 /** An optional string of attributes which will be added to the `<wallpaper->` tag of the desktop environment. */
 readonly "attributes"?: string
 /** An optional string representing the style attribute of the `<wallpaper->` tag, which can be used for making quick (quicker than replacing inline.css) changes to css variables. */
 readonly "style"?: string
 /** The css overrides for the current page of the application. */
 readonly "inline.css": string
 /** The html article content of the current page of the application. */
 readonly "inline.html": string
 /** For SEO, the portion of the "sitemap.xml" file listing this application or application section's available canonical links. */
 readonly "urls.xml"
}

declare type IApplicationSubpart =
 IPart<IApplicationAny, IPartAny>

declare type IApplicationAny =
 IApplication<ITopLevelDomainAny, IApplicationSubpart>

declare const application: IApplicationAny