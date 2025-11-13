declare interface IComingSoonApplication<TOwner> extends IErrorApplication<TOwner> {

 // Serialized Properties.
 /** An optional unix timestamp representing the date when the application is expected to be available. Search engine crawlers may return on this day to retry indexing the page. */
 readonly "launchTimestamp"?: string | number
}

declare type IComingSoonApplicationAny =
 IComingSoonApplication<ITopLevelDomain<IComingSoonApplicationAny>>

declare const comingSoon: IComingSoonApplicationAny