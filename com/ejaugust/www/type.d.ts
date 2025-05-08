declare class PartEjaugust extends PartCore {
 /** Outputs unix timestamps as a human-readable date, for consistent date formats across the blog. */
 niceDate(UNIX_TIMESTAMP: number): string
 /** The post that is currently displayed on the blog. */
 readonly post: BlogPost
 /** The unix timestamp for the creation of the currently displayed post. */
 readonly date: number
}

/** The blog at https://www.ejaugust.com. */
declare const blog: PartEjaugust