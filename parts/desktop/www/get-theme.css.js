const vintage = era.arm.key === "vintage"
return `wallpaper- {
 display: flex;
 flex-flow: column wrap;
 align-items: baseline;
 align-content: baseline;
 gap: 8px;
 padding: ${vintage ? `0` : `16px`};
 color: white;
 background: #377f7f;
}

desktop-icon {
 display: flex;
 flex-flow: column;
 flex: 0 0;
 height: 66px;
 align-items: center;
 position: relative;
}

desktop-icon>img {
 --icon-size: ${vintage ? "32" : "48"}px;
 width: var(--icon-size);
 height: var(--icon-size);
 background-color: magenta;
}

desktop-icon>.label {
 flex: 1 0 34px;
 width: ${vintage ? "74" : "112"}px;
 padding: 3px;
 text-align: center;
 border-radius: 4px;
}`