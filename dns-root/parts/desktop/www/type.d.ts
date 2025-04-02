declare class DesktopPart extends MixPart {
 /** The prototype of the desktop, whose host is `mix.core.parts`. */
 readonly super: MixPart
 /** Uses Framework.pathSegmentRadix to parse the current location hash to set the current desktop route.*/
 parseRouteIDFromAddressBar(): void

 /** The computed framerate of the application. */
 readonly fps: number
 /** The current session time. */
 readonly time: DOMHighResTimeStamp
 /** The average length of time each frame is on screen in milliseconds. */
 readonly meanFrameTime: number

 // Client Features.
 readonly gpu: GpuPart
 readonly 0: GpuPart
 readonly agent: AgentPart
 readonly 1: AgentPart
 readonly share: SharePart
 readonly 2: SharePart
 readonly hotKeys: HotKeysPart
 readonly 3: HotKeysPart
 readonly hydration: HydrationPart
 readonly 4: HydrationPart
 readonly addressBar: AddressBarPart
 readonly 5: AddressBarPart
 readonly serviceWorker: ServiceWorkerPart
 readonly 6: ServiceWorkerPart

 // Desktop Settings.
 readonly colorMode: ColorModePart
 readonly 7: ColorModePart
 readonly vintageMode: VintageModePart
 readonly 8: VintageModePart
 readonly menu: MenuPart
 readonly 9: MenuPart

 /** Boots a virtual operating system that can produce a static HTML image of its output. 
  * Sets all of the client features. Those features will only initialize if we are in the desktop environment. */
 setParts(): void

 /** The root element for the desktop's live wallpaper. */
 wallpaper: ShadowRoot

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
 /** The main menu part. */
 menu: MenuPart
 /** The sidebar element within the menu. */
 sidebar: HTMLDivElement
 /** The section in the start menu listing wallpapers to choose from. */
 wallpapersSection: HTMLUListElement
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