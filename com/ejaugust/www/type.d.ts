declare class PartEjaugustTheme extends PartTheme {
 /** Outputs unix timestamps as a human-readable date, for consistent date formats across the blog. */
 niceDate(UNIX_TIMESTAMP: number): string
 /** The match that selects the currently displayed blog post. */
 readonly date: PartMatch
}

/** The blog at https://www.ejaugust.com. */
declare const blog: PartEjaugust & PartMix