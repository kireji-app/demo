declare interface IEJAugustNote extends IPart {
 /** Outputs unix timestamps as a human-readable date, for consistent date formats across the notebook. */
 niceDate(UNIX_TIMESTAMP: string | number): string
 /** A real number representing the estimated number of minutes that it might take the average person to read the note. */
 readonly readingLength: number
 /** The timestamp of when the note was first published, taken from the subdomain of the note. */
 readonly unixTimestamp: string
 /** The timestamp of the last time the note was edited. */
 readonly editTimestamp?: string
 /** An optional tagline appearing as a subheading below the note's title. */
 readonly subtitle?: string
 /** An optional pathname segment used to generate a canonical link to the note. */
 readonly pathname?: string
 /** An optional topic which can be used to catagorize the note. */
 readonly topic?: string
 /** The content of the note. */
 readonly "article.html": string
 /** The full date and reading time description line for the note. */
 readonly "credit.html": string
 /** The full display title and subtitle for the note. */
 readonly "heading.html": string
 /** The major portion of the note's HTML article, contributed by note instances rather than by the note base class. */
 readonly "inline.html": string
}

/** The currently active note for ejaugust. */
declare const note: IEJAugustNote