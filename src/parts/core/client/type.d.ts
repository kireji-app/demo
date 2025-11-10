declare interface IClient
 extends IFacet<ICore> {

 // Runtime Properties.
 /** Whether or not the server-rendered page has been fully "taken over" by the client-side framework. */
 readonly hydrated: boolean
}

/** A facet which helps toggle the page style between a locked loading state (before hydration) and a fully-interactive state (after hydration). */
declare const client: IClient