return `wallpaper- {
 --sections: 5;
 --section-gap: 128px;
 background:
  url(${orenjinari.render({ request: "signature.png", format: "datauri" })}) 36.5vw 8vw/27vw 7.78vw no-repeat,
  url(${orenjinari.render({ request: "ground.png", format: "datauri" })}) 12.5vw calc(.8 * var(--h))/75vw 3.75vw no-repeat,
  radial-gradient(ellipse 17.597vw 20.968vw at 7.735vw 5.433vw, white 99.5%, transparent 100%),
  radial-gradient(ellipse 12.477vw 20.968vw at 28.291vw 2.626vw, white 99.5%, transparent 100%),
  radial-gradient(ellipse 18.667vw 20.968vw at 49.722vw 5.389vw, white 99.5%, transparent 100%),
  radial-gradient(ellipse 20.255vw 20.968vw at 80.029vw 6.956vw, white 99.5%, transparent 100%),
  radial-gradient(ellipse 14.194vw 20.968vw at 94.327vw 5.053vw, white 99.5%, transparent 100%),
  /* url(${orenjinari.render({ request: "mockup.png", format: "datauri" })}) 0 0/100% auto, */
  #F8D2AC;
 display: flex;
 flex-flow: column;
 gap: var(--section-gap);
 padding-top: calc(var(--h) + var(--section-gap)) !important;
}

body.modern task-bar {
 background: transparent;
 box-shadow: none;
}


body.vintage sidebar-::after {
 content: "orenjinari";
 font-weight: 900;
}

wallpaper- .bunny {
 position: absolute;
 cursor: pointer;
}

wallpaper- #connect {
 left: calc(75vw - 3.7vw);
 top: calc(calc(.8 * var(--h)) - 7.6vw);
 width: 7.4vw;
}

wallpaper- #others {
 left: calc(57.5vw - 4vw);
 top: calc(calc(.8 * var(--h)) - 9.3vw);
 width: 8vw;
}

wallpaper- #portfolio {
 left: calc(42.5vw - 5vw);
 top: calc(calc(.8 * var(--h)) - 10.5vw);
 width: 10vw;
}

wallpaper- #about {
 left: calc(25vw - 4vw);
 top: calc(.8 * var(--h) - 8vw);
 width: 8vw;
}

wallpaper- .placeholder {
 width: 100vw;
 height: var(--h);
 box-shadow: inset 0 0 0 8vw var(--fg-mode-er);
 position: relative;
}

wallpaper- .placeholder img {
 width: 64px;
}

wallpaper- .placeholder h1 {
 text-align: center;
 line-height: calc(var(--h) - var(--task-bar-height));
 height: 100%;
 position: absolute;
 width: 100%;
 left: 0;
 top: 0;
 margin: 0;
 padding: 0;
 font-size: 25vw;
 color: var(--fg-mode-est);
}

wallpaper- .placeholder .thin {
 font-weight: 200;
}

wallpaper- .float {
 font-size: 32px;
 height: 100%;
 align-items: center;
 justify-content: center;
 display: flex;
 gap: 0.5ch;
 line-height: 1em;
 z-index: 50;
}

@media (width < 500px) {
 wallpaper- .float {
  font-size: max(min(5vw, calc(.05 * var(--h))), 16px);
 }
}

body {
 overflow-y: scroll;
}`