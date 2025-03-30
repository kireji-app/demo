declare interface DesktopPart extends CorePart {
 /** The computed framerate of the application. */
 readonly fps: number
 /** The current session time. */
 readonly time: DOMHighResTimeStamp
 /** The average length of time each frame is on screen in milliseconds. */
 readonly meanFrameTime: number
 /** The number of shift keys the user is holding down. */
 readonly shiftKeysDown: number
 /** The number of context keys (control on Windows, command on mac) the user is holding down. */
 readonly contextKeysDown: number
 /** The application's current route according to the addressBar. */
 readonly addressBarRouteID: bigint
 /** The session time when the addressBar was last updated.*/
 readonly throttleStartTime: number
 readonly user: UserPart
 /** The main game loop, which must be running to handle most user interaction.*/
 requestFrame(now: DOMHighResTimeStamp): void
 /** Uses Framework.pathSegmentRadix to parse the current location hash to set the current desktop route.*/
 parseRouteIDFromAddressBar(): void
 /** Uses Framework.pathSegmentRadix to turn a routeID back into the routing path string that it represents. */
 encodeRouteID(routeID: bigint): string
 /** The host element for desktop content. */
 containerHost: HTMLDivElement
 /** The shadow root of the desktop's content container. */
 container: ShadowRoot
 /** The main CSS stylesheet for the desktop. */
 styleSheet: CSSStyleSheet
 /** The main taskbar element. */
 taskbar: HTMLElement
 /** The home button element. */
 homeButton: HTMLButtonElement
 /** A spacer element in the taskbar. */
 taskbarSpacer: HTMLSpanElement
 /** Whether or not to show the fullscreen control. */
 showFullScreenControl: boolean
 /** Whether or not to show the share button. */
 showShareButton: boolean
 /** The share button element (if shown). */
 shareButton?: HTMLButtonElement
 /** The menu button element. */
 menuButton: HTMLButtonElement
 /** The fullscreen button element (if shown). */
 fullscreenButton?: HTMLButtonElement
 /** Gets the nested toolbar's shadow root. */
 getNestedToolbar(): ShadowRoot
 /** Destroys the nested toolbar. */
 destroyNestedToolbar(): void
 /** The main menu element. */
 menuElement: HTMLElement
 /** The sidebar element within the menu. */
 sidebar: HTMLDivElement
 /** The section in the start menu listing kiosks. */
 kiosksSection: HTMLUListElement
 /** The settings section in the sidebar. */
 settingsSection: HTMLElement
 /** A line containing the tags label and the tags themselves. */
 tagsLine: HTMLSpanElement
 /** The label for the version tags. */
 tagsLabel: HTMLSpanElement
 /** A container for the version tags. */
 tags: HTMLSpanElement
 /** An array of elements representing the version tags. */
 tagElements: HTMLSpanElement[]
 /** The color mode control element. */
 colorModeButton: HTMLSpanElement
 /** The first label for the color mode control. */
 colorModeLabel1: HTMLSpanElement
 /** The second label for the color mode control. */
 colorModeLabel2: HTMLSpanElement
 /** The base element of the color mode slider. */
 colorModeBase: HTMLSpanElement
 /** The handle element of the color mode slider. */
 colorModeHandle: HTMLSpanElement
 /** The CSS stylesheet for the color mode. */
 colorModeStyleSheet: CSSStyleSheet;
}
/** The root of the client window part hierarchy.
 * 
 * It handles the DOM and user interaction as well as baking inlined HTML and CSS on the server. */
declare const desktop: DesktopPart