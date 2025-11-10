declare interface IEJAugustNote
 extends IPart<IEJAugustNotes, IPartAny>,
 IApplicationDetails {

 // Serialized Properties.
 /** The content of the note. */
 readonly "note.html": string
 /** The full date and reading time description line for the note. */
 readonly "credit.html": string
 /** The full display title and subtitle for the note. */
 readonly "heading.html": string
 /** An optional topic which can be used to categorize the note. */
 readonly "topic"?: string
 /** An optional tagline appearing as a subheading below the note's title. */
 readonly "subtitle"?: string
 /** The timestamp of the last time the note was edited. */
 readonly "editTimestamp"?: string
 /** Outputs unix timestamps as a human-readable date, for consistent date formats across the notebook. */
 readonly niceDate(UNIX_TIMESTAMP: string | number): string

 // Runtime Properties.
 /** A real number representing the estimated number of minutes that it might take the average person to read the note. */
 readonly readingLength: number
 /** The timestamp of when the note was first published, taken from the subdomain of the note. */
 readonly unixTimestamp: string
}

/** The currently active note for ejaugust. */
declare const note: IEJAugustNote