return `.app-container #error-message>.thin {
 font-weight: 200;
}

.app-container #error-message {
 font-size: ${Math.trunc(200 / (MESSAGE.replaceAll(/(<([^>]+)>)/g, "").length + 3))}vw;
 height: 100%;
 align-items: center;
 justify-content: center;
 display: flex;
 gap: 0.5ch;
 line-height: 1em;
}

.app-container #error-status {
 font-size: 35vw;
 text-align: center;
 color: var(--bg-un-mode);
 line-height: var(--app-height);
 height: 100%;
 position: absolute;
 width: 100%;
 left: 0px;
 top: 0px;
 margin: 0px;
 padding: 0px;
 opacity: 50%;
 z-index: -1;
}`