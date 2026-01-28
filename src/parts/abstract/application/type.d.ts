/** An application part is a major component dedicated to controlling and displaying application content.
 * 
 * When an application is the desktop host application (the URL origin), its container is the desktop wallpaper and its theme colors override the colors of the desktop environment.
 * 
 * All applications in an ecosystem should have an `A` record that points to the same server implementing the project's build artifact.*/
declare interface IApplication<TOwner, TFactor>
 extends IMix<TOwner, TFactor>,
 IApplicationDetails {

 // Serialized Properties.
 /** An optional array of classes which the application wants to have applied to the body. */
 readonly "classes": string[]
 /** An object corresponding to any custom headers that the application would like to include in the final response for its index pages. */
 readonly "customHeaders": Record<string, string>
 /** A JSON-serialized map of hot-key combos that the application should listen to and the methods each combo should call. */
 readonly "hot-keys.json"
 /** The application's accent/hover color when dark mode is enabled. */
 readonly "darkAccentTheme": string
 /** The application's background color when dark mode is enabled. */
 readonly "darkBgTheme": string
 /** The application's foreground color when dark mode is enabled. */
 readonly "darkFgTheme": string
 /** The application's accent/hover color when the dark is disabled. */
 readonly "lightAccentTheme": string
 /** The application's background color when the dark is disabled. */
 readonly "lightBgTheme": string
 /** The application's foreground color when the dark is disabled. */
 readonly "lightFgTheme": string
 /** An optional menu title for showing apps in the taskbar menu. If undefined, the application's part title will be used instead. */
 readonly "titleMenu"?: string
 /** For SEO, an xml file detailing the application's available canonical links, which will be fetched by search engines. */
 readonly "sitemap.xml"
 /** Optional method that, when defined, converts the given human-readable, SEO-friendly canonical pathname to a stateful hash, using the current ecosystem state as the base state. */
 readonly translateCanonicalPathname?(PATHNAME: string, HASH?: string): string

 // Runtime Properties.
 /** The host element that contains the entire app. */
 readonly container: HTMLElement
}

declare interface IApplicationDetails
 extends IWebComponent {

 // Serialized Properties.
 /** A string that impacts the way the current page of the application appears in search results. */
 readonly "canonicalPathname": string
 /** A passthrough description that becomes the application's overall description in search results when the current page of the application is active. */
 readonly "descriptionMeta": string
 /** The absolute URL to the current page of the application, depending on its substate. */
 readonly "canonicalURL": string
 /** The partial pathname or segment corresponding to the current page of the application. */
 readonly "pathname": string
 /** An optional string of attributes which will be added to the application host element. */
 readonly "attributes"?: string
 /** An optional string representing the style attribute of the application host element, which can be used for making quick (quicker than replacing part.css) changes to css variables. */
 readonly "style"?: string
 /** For SEO, the portion of the "sitemap.xml" file listing the application or application section's available canonical links. */
 readonly "urls.xml"
}

declare type IApplicationSubpart =
 IPart<IApplicationAny, IPartAny>

declare type IApplicationAny =
 IApplication<ITopLevelDomainAny, IApplicationSubpart>

declare const application: IApplicationAny