declare class PartEjaugustTheme extends Part {
 /** Outputs unix timestamps as a human-readable date, for consistent date formats across the blog. */
 niceDate(UNIX_TIMESTAMP: number): string
}

/** The blog at https://www.ejaugust.com. */
declare const blog: PartEjaugustTheme