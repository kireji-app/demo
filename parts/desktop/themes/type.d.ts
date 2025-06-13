declare class PartThemes extends PartMatch {
 readonly core: PartTheme
 readonly user: PartUserTheme
 readonly desktop: PartDesktopTheme
 readonly ejaugust: PartEJAugustTheme
 readonly orenjinari: PartOrenjinariTheme
 /** The currently selected theme across the operating system. */
 readonly arm: PartTheme
}
declare class PartTheme extends Part {
 /** The HTML content which will be presented as the live wallpaper of the operating system when this theme is the selected theme. */
 readonly "wallpaper.html": string
 /** The css content which will be presented to style the entire operating system (including the live wallpaper) when this theme is the selected theme. */
 readonly "theme.css": string
}
declare const themes: PartThemes