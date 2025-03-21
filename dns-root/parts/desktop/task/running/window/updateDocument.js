const
 restored = part.choice[LAYER] === part.restored,
 max = restored ? false : part.choice[LAYER] === part.minimized,
 x = restored ? part.restored.x.getValue(LAYER) + "px" : max ? 0 : undefined,
 y = restored ? part.restored.y.getValue(LAYER) + "px" : max ? 0 : undefined,
 w = restored ? part.restored.w.getValue(LAYER) + "px" : max ? "100vw" : undefined,
 h = restored ? part.restored.h.getValue(LAYER) + "px" : max ? "calc(100 * var(--h))" : undefined

part.styleSheet.replaceSync(`
:host {
 position: fixed;
 display: ${restored || max ? "block" : "none"};
 left: ${x};
 top: ${y};
 width: ${w};
 height: ${h};
 box-shadow: 0 0 0 1px red;
}`)