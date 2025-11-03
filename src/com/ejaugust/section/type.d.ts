declare interface IEJAugustApplicationSection extends IPart {
 /** The css overrides for ejaugust's arm. */
 readonly "inline.css": string
 /** The html article content of ejaugust's current arm. */
 readonly "inline.html": string
 /** A string that impacts the way pages in the given section appear as canonical links. */
 readonly canonicalPathname: string
 /** A passthrough description that becomes the application's overall description in search results when the given section is active. */
 readonly descriptionMeta: string
}

declare const section: IEJAugustApplicationSection