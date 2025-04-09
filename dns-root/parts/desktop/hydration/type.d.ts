declare interface HydrationPart extends UserFeature {
 /** Whether or not the server-rendered page has been fully "taken over" by the client window. */
 readonly hydrated: boolean
 /** Creates a main-thread-blocking loop for the given length of time. */
 simulateSlowPerformance(DELAY_IN_MS: number): void
}
/** A feature part which helps toggle the page style between a locked loading state
 * (before hydration) and a fully-interactive state (after hydration). */
declare const hydration: HydrationPart