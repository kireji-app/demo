const
 restored = part.arm === part.restored,
 max = restored ? false : part.arm === part.minimized,
 x = restored ? part.restored.x.getValue("document") + "px" : max ? 0 : undefined,
 y = restored ? part.restored.y.getValue("document") + "px" : max ? 0 : undefined,
 w = restored ? part.restored.w.getValue("document") + "px" : max ? "100vw" : undefined,
 h = restored ? part.restored.h.getValue("document") + "px" : max ? "calc(100 * var(--h))" : undefined

part.styleSheet.replaceSync(`
:host {
 position: fixed;
 display: ${restored || max ? "block" : "none"};
 left: ${x};
 top: ${y};
 width: ${w};
 height: ${h};
 box-shadow: var(--deep-outset);
 background: var(--surface);
}`)