/** Represents any domain which is a direct subdomain of a top-level domain (e.g. `example.com`). */
declare interface IApexDomain extends IMix {
 /** The apex domain's application - used to set the wallpaper and override the css of the desktop when accessing the O/S via the apex domain's host. */
 readonly www: IApplication
}

/** Represents the `www` subdomain of any apex domain.
 * 
 * It represents a domain which has an `A` record that points to a server implementing the project's build artifact. */
declare interface IApplication extends IPart {
 /** The stylesheet for the application, which comes after other stylesheets. */
 readonly "inline.css"
 /** The html which becomes the desktop wallpaper for the application. */
 readonly "inline.html"
}