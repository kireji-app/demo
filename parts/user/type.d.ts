/** The part type for the user configuration space. */
declare class UserPart extends MixPart {
 /** The single-cardinality mix of environment-specific features.
  * 
  * Feature content is not encoded in the user route but inferred from the available context. */
 readonly features: FeaturesPart
 /** The operating system theme.
  * 
  * Theme content is encoded by the host of the user route. */
 readonly theme: ThemePart
 /** The core operating system interface part itself. Separate from other running tasks because this task is required.
  * 
  * Desktop content is encoded by the first segment of the user route pathname. */
 readonly desktop: DesktopPart
 /** The string of optional processes which are currently running on the operating system.
  * 
  * Task content is encoded by all segments appearing after the first segment in the user route pathname. */
 readonly tasks: TasksPart
 /** The prototype of the user space, whose host is `mix.core.parts`. */
 readonly super: MixPart
 /** The computed framerate of the application. */
 readonly fps: number
 /** The current session time. */
 readonly time: DOMHighResTimeStamp
 /** The average length of time each frame is on screen in milliseconds. */
 readonly meanFrameTime: number
 /** The root element for the user's live wallpaper. */
 readonly wallpaper: ShadowRoot
 /** The main CSS stylesheet for the user space. */
 readonly styleSheet: CSSStyleSheet
 /** The main taskbar element. */
 readonly taskbar: HTMLElement
 /** The home button element. */
 readonly homeButton: HTMLButtonElement
 /** A spacer element in the taskbar. */
 readonly taskbarSpacer: HTMLSpanElement
 /** Whether or not to show the fullscreen control. */
 readonly showFullScreenControl: boolean
 /** Whether or not to show the share button. */
 readonly showShareButton: boolean
 /** The share button element (if shown). */
 readonly shareButton?: HTMLButtonElement
 /** The menu button element. */
 readonly menuButton: HTMLButtonElement
 /** The fullscreen button element (if shown). */
 readonly fullscreenButton?: HTMLButtonElement
 /** The main menu part. */
 readonly menu: MenuPart
 /** The sidebar element within the menu. */
 readonly sidebar: HTMLDivElement
 /** The section in the start menu listing themes to choose from. */
 readonly themesSection: HTMLUListElement
 /** The settings section in the sidebar. */
 readonly settingsSection: HTMLElement
 /** A line containing the tags label and the tags themselves. */
 readonly tagsLine: HTMLSpanElement
 /** The label for the version tags. */
 readonly tagsLabel: HTMLSpanElement
 /** A container for the version tags. */
 readonly tags: HTMLSpanElement
 /** An array of elements representing the version tags. */
 readonly tagElements: HTMLSpanElement[]
 /** The color mode control element. */
 readonly colorModeButton: HTMLSpanElement
 /** The element holding the task menu. */
 readonly menuElement: HTMLElement
 /** The first label for the color mode control. */
 readonly colorModeLabel1: HTMLSpanElement
 /** The second label for the color mode control. */
 readonly colorModeLabel2: HTMLSpanElement
 /** The base element of the color mode slider. */
 readonly colorModeBase: HTMLSpanElement
 /** The handle element of the color mode slider. */
 readonly colorModeHandle: HTMLSpanElement
 /** The CSS stylesheet for the color mode. */
 readonly colorModeStyleSheet: CSSStyleSheet;
 /** The toggle button for vintage mode. */
 readonly vintageModeButton: HTMLButtonElement;
 /** The link element for the web app manifest. */
 readonly manifestLink: HTMLLinkElement
 /** A promise which resolves when the user space is fully initialized and ready to install features. */
 readonly promise: Promise<void>
 /** Initializes the entire part hierarchy which handles mapping URIs to app state.
  * 
  * Sets all of the client features. Those features will only initialize if we are in the window environment. */
 distributeInitializePart(): void
 /** Gets the nested toolbar's shadow root. */
 getNestedToolbar(): ShadowRoot
 /** Destroys the nested toolbar. */
 destroyNestedToolbar(): void
 /** Sets the entire user configuration space to match the given Route object. */
 setRoute(ROUTE: Route): void
}
/** The root of the client window part hierarchy.
 * 
 * It handles the DOM and user interaction as well as baking inline HTML and CSS on the server. */
declare const user: UserPart