declare interface IEJAugustSection<T> extends IMatchOf<T> {
 /** The css overrides for the section. */
 readonly "inline.css": string
 /** The html article content of the section. */
 readonly "inline.html": string
 /** A string that impacts the way pages in the section appear as canonical links. */
 readonly canonicalPathname: string
 /** A passthrough description that becomes the application's overall description in search results when the section is active. */
 readonly descriptionMeta: string
}