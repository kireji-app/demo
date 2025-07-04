declare class PartDate extends PartMatch {
 /** The currently selected blog post. */
 readonly post: BlogPost
 /** An array of all of the selectable blog posts. */
 readonly dates: BlogPost[]
}
declare const date: PartDate