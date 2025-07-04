declare class PartEJAugust extends PartMix {
 readonly date: PartDate
 readonly post: BlogPost
 readonly scroller: PartScroller
 readonly www: PartEjaugustTheme
}
/** The ejaugust apex domain, which contains all of the logic and posts for the blog there. */
declare const ejaugust: PartEJAugust