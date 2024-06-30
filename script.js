(C = {
 "size.commit": {
  get() {
   return {
    ".html": "./host-size.number",
    ".css": `./stat.css`
   };
  },
 },
 "tray.commit": {
  get() {
   return {
    ".children": `tray.children`,
    ".css": `data:,:host {
     position: relative;
     display: flex;
     flex-flow: row nowrap;
     gap: 3px;
     box-sizing: border-box;
     height: 100%;
     margin: 0;
     user-select: none;
     padding: 3px 4px 3px;
     text-align: left;
     background: #c3c3c3;
     box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;
     }`,
   };
  },
 },
 "clock.commit": {
  get() {
   return {
    ".html": `./time.txt`
   };
  },
 },
 "grey1.commit": {
  get() {
   return {
    "grey.color": `data:text/color,#344555`
   };
  },
 },
 "grey2.commit": {
  get() {
   return {
    "grey.color": `grey2.color`
   };
  },
 },
 "empty.commit": {
  get() {
   return {
    ".tag": "./name.tag",
    ".children": "empty.children",
    ".css": "./cell-details.css",
   };
  },
 },
 "title.commit": {
  get() {
   return {
    ".html": `./title.html`,
    ".tag": `./name.tag`,
    ".css": "title.css",
   };
  },
 },
 "button.commit": {
  get() {
   return {
    ".tag": `./name.tag`
   };
  },
 },
 "editor.commit": {
  get() {
   return {
    ".children": `editor.children`,
    ".tag": `./name.tag`,
    ".css": `./editor.css`,
   };
  },
 },
 "memory.commit": {
  get() {
   return {
    ".html": "./host-memory.html",
    ".css": `./stat.css`
   };
  },
 },
 "status.commit": {
  get() {
   return {
    ".children": `status.children`,
    ".tag": `./name.tag`,
    ".layout": `status.layout`,
   };
  },
 },
 "version.commit": {
  get() {
   return {
    ".html": `./version.number`,
    ".tag": `./name.tag`,
    "pill-icon-right.bool": `true.bool`,
    ".css": `./stat.css`,
   };
  },
 },
 "address.commit": {
  get() {
   return {
    ".html": `./host.rid`,
    ".tag": `data:text/tag,rid-`,
    ".css": `./address.css`,
   };
  },
 },
 "sidebar.commit": {
  get() {
   return {
    ".children": `sidebar.children`,
    ".tag": `./name.tag`,
    ".css": `sidebar.css`,
   };
  },
 },
 "taskbar.commit": {
  get() {
   return {
    ".tag": `./name.tag`,
    "height.number": `data:,28px`,
    ".children": `./taskbar.children`,
    ".css": `data:,:host { position: relative; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: flex; flex-flow: row nowrap; gap: 3px; height: 100%; padding: 4px 2px 2px; background: #c3c3c3; box-shadow: inset 0 1px #c3c3c3, inset 0 2px white; }`,
   };
  },
 },
 "desktop.commit": {
  get() {
   return {
    ".tag": `./name.tag`,
    ".css": `data:,:host{ background: #377f7f }`,
   };
  },
 },
 "Welcome.commit": {
  get() {
   return {
    ".tag": "./name.tag",
    ".html": "welcome.html",
    ".css": "./cell-details.css",
   };
  },
 },
 "error404.commit": {
  get() {
   return {
    ".css": `./error404.css`,
    ".html": `./error404.html`,
    ".tag": `./name.tag`,
   };
  },
 },
 "side-menu.commit": {
  get() {
   return {
    ".children": `menu-buttons.children`,
    ".tag": `./name.tag`,
    ".layout": `menu-buttons.layout`,
   };
  },
 },
 "inspector.commit": {
  get() {
   return {
    "title.txt": "data:,Inspector",
    ".children": `inspector.children`,
    ".tag": `./name.tag`,
    "onscroll.fn": `./scroll-name-y.fn`,
    ".css": `data:,:host{display: flex; flex-flow: column nowrap; overflow-y: auto }`,
   };
  },
 },
 "tab-label.commit": {
  get() {
   return {
    ".tag": "./name.tag",
    ".html": "./item.html",
    ".css": "./tab-label.css",
   };
  },
 },
 "empty-icon.commit": {
  get() {
   return {
    ".html": `data:text/html,∅`,
    ".tag": `data:text/tag,empty-icon`,
   };
  },
 },
 "start-menu.commit": {
  get() {
   return {
    ".tag": `./name.tag`,
    ".css": `start-menu.css`,
    ".children": `start-menu.children`,
   };
  },
 },
 "core.parts.commit": {
  get() {
   return {
    "icon.png":
     "data:image/png;base64,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",
    "editor-tabs-scroll-x.number": "data:text/json,0",
    "inspector-scroll-y.number": "data:text/json,0",
    "cell-details-scroll-y.number": "data:text/json,0",
    "inspector.bool": `false.bool`,
    "item.rid": `data:text/child,Welcome`,
    "items.children": `data:text/children,Welcome`,
    ".tag": `./name.tag`,
    "background.color": `grey.color`,
    ".children": `./core.parts.children`,
    ".css": `./theme.css`,
    "sidebar-open.bool": `true.bool`,
   };
  },
 },
 "editor-tab.commit": {
  get() {
   return {
    "onclick.fn": `./select-item.fn`,
    ".tag": "./name.tag",
    ".css": "./editor-tab.css",
    ".children": "./tab.children",
   };
  },
 },
 "twist-base.commit": {
  get() {
   return {
    "red.color": `data:,#d44`,
    "green.color": `data:,#4d4`,
    "blue.color": `data:,#44d`,
    "twist.bool": `true.bool`,
   };
  },
 },
 "remove-item.commit": {
  get() {
   return {
    "onclick.fn": `./remove-item.fn`,
    ".tag": "./name.tag",
    ".html": "data:,X",
    ".css": `data:,:host{display:inline-block; width: 16px; height: 16px; line-height: 16px; text-align: center; margin-left: 6px; } :host(:hover) { background: black; color: white }`,
   };
  },
 },
 "twist-layer.commit": {
  get() {
   return {
    "red.color": `green.color`,
    "green.color": `blue.color`,
    "blue.color": `red.color`,
   };
  },
 },
 "pilot.parts.commit": {
  get() {
   return {
    ".tag": `./name.tag`,
    ".css": `./os.css`,
    ".children": `./os.children`,
   };
  },
 },
 "editor-tabs.commit": {
  get() {
   return {
    "onscroll.fn": `./scroll-name-x.fn`,
    ".tag": "./name.tag",
    ".css": "./editor-tabs.css",
    ".children": "editor-tabs.children",
   };
  },
 },
 "flex-spacer.commit": {
  get() {
   return {
    ".layout": `flex-spacer.layout`,
    ".tag": `./name.tag`
   };
  },
 },
 "play-button.commit": {
  get() {
   return {
    "onclick.fn": `./toggle-play.fn`,
    ".html": "data:,▶",
    ".css": `./stat.css`,
   };
  },
 },
 "stat-layout.commit": {
  get() {
   return {
    "layout.css": "./stat.css"
   };
  },
 },
 "file-viewer.commit": {
  get() {
   return {
    "title.txt": "data:,File Viewer",
    ".tag": "./name.tag",
    ".css": "./file-viewer.css",
    ".html": `./file-viewer.html`,
   };
  },
 },
 "welcome-link.commit": {
  get() {
   return {
    "item.rid": "data:,Welcome",
    "onclick.fn": "./select-item.fn",
    ".html": `data:text/html,Open welcome menu.`,
    ".tag": `data:text/tag,welcome-link`,
   };
  },
 },
 "cell-details.commit": {
  get() {
   return {
    "onscroll.fn": `./scroll-name-y.fn`,
    "title.txt": "data:,Cell Details",
    ".tag": "./name.tag",
    ".css": "./cell-details.css",
    ".children": `./cell-details.children`,
   };
  },
 },
 "start-button.commit": {
  get() {
   return {
    ".css": `start-button.css`,
    ".html": `data:,<icon-></icon->Start`,
    "onpointerdown.fn": `https://pilot.parts/toggle-start-menu.fn`,
    "tabindex.number": `1`,
   };
  },
 },
 "hide-sidebar.commit": {
  get() {
   return {
    "sidebar-open.bool": `false.bool`
   };
  },
 },
 "next-version.commit": {
  get() {
   return {
    "version.number": `https://core.parts/next-version.number`
   };
  },
 },
 "ejaugust.com.commit": {
  get() {
   return {
    ".tag": `./name.tag`,
    ".children": `./portfolio.children`,
    ".css": `./portfolio.css`,
    "onresize.fn": `./grid-snap.fn`,
   };
  },
 },
 "status-layout.commit": {
  get() {
   return {
    "layout.css": `status.css`
   };
  },
 },
 "inspector-item.commit": {
  get() {
   return {
    ".tag": `./name.tag`,
    ".html": `./item.html`,
    "onclick.fn": `./select-item.fn`,
    ".css": `./inspector-item.css`,
   };
  },
 },
 "account-button.commit": {
  get() {
   return {
    ".html": `data:text/html,👤`,
    ".css": `unicode-button.css`,
    ".tag": `./name.tag`,
   };
  },
 },
 "open-inspector.commit": {
  get() {
   return {
    "inspector.bool": `true.bool`
   };
  },
 },
 "open-start-menu.commit": {
  get() {
   return {
    "start-menu.bool": `true.bool`
   };
  },
 },
 "grey-background.commit": {
  get() {
   return {
    "background.color": `grey.color`,
    "layout.css": `background.css`,
   };
  },
 },
 "settings-button.commit": {
  get() {
   return {
    ".html": `data:text/html,⚙`,
    ".css": `unicode-button.css`,
    ".tag": `./name.tag`,
   };
  },
 },
 "inspector-button.commit": {
  get() {
   return {
    ".html": `data:text/html,☰`,
    ".css": `unicode-button.css`,
    ".tag": `./name.tag`,
    "onclick.fn": `https://core.parts/toggle-inspector.fn`,
   };
  },
 },
 "cell-detail-href.commit": {
  get() {
   return {
    "title.txt": `data:,href`,
    ".tag": "./name.tag",
    ".css": "./cell-detail.css",
    ".html": "./cell-detail-href.html",
   };
  },
 },
 "cell-detail-value.commit": {
  get() {
   return {
    "title.txt": `data:,value`,
    ".tag": "./name.tag",
    ".css": "./cell-detail.css",
    ".children": "./cell-detail-value.children",
   };
  },
 },
 "cell-detail-source.commit": {
  get() {
   return {
    "title.txt": `data:,source`,
    ".tag": "./name.tag",
    ".css": "./cell-detail.css",
    ".html": "./cell-detail-source.html",
   };
  },
 },
 "cell-detail-getter.commit": {
  get() {
   return {
    "title.txt": `data:,get`,
    ".tag": "./name.tag",
    ".css": "./cell-detail.css",
    ".html": "./cell-detail-getter.html",
   };
  },
 },
 "lighten-background.commit": {
  get() {
   return {
    "background.color": `light-background.color`
   };
  },
 },
 "flex-spacer-layout.commit": {
  get() {
   return {
    "layout.css": `flex-spacer.css`
   };
  },
 },
 "menu-buttons-layout.commit": {
  get() {
   return {
    "layout.css": `menu-buttons.css`
   };
  },
 },

 "set.fn": {
  get() {
   return (incomingCommit) => {
    const workingTree = this["workingTree.commit"],
     commit = this[".commit"],
     delta = {};

    for (const name in incomingCommit) {
     if (incomingCommit[name] !== commit[name]) {
      if (incomingCommit[name] === undefined) {
       delete workingTree[name];
       delta[name] = commit[name];
      } else delta[name] = workingTree[name] = incomingCommit[name];
     } else if (workingTree[name]) {
      delete workingTree[name];
      if (commit[name]) delta[name] = commit[name];
      else {
       delete this[name];
      }
     }
    }

    const oldRID = this[".rid"],
     search = this["workingTree.search"],
     newRID = this[".name"] + search,
     parentRowmap = Object.getPrototypeOf(this)[".rowmap"];

    if (search) this[".node"].setAttribute("data-search", search);
    else this[".node"].removeAttribute("data-search");

    delete parentRowmap[oldRID];
    parentRowmap[newRID] = this;
    const get = function () {
     return newRID;
    };
    get.meta = { source: "delta change" };
    Object.defineProperties(this, {
     ".rid": { get, configurable: true, enumerable: true },
    });
    this["checkout-commit.fn"](delta, "delta change");
    this["signal.fn"]();

    if (this === HOST) {
     if (history._timeout) clearTimeout(history._timeout);

     history._timeout = setTimeout(
      () => history.replaceState({}, null, location.origin + search),
      250
     );
    }
   };
  },
 },
 "log.fn": {
  get() {
   return (...args) => console.log(this["prefix.txt"], ...args);
  },
 },
 "boot.fn": {
  get() {
   return () => {
    globalThis.TAPE = "";
    globalThis.NODES = new Map();
    globalThis.BOOT_TIME = Date.now();
    const get = function () {
     return this["root.name"];
    };
    get.meta = { source: "boot" };
    globalThis.ROW = Object.create(
     null,
     Object.assign({ ...C }, C["create-default-columns.fn"].get()(), {
      ".rid": { get },
     })
    );
    globalThis.HOST = ROW["branch.fn"](
     location.host.slice(location.host.startsWith("dev.") ? 4 : 0) +
     location.search
    );
    HOST["install.fn"]();
   };
  },
 },
 "test.fn": {
  get() {
   return (name, o = { "": ROW }) => {
    const [src, fn, str, n2, t] = ROW[`${name}.test`].split(" ");
    setTimeout(() => {
     o[name] = (src === "this" ? this : src === "host" ? HOST : o[src])[
      fn + ".fn"
     ](str || undefined);
     ROW["signal.fn"]();
     this["test.fn"](n2, o);
    }, parseInt(t || 2000));
   };
  },
 },
 "fetch.fn": {
  get() {
   return (url, event) => {
    const { host, pathname } = new URL(url),
     names = (
      host.slice(host.startsWith("dev.") ? 4 : 0) + pathname
     ).split("/");

    let row = ROW;

    for (const name of names) row = row["branch.fn"](name);

    event.respondWith(row[".response"]);
   };
  },
 },
 "signal.fn": {
  get() {
   return () => {
    if (this["server.bool"])
     throw new Error(
      "Server Error: signal called in server." + this["trace.txt"]
     );

    if (this["view.stylesheet"] !== null)
     this["view.stylesheet"].replaceSync(this["layout.css"]);

    if (this[".node"] === undefined) {
     throw "here " + this[".rid"];
    }
    if (this[".node"] !== null) {
     const { shadowRoot } = this[".node"];

     layouts: {
      const rawCSS = this[".css"],
       stylesheets = shadowRoot.adoptedStyleSheets,
       existingSheets = [...stylesheets],
       existingSheetTable = existingSheets.map((sheet) => sheet.row);
      if (rawCSS !== null) {
       let singleSheet = existingSheets[0];
       if (existingSheetTable.length !== 1 || singleSheet.row) {
        for (const existingSheetRow of existingSheetTable) {
         existingSheetRow?.["remove.fn"]();
         stylesheets.pop();
        }
        singleSheet = new CSSStyleSheet();
        stylesheets.push(singleSheet);
       }
       singleSheet.replaceSync(rawCSS);
      } else {
       const incomingSheetNames = this[".layout"];
       let i = -1;
       while (existingSheetTable.length && incomingSheetNames.length) {
        i++;
        const existingSheetRow = existingSheetTable.shift(),
         existingSheetName = existingSheetRow?.[".name"],
         incomingSheetName = incomingSheetNames.shift();
        if (existingSheetName === incomingSheetName) continue;
        const existingIndex = existingSheetTable.findIndex(
         (row) => row[".name"] === incomingSheetName
        );
        let stylesheet;
        if (existingIndex === -1) {
         stylesheet = new CSSStyleSheet();
         stylesheet.row = this["branch.fn"](incomingSheetName, {
          ["view.stylesheet"]: {
           get() {
            return stylesheet;
           },
           configurable: true,
          },
         });
        } else {
         const stylesheetIndex = i + existingIndex + 1;
         stylesheet = stylesheets[stylesheetIndex];
         stylesheets.splice(stylesheetIndex, 1);
         existingSheetTable.splice(existingIndex, 1);
        }
        stylesheets.splice(i, 0, stylesheet);
        if (
         incomingSheetNames.some((name) => name === existingSheetName)
        ) {
         existingSheetTable.unshift(existingSheetRow);
         continue;
        }
        stylesheets.splice(i + 1, 1);
       }
       if (existingSheetTable.length)
        existingSheetTable.forEach(() => stylesheets.pop());
       else if (incomingSheetNames.length)
        for (const incomingSheetName of incomingSheetNames) {
         const stylesheet = new CSSStyleSheet();
         stylesheet.row = this["branch.fn"](incomingSheetName, {
          ["view.stylesheet"]: {
           get() {
            return stylesheet;
           },
           configurable: true,
          },
         });
         stylesheets.push(stylesheet);
        }
      }
     }

     children: {
      const innerHTML = this[".html"];
      if (innerHTML !== null) {
       if (shadowRoot.innerHTML != innerHTML)
        shadowRoot.innerHTML = innerHTML;
      } else {
       const incomingRIDs = this[".children"];

       if (!(incomingRIDs && Array.isArray(incomingRIDs)))
        throw new Error(
         `Cannot use .children file of type ${typeof incomingRIDs}.${this["trace.txt"]
         }`
        );

       const children = shadowRoot.children,
        max = 50;

       let i = -1;

       while (incomingRIDs.length) {
        i++;

        if (i >= max) throw "∞ loop";

        const incomingRID = incomingRIDs.shift(),
         existingRID = children[i]?.row[".rid"];

        if (!incomingRID)
         throw new Error(
          `Create Node failed. No name on node.\n\t${JSON.stringify(
           this[".children"]
          )}${this["trace.txt"]}`
         );

        if (existingRID === incomingRID) continue;

        const existingIndex = [...children].findIndex(
         (n, o) => o > i && n.row[".rid"] === incomingRID
        );

        if (existingIndex !== -1) {
         shadowRoot.insertBefore(children[existingIndex], children[i]);
         continue;
        }

        const row = this["branch.fn"](incomingRID),
         node = row[".node"];

        if (node === null)
         throw new Error(
          `Create Node Error: this row doesn't have a node.${this["trace.txt"]}`
         );

        if (i !== -1 && i < children.length)
         shadowRoot.insertBefore(node, children[i]);
        else shadowRoot.appendChild(node);

        node.callback?.();
       }

       while (children[i + 1]) children[i + 1].row["remove.fn"]();
      }
     }
    }
    Object.values(this[".rowmap"]).forEach((row) => row["signal.fn"]());
   };
  },
 },
 "server.fn": {
  get() {
   return () => {
    onfetch = (e) => HOST["fetch.fn"](e.request.url, e);
    onactivate = onmessage = (e) => clients.claim();
    oninstall = (e) => {
     globalThis.skipWaiting();
     e.waitUntil(
      fetch(location.origin)
       .then((index) => index.text())
       .then((text) => {
        console.log("setting index...");
        globalThis.INDEX = text.replace(
         `<link rel="manifest">`,
         `<link rel="manifest" href="${this["manifest.uri"]}"/>`
        );
        this["log.fn"]();
       })
     );
    };
   };
  },
 },
 "client.fn": {
  get() {
   return () => {
    Promise.all([
     (async () => {
      const registration = await navigator.serviceWorker.register(
       location.origin + "/script.js"
      ),
       { waiting: w, installing: i, active: a } = registration;
      if (!a)
       await new Promise(
        (resolve) =>
        ((w ?? i).onstatechange = ({ target: t }) =>
         t.state === "activated" ? resolve(t) : 0)
       );
      return registration;
     })(),
     new Promise((resolve) => (onload = resolve)),
    ]).then(([registration]) => {
     if (location.host.startsWith("dev.")) {
      document.onvisibilitychange = () =>
       document.hidden || registration.update();
      window.onfocus = () => registration.update();
     }

     const manifest = document.querySelector('[rel="manifest"]'),
      original = !manifest.href,
      server = navigator.serviceWorker.controller,
      forceRefreshed = !server,
      begin = () => {
       this["log.fn"]();

       if (original) manifest.href = HOST["manifest.uri"];

       //let row = ROW["insert.fn"]("twist-base")["insert.fn"]('twist-layer')
       HOST["ownNode.fn"](document.body);
       ROW["signal.fn"]();

       /*
const loop = () => requestAnimationFrame(() => {
row = row["insert.fn"]('blank')
if (row["branch-length.number"] > 100 || row[".path"].length > 2048) {
row = row["remove.fn"]()
ROW["signal.fn"]()
return
}
ROW["signal.fn"]()
loop()
})
loop()*/
      };

     let waiting;

     navigator.serviceWorker.oncontrollerchange = () => {
      // can only be waiting if there was no controller yet until now
      if (waiting) {
       waiting = false;
       begin();
       return;
      }
      // can only get here if the controller has changed which can only happen if the server-side script changes.
      location.reload();
     };

     const bootState = {
      "original.bool": original,
      "force-refresh.bool": forceRefreshed,
     },
      bootColumns = {};

     for (const bootRID in bootState) {
      const get = function () {
       return bootState[bootRID];
      };
      get.meta = { source: "install" };
      bootColumns[bootRID] = {
       get,
       configurable: true,
       enumerable: true,
      };
     }

     Object.defineProperties(this, bootColumns);

     if (forceRefreshed) {
      waiting = true;
      registration.active.postMessage(1);
     } else begin();
    });
   };
  },
 },
 "branch.fn": {
  get() {
   return (rid, inputColumns) => {
    if (rid in this[".rowmap"]) {
     if (inputColumns) {
      const oldRow = this[".rowmap"][rid];
      delete this[".rowmap"][rid];
      return oldRow["replaceWith.fn"](rid, inputColumns);
     }

     return this[".rowmap"][rid];
    }

    const [name, search] = rid.split("?"),
     exists = name + ".commit" in this,
     commitName = (exists ? name : "error404") + ".commit",
     commit = this[commitName],
     commitNames = Object.keys(commit),
     defaultColumns = this["create-default-columns.fn"](),
     workingTree = (search ? search.split("&") : []).reduce(
      (attrs, param) => {
       const [name, href] = param.split("=");
       attrs[name] = href;
       return attrs;
      },
      {}
     ),
     context = {
      "default.columns": defaultColumns,
      "instance.names": commitNames,
      ".name": name,
      ".rid": rid,
      ".commit": commit,
      "workingTree.commit": workingTree,
     },
     contextColumns = {};

    for (const contextRID in context) {
     const get = function () {
      return context[contextRID];
     };
     get.meta = { source: "context" };
     contextColumns[contextRID] = {
      get,
      configurable: true,
      enumerable: true,
     };
    }

    // if (!exists)
    // console.warn('Warning: 404 on branch ' + name, this)

    const row = (this[".rowmap"][rid] = Object.create(
     this,
     Object.assign({}, defaultColumns, inputColumns, contextColumns)
    ));

    for (const name in workingTree) row["attributes.names"].add(name);

    row["checkout-commit.fn"](commit, "original commit");
    row["checkout-commit.fn"](workingTree, "delta change");

    return row;
   };
  },
 },
 "donate.fn": {
  get() {
   return (child, parent, rid = child[".rid"]) => {
    delete this[".rowmap"][rid];
    parent[".rowmap"][rid] = child;
    Object.setPrototypeOf(child, parent);
   };
  },
 },
 "insert.fn": {
  get() {
   return (rid, inputColumns) => {
    const row = this["branch.fn"](rid, inputColumns),
     rowmap = this[".rowmap"];
    for (const rid in rowmap)
     if (rowmap[rid] !== row) this["donate.fn"](rowmap[rid], row, rid);
    return row;
   };
  },
 },
 "remove.fn": {
  get() {
   return () => {
    if (this === ROW)
     throw new Error(
      "Error: Attempted to remove ROW." + this["trace.txt"]
     );

    const parent = Object.getPrototypeOf(this),
     rowmap = this[".rowmap"],
     node = this[".node"];

    delete parent[".rowmap"][this[".rid"]];

    for (const rid in rowmap) this["donate.fn"](rowmap[rid], parent, rid);

    node?.remove();

    return parent;
   };
  },
 },
 "install.fn": {
  get() {
   return this[(this["server.bool"] ? "server" : "client") + ".fn"];
  },
 },
 "ownNode.fn": {
  get() {
   return (incomingNode) => {
    if (NODES.has(this)) {
     if (incomingNode)
      throw new Error(
       `Own Node Error: this row already owns a node.${this["trace.txt"]}"`
      );

     return NODES.get(this);
    }

    const node = incomingNode ?? document.createElement(this[".tag"]);

    NODES.set(this, node);

    node.row = this;
    node.onclick = this["onclick.fn"];
    node.onscroll = this["onscroll.fn"];
    node.onpointerdown = this["onpointerdown.fn"];

    if (this["tabindex.number"]) node.tabIndex = this["tabindex.number"];

    if (this["onresize.fn"] || this["onscroll.fn"]) {
     let timeout,
      scroll = !!this["onscroll.fn"];
     new ResizeObserver((e) => {
      if (scroll) {
       scroll = false;
       node.scrollTo(
        this[this[".name"] + "-scroll-x.number"] ?? 0,
        this[this[".name"] + "-scroll-y.number"] ?? 0
       );
      }

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
       this["onresize.fn"]?.(e[0]);
      }, 75);
     }).observe(node);
    }

    try {
     node.attachShadow({ mode: "open" });
    } catch (e) {
     throw new Error(
      `Own Node Error: this native tag can't support a shadow DOM.\n Node Tag: <${this[".tag"]}>.${this["trace.txt"]}\n -----\n Native Error: ${e.message}`
     );
    }

    return node;
   };
  },
 },
 "item-get.fn": {
  get() {
   return Object.getOwnPropertyDescriptor(HOST, this["item.rid"]).get;
  },
 },
 "grid-snap.fn": {
  get() {
   return (entry) => {
    const {
     borderBoxSize: [{ blockSize: height, inlineSize: width }],
    } = entry,
     tileSize = 14,
     trueTilesWide = width / tileSize,
     trueTilesHigh = height / tileSize,
     roundedTilesWide = Math.round(trueTilesWide),
     roundedTilesHigh = Math.round(trueTilesHigh),
     xFactor = trueTilesWide / roundedTilesWide,
     yFactor = trueTilesHigh / roundedTilesHigh,
     tileWidth = xFactor * tileSize,
     tileHeight = yFactor * tileSize;

    Object.assign(ROW, {
     "tile-width.number": tileWidth,
     "tile-height.number": tileHeight,
    });

    ROW["signal.fn"]();
   };
  },
 },
 "makeToggle.fn": {
  get() {
   return (name) => (clickEvent) => {
    if (name in (this._toggles ??= {})) {
     this._toggles[name]["remove.fn"]();
     delete this._toggles[name];
    } else {
     this._toggles[name] = Object.getPrototypeOf(HOST)["insert.fn"](name);
    }

    ROW["signal.fn"]();
   };
  },
 },
 "replaceWith.fn": {
  get() {
   return (rid, inputColumns) => {
    if (this === ROW) return this["insert.fn"](rid, inputColumns);
    const parent = Object.getPrototypeOf(this),
     row = parent["branch.fn"](rid, inputColumns),
     rowmap = this[".rowmap"];
    delete parent[".rowmap"][this[".rid"]];
    for (const rid in rowmap) this["donate.fn"](rowmap[rid], row, rid);
    return row;
   };
  },
 },
 "remove-item.fn": {
  get() {
   return (event) => {
    event.stopPropagation();

    const newItems = HOST["items.children"].filter(
     (c) => c !== this["item.rid"]
    ),
     commit = {
      "items.children": `data:text/children,${newItems.join(";")}`,
     };

    if (HOST["item.rid"] === this["item.rid"])
     commit["item.rid"] = `data:text/child,${newItems.at(-1) ?? ""}`;

    HOST["set.fn"](commit);
   };
  },
 },
 "select-item.fn": {
  get() {
   return () => {
    const newTabs = [...HOST["items.children"]],
     commit = { "item.rid": `data:text/child,${this["item.rid"]}` },
     index = HOST["items.children"].indexOf(this["item.rid"]);

    if (index === -1) {
     newTabs.push(this["item.rid"]);
     commit["items.children"] = `data:text/children,${newTabs.join(";")}`;
    }

    HOST["set.fn"](commit);
   };
  },
 },
 "literal-cell.fn": {
  get() {
   return (href) => {
    const commaIndex = href.indexOf(","),
     datum = href.slice(commaIndex + 1),
     header = href.slice(5, commaIndex).split(";"),
     type = header.shift() || "text/plain",
     body =
      type === "text/json"
       ? JSON.parse(datum)
       : type === "text/children"
        ? datum
         ? datum.split(";")
         : []
        : type === "text/child"
         ? datum || null
         : datum;

    return body;
   };
  },
 },
 "checkout-cell.fn": {
  get() {
   return (href) => {
    const cellType = href.startsWith("data:")
     ? "literal"
     : href.startsWith("https://")
      ? "absolute"
      : "relative";
    return this[cellType + "-cell.fn"](href);
   };
  },
 },
 "absolute-cell.fn": {
  get() {
   return (href) => {
    const subpaths = href.slice(8).split("/"),
     host =
      subpaths.shift() +
      (HOST[".rid"].split("?")[1]
       ? "?" + HOST[".rid"].split("?")[1]
       : ""),
     subname = subpaths.pop();

    if (!subname)
     throw new RangeError(
      `Error: absolute cell reference must include a file name. Get reference to entire row not yet supported.\n (adding ${href})${this["trace.txt"]}`
     );

    let row = ROW["branch.fn"](host);

    for (const subpath of subpaths) row = row["branch.fn"](subpath);

    return row[subname];
   };
  },
 },
 "relative-cell.fn": {
  get() {
   return (href) => {
    let levels = 1,
     subname = href;

    if (subname.startsWith("./")) {
     subname = subname.slice(2);
     levels = 0;
    } else
     while (subname.startsWith("../")) {
      subname = subname.slice(3);
      levels++;
     }

    let row = this;

    for (let i = 0; i < levels; i++) {
     row = Object.getPrototypeOf(row);
     if (row === null)
      throw new RangeError(
       `Error: relative reference to row which is beyond ROW ${href}.${this["trace.txt"]}`
      );
    }

    let result;
    result = row[subname];

    return result;
   };
  },
 },
 "scroll-name-x.fn": {
  get() {
   return () => {
    HOST["set.fn"]({
     [`${this[".name"]}-scroll-x.number`]: `data:text/json,${this["scroll-out-x.number"]}`,
    });
   };
  },
 },
 "scroll-name-y.fn": {
  get() {
   return () => {
    HOST["set.fn"]({
     [`${this[".name"]}-scroll-y.number`]: `data:text/json,${this["scroll-out-y.number"]}`,
    });
   };
  },
 },
 "checkout-commit.fn": {
  get() {
   return (commit, source) => {
    const description = {};

    for (const name in commit) {
     const href = commit[name],
      get = () => this["checkout-cell.fn"](href, get);

     get.meta = { href, source };

     description[name] = { get, configurable: true, enumerable: true };
    }

    Object.defineProperties(this, description);
   };
  },
 },
 "toggle-inspector.fn": {
  get() {
   return () => {
    HOST["set.fn"]({
     "inspector.bool": HOST["inspector.bool"] ? undefined : "true.bool",
    });
   };
  },
 },
 "toggle-start-menu.fn": {
  get() {
   return () =>
    HOST["set.fn"]({
     "start-menu.bool": HOST["start-menu.bool"] ? undefined : "true.bool",
    });
  },
 },
 "create-default-columns.fn": {
  get() {
   const rowmap = {},
    attributes = new Set(),
    emptyLayout = [],
    noChildren = [];

   return () => ({
    ".css": {
     get() {
      return null;
     },
     configurable: true,
    },
    ".tag": {
     get() {
      return "tag-";
     },
     configurable: true,
    },
    ".html": {
     get() {
      return null;
     },
     configurable: true,
    },
    ".rowmap": {
     get() {
      return rowmap;
     },
     configurable: true,
    },
    ".layout": {
     get() {
      return emptyLayout;
     },
     configurable: true,
    },
    ".children": {
     get() {
      return noChildren;
     },
     configurable: true,
    },
    "layout.css": {
     get() {
      return "";
     },
     configurable: true,
    },
    "onclick.fn": {
     get() {
      return null;
     },
     configurable: true,
    },
    "onresize.fn": {
     get() {
      return null;
     },
     configurable: true,
    },
    "tabindex.number": {
     get() {
      return null;
     },
     configurable: true,
    },
    "view.stylesheet": {
     get() {
      return null;
     },
     configurable: true,
    },
    "attributes.names": {
     get() {
      return attributes;
     },
     configurable: true,
    },
    "onpointerdown.fn": {
     get() {
      return null;
     },
     configurable: true,
    },
   });
  },
 },

 "os.css": {
  get() {
   return `:host { position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; height: 100%; margin: 0; display: grid; grid-template-rows: 1fr ${this["branch.fn"]("taskbar")["height.number"]
    }; font: 11px / 16px sans-serif; }`;
  },
 },
 "stat.css": {
  get() {
   return `:host {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    ${this["pill-icon-right.bool"] ? "text-align: right; " : ""}
    display: inline-block;
    line-height: 24px;
    padding: 3px;
    color: white;
    background: ${this["background.color"]};
    padding-${this["pill-icon-right.bool"] ? "left" : "right"}: 12px;
   }`;
  },
 },
 "title.css": {
  get() {
   return `:host { margin: 0; display: block; font-weight: 600; padding: 4px; text-transform: uppercase; position: sticky; top: 0; background: inherit }`;
  },
 },
 "theme.css": {
  get() {
   return `:host { --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; font: 13px var(--system-ui); margin: 0; padding: 0; display: grid; grid-template:  "${this["sidebar-open.bool"] ? "sbar " : ""
    }art" auto "${this["sidebar-open.bool"] ? "stat " : ""}stat" 32px / ${this["sidebar-open.bool"]
     ? `${this["inspector.bool"] ? "2" : ""}${this["sidebar-width.number"]
     }px `
     : ""
    }1fr;} ${this["sidebar-open.bool"] ? "sidebar- { grid-area: sbar }" : ""
    } status- { grid-area: stat } editor- { grid-area: art }`;
  },
 },
 "editor.css": {
  get() {
   return `:host{
    display: block;
    position: relative;
    overflow: hidden;
    background-color: ${this["background.color"]};
   }
   heading {
    grid-area: h;
   }
   `;
  },
 },
 "status.css": {
  get() {
   return `:host { display: flex; flex-flow: row nowrap; background: ${this["branch.fn"]("lighten-background")["light-background.color"]
    }}`;
  },
 },
 "address.css": {
  get() {
   return this["stat.css"] + this["flex-spacer.css"];
  },
 },
 "sidebar.css": {
  get() {
   return `:host { overflow: hidden; color: ${this["background.color"]
    }; background: ${this["light-background.color"]
    }; display: grid; grid-template: "b${this["inspector.bool"] ? " i" : ""
    }" 1fr / ${this["sidebar-width.number"]}px ${this["inspector.bool"] ? "1fr" : ""
    }; } side-menu { grid-area: b } ${this["inspector.bool"]
     ? `inspector- { grid-area: i; background: ${this["branch.fn"]("lighten-background")["light-background.color"]
     } }`
     : ""
    }`;
  },
 },
 "error404.css": {
  get() {
   return `:host { background: magenta }`;
  },
 },
 "tab-label.css": {
  get() {
   return `:host {
     cursor: pointer;
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
     min-height: 16px;
     line-height: 16px;
    }
    span {
     display: inline-block;
     width: 24px;
     height: 16px;
     font-size: 17px;
     line-height: 16px;
     text-align: center;
    }`;
  },
 },
 "portfolio.css": {
  get() {
   return `:host {
    --w: ${this["tile-width.number"] ?? 14}px;
    --h: ${this["tile-height.number"] ?? 14}px;
    box-sizing: border-box;
    gap: var(--h);
    padding: calc(var(--w) * 4.5) calc(var(--h) * 4.5);
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    background: url(data:image/png;base64,${this["blue-grid.png"]}), #999AAB;
    background-size: calc(var(--w) * 10) calc(var(--h) * 10);
    transition: background-size 0.2s;
    }
    :host::before {
     box-shadow: 2px 4px 10px #0005;
     border-radius: 14px;
     content: "";
     background: url(data:image/png;base64,${this["blue-grid.png"]}), white;
     background-size: inherit;
     position: absolute;
     left: calc(1.5 * var(--w));
     right: calc(1.5 * var(--w));
     top: calc(1.5 * var(--h));
     bottom: calc(1.5 * var(--h));
     }
     core-parts-,
     pilot-parts- {
      position: relative;
      width: auto;
      height: calc(var(--h) * 15);
      border-radius: 7px;
      overflow: hidden;
      }`;
  },
 },
 "start-menu.css": {
  get() {
   return `:host {
       position: relative;
       min-width: 164px;
       display: flex;
       flex-flow: column nowrap;
       position: absolute;
       left: 2px;
       bottom: calc(${this["branch.fn"]("taskbar")["height.number"]} - 4px);
       user-select: none;
       line-height: 18px;
       text-align: left;
       background: #c3c3c3;
       box-sizing: border-box;
       padding: 3px 3px 3px 24px;
       text-align: left;
     background: #c3c3c3;
     box-shadow: inset -1px -1px black, inset 1px 1px white, inset -2px -2px #7a7a7a, inset 2px 2px #dbdbdb
    }
    :host::after {
     pointer-events: none;
     display: block;
     content: "Pilot";
     writing-mode: tb-rl;
     transform: rotate(-180deg);
     line-height: 21px;
     font-size: 18px;
     font-weight: 900;
     color: #c3c3c3;
     padding-top: 4px;
     box-sizing: border-box;
     position: absolute;
     left: 3px;
     top: 3px;
     bottom: 3px;
     background: #7f7f7f;
     width: 21px
    }`;
  },
 },
 "background.css": {
  get() {
   return `:host { color: white; padding: 12px; background: ${this["background.color"]} }`;
  },
 },
 "editor-tab.css": {
  get() {
   return `:host {
    display: inline-block;
    height: 100%;
    padding: 6px;
    box-sizing: border-box;
    cursor: pointer;
    background: ${HOST["item.rid"] === this["item.rid"]
     ? this["branch.fn"]("lighten-background")["branch.fn"](
      "lighten-background"
     )["light-background.color"]
     : this["light-background.color"]
    };
   }`;
  },
 },
 "flex-spacer.css": {
  get() {
   return `:host { flex: 1 1 }`;
  },
 },
 "file-viewer.css": {
  get() {
   return `:host { background: tomato }`;
  },
 },
 "editor-tabs.css": {
  get() {
   return `:host {
    display: block;
    white-space: nowrap;
    overflow-y: auto;
    width: 100%;
    height: ${this["tab-height.number"]}px;
   }`;
  },
 },
 "cell-detail.css": {
  get() {
   return `:host {
    font-family: monospace;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    display: block;
    white-space: pre wrap;
   }
   :host::before {
    display: block;
    content: "${this["title.txt"]}";
    font-weight: 500;
   }`;
  },
 },
 "cell-details.css": {
  get() {
   return `:host{
    overflow-y: auto;
    display: block;
    height: calc(100% - ${this["tab-height.number"]}px);
    background: ${this["branch.fn"]("lighten-background")["branch.fn"](
    "lighten-background"
   )["light-background.color"]
    };
   }`;
  },
 },
 "start-button.css": {
  get() {
   return `:host { flex: 0 0; position: relative; width: 100%; box-sizing: border-box; height: 100%; display: flex; flex-flow: row nowrap; gap: 3px; border: none; font: bold 11px / 16px sans-serif; box-sizing: border-box; padding: ${this["start-menu.bool"] ? 4 : 3
    }px 4px 2px; text-align: left; background: #c3c3c3; box-shadow: ${this["start-menu.bool"]
     ? `  inset -1px -1px white,  inset 1px 1px black,  inset -2px -2px #dbdbdb,  inset 2px 2px #7a7a7a`
     : `  inset -1px -1px black,  inset 1px 1px white,  inset -2px -2px #7a7a7a,  inset 2px 2px #dbdbdb`
    };}:host(:focus)::after { border: 1px dotted black; content: ""; position: absolute; margin: 3px; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none;}icon- { width: 16px; height: 16px; background: url(data:image/png;base64,${this["icon.png"]
    }); background-size: 16px;}`;
  },
 },
 "menu-buttons.css": {
  get() {
   return `:host { display: flex; flex-flow: column nowrap; gap: 4px; padding: 4px; }`;
  },
 },
 "unicode-button.css": {
  get() {
   return `:host { cursor: pointer; border-radius: 4px; line-height: 32px; width: 32px; font-size: 32px; aspect-ratio: 1 / 1; height: 32px; text-align: center; } :host(:hover) { background: ${this["background.color"]}; color: white }`;
  },
 },
 "inspector-item.css": {
  get() {
   return `:host {
     cursor: pointer;
     text-overflow: ellipsis;
     white-space: nowrap;
     overflow: hidden;
     min-height: 24px;
     line-height: 24px;
    }
    span {
     display: inline-block;
     width: 24px;
     height: 24px;
     font-size: 17px;
     line-height: 24px;
     text-align: center;
    }
    :host${HOST["item.rid"] === this["item.rid"] ? "" : "(:hover)"} {
     color: white;
     background: ${this["background.color"]};
    }`;
  },
 },

 "os.children": {
  get() {
   return [
    "desktop",
    "taskbar",
    ...(this["windows.children"] ?? []),
    ...(this["start-menu.bool"] ? [`start-menu`] : []),
    ...(this["context-menu.bool"] ? [`context-menu`] : []),
   ];
  },
 },
 "tab.children": {
  get() {
   return ["tab-label", "remove-item"];
  },
 },
 "tray.children": {
  get() {
   return ["factory-reset", "fullscreen", "clock"];
  },
 },
 "zero.children": {
  get() {
   return [];
  },
 },
 "empty.children": {
  get() {
   return ["empty-icon", "welcome-link"];
  },
 },
 "editor.children": {
  get() {
   return ["editor-tabs", "cell-details"];
  },
 },
 "status.children": {
  get() {
   return ["memory", "address", "version"];
  },
 },
 "taskbar.children": {
  get() {
   return [
    "start-button",
    ...(this["apps.children"] ?? []),
    "flex-spacer",
    "tray",
   ];
  },
 },
 "sidebar.children": {
  get() {
   return ["side-menu", ...(this["inspector.bool"] ? ["inspector"] : [])];
  },
 },
 "portfolio.children": {
  get() {
   return ["core.parts", "pilot.parts"];
  },
 },
 "inspector.children": {
  get() {
   const descriptors = Object.getOwnPropertyDescriptors(HOST),
    descriptorEntries = Object.entries(descriptors),
    reducer = (rids, [name, { get }]) => {
     rids.push(`inspector-item?item.rid=data:text/child,${name}`);
     return rids;
    };

   return descriptorEntries.reduce(reducer, ["title"]);
  },
 },
 "start-menu.children": {
  get() {
   return [
    "locate",
    "relate",
    "debate",
    "horizontal-line-1",
    "Welcome",
    "horizontal-line-2",
    "save-computer",
    "restart-computer",
    "restart-server",
   ];
  },
 },
 "core.parts.children": {
  get() {
   return [
    "editor",
    "status",
    ...(this["sidebar-open.bool"] ? ["sidebar"] : []),
   ];
  },
 },
 "editor-tabs.children": {
  get() {
   return this["items.children"].map(
    (c) => `editor-tab?item.rid=data:text/child,${c}`
   );
  },
 },
 "menu-buttons.children": {
  get() {
   return ["inspector-button", "flex-spacer"];
  },
 },
 "cell-details.children": {
  get() {
   const tabRID = this["item.rid"];

   if (tabRID === "Welcome") return ["Welcome"];

   if (tabRID === null) return ["empty"];

   if (!(tabRID in this))
    throw new Error(
     `There is no file of the given tab row id. "${tabRID}".${this["trace.txt"]}`
    );

   return [
    "title",
    "cell-detail-getter",
    "cell-detail-href",
    "cell-detail-source",
    "cell-detail-value",
   ];
  },
 },
 "cell-detail-value.children": {
  get() {
   return ["file-viewer"];
  },
 },

 "grey1.test": {
  get() {
   return `sidebar insert grey1 grey2 1000`;
  },
 },
 "grey2.test": {
  get() {
   return `grey1 replaceWith grey2 lighten`;
  },
 },
 "sidebar.test": {
  get() {
   return ` insert hide-sidebar grey1`;
  },
 },
 "lighten.test": {
  get() {
   return ` insert next-version removed1`;
  },
 },
 "inspect.test": {
  get() {
   return `lighten insert open-inspector addressbarFocus`;
  },
 },
 "removed2.test": {
  get() {
   return `sidebarFocus remove  removed3 2000`;
  },
 },
 "removed1.test": {
  get() {
   return `grey2 remove  inspect`;
  },
 },
 "removed3.test": {
  get() {
   return `inspect remove  removed4 2000`;
  },
 },
 "removed4.test": {
  get() {
   return `sidebar remove  sidebar 2000`;
  },
 },
 "sidebarFocus.test": {
  get() {
   return `addressbarFocus replaceWith sidebar removed2`;
  },
 },
 "addressbarFocus.test": {
  get() {
   return `lighten replaceWith address sidebarFocus`;
  },
 },

 "item.html": {
  get() {
   return `<span>${this["item-icon.txt"]}</span>${this["item.rid"]}`;
  },
 },
 "title.html": {
  get() {
   return `${this["title.txt"] ?? "Untitled"}`;
  },
 },
 "index.html": {
  get() {
   return INDEX;
  },
 },
 "welcome.html": {
  get() {
   return `<h1>Welcome</h1>This is the welcome page.`;
  },
 },
 "error404.html": {
  get() {
   return `<b><i>404</i></b>`;
  },
 },
 "host-memory.html": {
  get() {
   return Math.trunc(this["host-memory.number"]) + " %";
  },
 },
 "file-viewer.html": {
  get() {
   const value = HOST[this["item.rid"]];
   const row = HOST["branch.fn"](this["item.rid"] + "?.node=null");
   const response = row[".response"];
   console.log({ row, response, rid: this["item.rid"] });
   return value;
  },
 },
 "cell-detail-href.html": {
  get() {
   return this["item-get.fn"]?.meta?.href ?? `N/A`;
  },
 },
 "cell-detail-getter.html": {
  get() {
   return this["item-get.fn"]?.toString() ?? `No getter.`;
  },
 },
 "cell-detail-source.html": {
  get() {
   return this["item-get.fn"]?.meta?.source ?? `No source found.`;
  },
 },

 "version.number": {
  get() {
   return 54 / 1000;
  },
 },
 "host-size.number": {
  get() {
   return HOST[".rid"].length;
  },
 },
 "tab-height.number": {
  get() {
   return 32;
  },
 },
 "host-memory.number": {
  get() {
   return ("https://" + HOST[".rid"]).length / 20.48;
  },
 },
 "scroll-out-x.number": {
  get() {
   return this[".node"].scrollLeft;
  },
 },
 "scroll-out-y.number": {
  get() {
   return this[".node"].scrollTop;
  },
 },
 "next-version.number": {
  get() {
   return Math.trunc(this["version.number"] * 1000 + 1) / 1000;
  },
 },
 "sidebar-width.number": {
  get() {
   return 42;
  },
 },
 "branch-length.number": {
  get() {
   let row = this,
    count = 0;
   while (row) {
    count++;
    row = Object.getPrototypeOf(row);
   }
   return count;
  },
 },

 "time.txt": {
  get() {
   setTimeout(() => this["signal.fn"](), 60005 - (Date.now() % 60000));
   return new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12",
   });
  },
 },
 "trace.txt": {
  get() {
   let row = this,
    trace = ``;
   while (row) {
    trace += `\n\tat ${row[".rid"]}`;
    row = Object.getPrototypeOf(row);
   }
   return trace;
  },
 },
 "prefix.txt": {
  get() {
   return (
    (this["force-refresh.bool"]
     ? "FORCED-"
     : this["original.bool"]
      ? "HTTPS-"
      : "") +
    (this["server.bool"] ? "SERVER-" : "CLIENT-") +
    BOOT_TIME
   );
  },
 },
 "item-icon.txt": {
  get() {
   return (
    {
     bool: "⏼",
     html: "📄",
     css: "📄",
     txt: "📄",
     color: "🌈",
     layout: "🍱",
     number: "ℕ",
     fn: "ƒ",
     rid: "⎋",
     test: "🧪",
     tag: "🏷",
     js: "📃",
     children: "🧒",
     commit: "🗃",
    }[this["item.extension"]] ?? "#"
   );
  },
 },

 "true.bool": {
  get() {
   return true;
  },
 },
 "false.bool": {
  get() {
   return false;
  },
 },
 "isFile.bool": {
  get() {
   return this[".name"] in this;
  },
 },
 "server.bool": {
  get() {
   return (
    typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope
   );
  },
 },

 "grey.color": {
  get() {
   return `#333445`;
  },
 },
 "grey2.color": {
  get() {
   return `#444444`;
  },
 },
 "background.color": {
  get() {
   return `tomato`;
  },
 },
 "light-background.color": {
  get() {
   return (
    "#" +
    this["background.color"]
     .match(/[^#]{2}/g)
     .map((s) =>
      Math.trunc((1 - (1 - parseInt(s, 16) / 255) * 0.5) * 255).toString(
       16
      )
     )
     .join("")
   );
  },
 },

 "status.layout": {
  get() {
   return ["status-layout"];
  },
 },
 "flex-spacer.layout": {
  get() {
   return ["flex-spacer-layout"];
  },
 },
 "menu-buttons.layout": {
  get() {
   return ["menu-buttons-layout"];
  },
 },

 "name.tag": {
  get() {
   return this[".name"].replaceAll(/[^a-zA-Z0-9]+/g, "-") + "-";
  },
 },
 "native.tag": {
  get() {
   if (!this[".name"] || !/^[a-zA-Z]+$/.test(this[".name"]))
    throw RangeError(
     `Error: name "${this[".name"]}" is not a native tagname.${this["trace.txt"]}`
    );
   return this[".name"];
  },
 },

 ".extension": {
  get() {
   return (this["isFile.bool"] && this[".name"].split(".").at(-1)) || null;
  },
 },
 "item.extension": {
  get() {
   return this["branch.fn"](this["item.rid"] + "?.node=null")[".extension"];
  },
 },

 ".name": {
  get() {
   return ``;
  },
 },
 "root.name": {
  get() {
   return "root";
  },
 },

 ".node": {
  get() {
   return this["ownNode.fn"]();
  },
 },

 ".path": {
  get() {
   let row = this,
    rids = [];
   while (row) {
    rids.unshift(row[".rid"]);
    row = Object.getPrototypeOf(row);
   }
   return rids;
  },
 },

 "null": {
  get() {
   return null;
  },
 },

 "host.rid": {
  get() {
   return HOST[".rid"];
  },
 },

 ".response": {
  get() {
   const encoder = new TextEncoder();
   let body, type;

   if (this["isFile.bool"]) {
    const extension = this[".extension"],
     string = this[this[".name"]];
    body = encoder.encode(string);
    type =
     {
      png: "image/png",
      js: "text/javascript; charset=UTF-8",
      css: "text/css; charset=UTF-8",
      html: "text/html; charset=UTF-8",
     }[extension] ?? "text/plain; charset=UTF-8";
    if (extension === "png") {
     const B = atob(string),
      k = B.length,
      A = new ArrayBuffer(k),
      I = new Uint8Array(A);
     for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i);
     body = new Blob([I], { type });
    }
   } else {
    body = encoder.encode(this["index.html"]);
    type = "text/html; charset=UTF-8";
   }
   return new Response(body, {
    headers: {
     "content-type": type,
     expires: "Sun, 20 Jul 1969 20:17:00 UTC",
     server: "kireji",
    },
   });
  },
 },

 "script.js": {
  get() {
   return `(C = {${Object.entries(C).map(
    ([name, { get }]) => `\n "${name}": {\n  ${get}\n }`
   )}\n})["boot.fn"].get()()`;
  },
 },

 "manifest.uri": {
  get() {
   return `https://${location.host}/manifest.json`;
  },
 },

 "blue-grid.png": {
  get() {
   return "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";
  },
 },

 "manifest.json": {
  get() {
   return JSON.stringify({
    name: HOST[".name"].split(".")[0],
    short_name: HOST[".name"],
    start_url: ".",
    display: "standalone",
    background_color: this["background.color"],
    theme_color: this["background.color"],
    description: "An expirimental app.",
    icons: [
     {
      src: "icon.png",
      sizes: "144x144",
      type: "image/png",
     },
    ],
   });
  },
 },

 "workingTree.search": {
  get() {
   const search = Object.entries(this["workingTree.commit"])
    .map((e) => e.join("="))
    .join("&");
   return search ? "?" + search : "";
  },
 },
})["boot.fn"].get()();
