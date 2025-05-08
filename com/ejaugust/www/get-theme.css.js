return `
wallpaper- footer {
 display: flex;
 gap: var(--spacing);
 padding: var(--spacing);
 width: 100%;
 justify-content: end;
}
wallpaper- :is(h1, article, footer) {
 margin: 0;
 padding: var(--spacing);
}
wallpaper- footer p {
 margin: 0;
 padding: 0;
}
wallpaper- {
 top: var(--task-bar-height);
 bottom: 0;
}`/*

wallpaper- {
 background: var(--bg-shade1);
 color: var(--fg-fade1);
 font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 line-height: 1.6;
 margin: 0;
 padding: 0;
 display: flex;
 flex-direction: column;
 align-items: center;
}

wallpaper- h1,
wallpaper- h2,
wallpaper- h3,
wallpaper- h4,
wallpaper- h5,
wallpaper- h6 {
 color: var(--fg-fade2);
 line-height: 1.3;
 margin-bottom: 0.75em;
}

wallpaper- h1 {
 font-size: 2.5em;
 margin-top: 0;
}

wallpaper- p {
 margin-bottom: 1.2em;
 font-size: 1.1em;
}

wallpaper- menu {
 display: flex;
 width: 100%;
 padding: 0 3ch;
 margin: 3ch 0;
 gap: 3ch;
}

wallpaper- :is(a, a:visited) {
 --color: var(--fg-fade1);
 color: var(--color);
 text-decoration: none;
 box-shadow: 0 1px 0 -0.25px var(--color);
 white-space: nowrap;
}

wallpaper- a:hover {
 --color: var(--theme);
}

wallpaper- article a[target="_blank"]::after {
 content: '↗';
 color: inherit;
 display: inline-block;
 font-size: inherit;
 line-height: inherit;
 font-weight: 900;
 height: 1ch;
 width: 1ch;
 margin: 0 0.5ch;
}

wallpaper- menu>a {
 display: block;
 text-indent: -9999px;
 overflow: hidden;
 width: var(--icon-size);
 height: var(--icon-size);
 background-image: url(${blog.render({ request: "github-mark-white.svg", format: "datauri" })});
 background-repeat: no-repeat;
 background-position: center center;
}

wallpaper- article a[href^="https://github.com"]::before {
 content: "";
 background-image: url(${blog.render({ request: "github-mark-white.svg", format: "datauri" })});
 display: inline-block;
 height: 1ch;
 width: 1ch;
 margin: 0 0.5ch;
}

wallpaper- em,
wallpaper- i {
 font-style: italic;
 color: var(--fg-fade2);
}

wallpaper- strong,
wallpaper- b {
 font-weight: bold;
 color: var(--fg-fade2);
}

wallpaper- article>header {
 margin-bottom: 2ch;
}

wallpaper- article>header h1 {
 margin-bottom: 0.2ch;
}

wallpaper- .post-meta {
 color: var(--fg-fade-3);
 font-size: 0.9em;
 margin-bottom: 1.5em;
}

wallpaper- .post-meta a {
 color: var(--fg-fade-3);
}

wallpaper- .post-content {
 line-height: 1.8;
}

wallpaper- pre {
 background-color: var(--bg-shade3);
 padding: 15px;
 border-radius: 5px;
 overflow-x: auto;
 font-family: 'Courier New', Courier, monospace;
 font-size: 0.95em;
 line-height: 1.4;
 margin-bottom: 1.5em;
}

wallpaper- code {
 font-family: 'Courier New', Courier, monospace;
 font-size: 0.9em;
 background-color: var(--bg-shade3);
 padding: 0.2em 0.4em;
 border-radius: 3px;
}

wallpaper- pre code {
 background-color: transparent;
 padding: 0;
 border-radius: 0;
}

wallpaper- blockquote {
 border-left: 5px solid #ddd;
 padding-left: 1.5em;
 font-style: italic;
 color: #555;
 margin-left: 0;
 margin-right: 0;
 margin-bottom: 1.5em;
}

wallpaper- ul,
wallpaper- ol {
 margin-bottom: 1.5em;
 padding-left: 20px;
}

wallpaper- li {
 margin-bottom: 0.5em;
}

wallpaper- hr {
 border: 0;
 border-top: 1px solid #eee;
 margin: 2em 0;
}

@media (max-width: 768px) {
 wallpaper- article {
  width: 95%;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
 }

 wallpaper- h1 {
  font-size: 2em;
 }

 wallpaper- p {
  font-size: 1em;
 }
}`*/