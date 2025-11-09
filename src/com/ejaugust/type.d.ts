declare interface IEJAugust extends IComApplication {
 readonly scroller: IEJAugustScroller
 readonly sections: IEJAugustSections
 /** The portion of the stylesheet that doesn't change with the application's state. */
 readonly "static.css": string
}

/** The entire www.ejaugust.com application, including home page and all notes. */
declare const ejaugust: IEJAugust
declare const sections: IEJAugustSection