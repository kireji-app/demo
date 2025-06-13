/** The core operating system interface part itself. Separate from other running tasks because this task is required.
 * 
 * Desktop content is encoded by the first segment of the user route pathname. */
declare class PartDesktop extends PartMix {
 readonly color: PartColorMode
 readonly era: PartEra
 readonly menu: PartMenu
 readonly menuClip: PartMenu
 readonly taskBar: PartTaskbar
 readonly www: PartDesktopTheme
}