const C = {
 get "host.request"() {
  const { host, searchParams } = new URL(location),
   request = {}
  for (const [k, v] of searchParams.entries() ?? []) {
   const href = v || "../" + k
   let expression
   if (href.startsWith(":")) {
    const commaIndex = href.indexOf(","),
     header = href.slice(1, commaIndex).split(";"),
     type = header.shift() || "text/plain"
    let datum = href.slice(commaIndex + 1)
    if (header.at(-1) === "base64") datum = atob(datum)
    if (type === "type/json") return `\n return ${datum}\n`
    if (type === "text/getter") return " " + datum + " "
    if (type === "text/expression") return " return " + datum + " "
    expression = `\`${datum}\``
   } else {
    expression = href.startsWith("https://") ? `this["host.head"].up().get("${href.slice(8)}")` : `this.get("${href}")`
   }
   const single = eval(`({ get "${k}"(){ return ${expression}} })`)
   getter = Object.getOwnPropertyDescriptor(single, k).get
   this.transfer(request, single)
   getter.uri = v
  }
  if (host === "example.com") return request
  this.transfer(request, {
   get "folder.name"() {
    return host
   }
  })
  return request
 },
 get ".uri"() {
  const map = Object.getOwnPropertyDescriptors(this[".request"])
  const folderName = this["folder.name"]
  let params = []
  let pathname = "/"
  for (const name in map) {
   if (name === "folder.name") continue
   let value = ""
   const trueValue = this[name]
   const parentHead = this.up()
   const defaultFolder = parentHead.commit(this["folder.name"])
   const defaultValue = defaultFolder[name]
   if (trueValue === defaultValue) continue
   switch (this.typeOf(name)) {
    case "number":
     value = `:text/json,${trueValue}`
     break
    case "txt":
    case "tag":
    case "css":
    case "htm":
    case "name":
     value = `:,${trueValue}`
     break
    case "attributes":
     value = `:text/json,${JSON.stringify(trueValue)}`
     break
    case "function":
     value = `:text/javascript;base64,${btoa(trueValue)}`
     break
    default:
     console.warn("unhandled type", this.typeOf(name), name)
   }
   params.push(`${name}=${value}`)
  }
  return `${folderName}${pathname}${params.length ? "?" + params.join("&") : ""}`
 },
 get typeOf() {
  return filename => (filename.includes(".") ? filename.split(".").at(-1) : "function")
 },
 get read() {
  return (name, callback, source) => {
   // console.log(`render => ${this["os-path.txt"]}${name}`)
   callback(this[name])
  }
 },
 get "script.uri"() {
  return `${location.origin}/script.js`
 },
 get "uri-safe.regex"() {
  return /^[a-zA-Z0-9-./;:_?=]*$/
 },
 get "file/"() {},
 get "client/"() {
  return {
   get start() {
    return () => {
     Promise.all([
      (async () => {
       const registration = await navigator.serviceWorker.register(this["script.uri"]),
        { waiting: w, installing: i, active: a } = registration
       if (!a)
        await new Promise(
         resolve => ((w ?? i).onstatechange = ({ target: t }) => (t.state === "activated" ? resolve(t) : 0))
        )
       return registration
      })(),
      new Promise(resolve => (onload = resolve))
     ]).then(([registration]) => {
      document.onvisibilitychange = () => document.hidden || registration.update()
      window.onfocus = () => registration.update()
      const manifest = document.querySelector('[rel="manifest"]'),
       original = !manifest.href,
       server = navigator.serviceWorker.controller,
       forceRefreshed = !server,
       begin = () => {
        if (this[".uri"] !== location.host + location.pathname + location.search)
         console.warn(
          `lossy encoding detected: \n${this[".uri"]}\n${location.host + location.pathname + location.search}`
         )
        if (original) manifest.href = this["manifest.uri"]
        this.render()

        const D = new Proxy(
         {
          a: "{{e}} {{d}}{{f}}",
          d: "{{b}}, {{c}}",
          b: "Hello",
          c: "world",
          e: "👋",
          f: "!"
         },
         {
          get(target, uri) {
           const [property, ...query] = uri.split("?"),
            options = Object.fromEntries(new URLSearchParams(query.join("?"))),
            operation = new Function(target[property])
           return operation(options)
          }
         }
        )

        ;["a?b=Hi", "a?b=Is that you&f=?", "c?b=123", "a?b=123&c=456", "a?e=😘&c=sexy"].map(uri => console.log(D[uri]))
       }
      let waiting
      navigator.serviceWorker.oncontrollerchange = () => {
       if (waiting) {
        waiting = false
        begin()
        return
       }

       location.reload()
      }
      if (forceRefreshed) {
       waiting = true
       registration.active.postMessage(1)
      } else begin()
     })
    }
   },
   get render() {
    return () => {
     let node = this[".node"]
     if (!node) {
      if (this === this["host.head"]) {
       node = document.body
      } else {
       const tag = this[".tag"]
       if (tag === "#text") node = document.createTextNode("")
       else node = document.createElement(tag)
      }
      this.adopt({
       get ".node"() {
        return node
       }
      })
      node.head = this
      if (this.onresize || this.onscroll) {
       let scroll = !!this.onscroll
       new ResizeObserver(e => {
        if (scroll) {
         scroll = false
         node.scrollTo(
          this[this["folder.name"] + "-scroll-x.number"] ?? 0,
          this[this["folder.name"] + "-scroll-y.number"] ?? 0
         )
        }
        let timeout = C["timeout.number"]
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => this.onresize?.(e[0]), 75)
        Object.defineProperty(C, "timeout.number", {
         get() {
          return timeout
         },
         configurable: true
        })
       }).observe(node)
      }
      return node
     }

     node.onclick = this.onclick
     node.onscroll = this.onscroll
     node.onpointerdown = this.onpointerdown

     for (const [name, value] of Object.entries(this[".attributes"] ?? {})) node.setAttribute(name, value)

     // debug only
     if (this["depth.number"] > 20) {
      console.warn("too deep", this["trace.txt"])
      return
     }

     if (node instanceof Text) {
      this.read(
       "value.txt",
       value => {
        if (node.nodeValue != value) node.nodeValue = value
       },
       "render"
      )
      return
     }

     this.read(
      "index.htm",
      index => {
       if (index !== undefined) {
        if (node.innerHTML != index) node.innerHTML = index
       } else {
        this.read(
         "index.requests",
         (incomingRequests = []) => {
          incomingRequests = [...incomingRequests]
          if (!(incomingRequests && Array.isArray(incomingRequests)))
           throw new Error(
            `Cannot use index.requests of type ${typeof incomingRequests}.\n${incomingRequests}${this["trace.txt"]}`
           )
          const { childNodes } = node,
           max = 1500

          let i = -1

          while (incomingRequests.length) {
           i++

           if (i >= max) throw "∞ loop"

           const incomingRequest = incomingRequests.shift(),
            incomingHead = this.commit(incomingRequest),
            incomingURI = incomingHead[".uri"],
            existingHead = childNodes[i]?.head,
            existingURI = existingHead?.[".uri"]

           if (!incomingRequest) throw new Error(`No name on node.\n\t[${incomingRequests}].${this["trace.txt"]}`)

           if (incomingURI === existingURI) continue

           const existingIndex = [...childNodes].findIndex((n, o) => o > i && n.head[".uri"] === incomingURI)

           if (existingIndex !== -1) {
            node.insertBefore(childNodes[existingIndex], childNodes[i])
            continue
           }

           const incomingNode = incomingHead[".node"]

           if (i !== -1 && i < childNodes.length) node.insertBefore(incomingNode, childNodes[i])
           else node.appendChild(incomingNode)

           incomingNode.callback?.()
          }

          while (childNodes[i + 1]) childNodes[i + 1].head.remove()

          this.forEach(head => {
           head.render()
          })
         },
         "render"
        )
       }
      },
      "render"
     )

     this.read(
      "style.css",
      style => {
       if (style !== undefined) {
        const query = this["query.txt"]
        this[".sheet"].replaceSync(
         this["style.css"].replaceAll(/:host\(([^)]+)\)/g, query + "$1").replaceAll(":host", query)
        )
       }
      },
      "render"
     )
    }
   },
   get setSize() {
    return entry => {
     const {
      borderBoxSize: [{ blockSize, inlineSize }]
     } = entry

     Object.defineProperties(this, {
      "resize-width.number": {
       get() {
        return inlineSize
       },
       configurable: true
      },
      "resize-height.number": {
       get() {
        return blockSize
       },
       configurable: true
      }
     })

     this.render()
    }
   },
   get scrollNameY() {
    return () => {
     const scroll = this[".node"].scrollTop
     this.goto({
      get [`${this["folder.name"]}-scroll-y.number`]() {
       return scroll
      }
     })
    }
   },
   get "default/"() {
    return this.inherit("default", {
     get onclick() {},
     get onresize() {},
     get onscroll() {},
     get onpointerdown() {},
     get ".attributes"() {},
     get "style.css"() {},
     get "index.htm"() {},
     get "index.requests"() {},
     get ".tag"() {
      let name = this["folder.name"].replaceAll(/[^a-zA-Z0-9]+/g, "-")
      if (!name.includes("-")) name += "-"
      return name
     },
     get ".sheet"() {
      const stylesheet = new CSSStyleSheet()

      this.adopt({
       get ".sheet"() {
        return stylesheet
       }
      })

      stylesheet.head = this
      this[".sheets"].push(stylesheet)
      return stylesheet
     }
    })
   },
   get "size/"() {
    return {
     get "index.htm"() {
      return this["host.head"][".uri"].length
     },
     get "style.css"() {
      return this["stat.css"]
     }
    }
   },
   get "tray/"() {
    return {
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "factory-reset"
        }
       },
       {
        get "folder.name"() {
         return "fullscreen"
        }
       },
       {
        get "folder.name"() {
         return "clock"
        }
       }
      ]
     },
     get "style.css"() {
      return `:host {
 position: relative;
 display: flex;
 flex-flow: row;
 gap: 3px;
 box-sizing: border-box;
 height: 100%;
 margin: 0;
 user-select: none;
 padding: 3px 4px 3px;
 text-align: left;
 background: #c3c3c3;
 box-shadow: inset -1px -1px white, inset 1px 1px #7a7a7a;
}`
     }
    }
   },
   get "line/"() {
    return {
     get "style.css"() {
      return `:host {
       display: flex;
       flex-flow: row;
       font-family: monospace;
       overflow: hidden;
       background: #333445;
      }
      :host(:first-child) {
       border-top-left-radius: 8px;
       border-top-right-radius: 8px;
      }
      :host(:last-child) {
       border-bottom-left-radius: 8px;
       border-bottom-right-radius: 8px;
      }
      :host(:first-child) > * {
       padding-top: 0.5ch;
      }
      :host(:last-child) > * {
       padding-bottom: 0.5ch;
      }`
     },
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "line-number"
        }
       },
       {
        get "folder.name"() {
         return "line-content"
        }
       }
      ]
     },
     get "line-content/"() {
      return {
       get "index.htm"() {},
       get "style.css"() {
        return `:host {
   white-space: pre;
   padding-left: 0.5ch;
  }`
       }
      }
     },
     get "line-number/"() {
      return {
       get "index.htm"() {
        return `NaN`
       },
       get "style.css"() {
        return `:host {
   flex: 0 0 5ch;
   text-align: right;
   padding-right: 0.5ch;
   background: #474857;
  }`
       }
      }
     }
    }
   },
   get "text/"() {
    return {
     get ".tag"() {
      return `#text`
     }
    }
   },
   get "clock/"() {
    return {
     get "index.htm"() {
      setTimeout(() => this.render(), 60005 - (Date.now() % 60000))
      return new Date().toLocaleString("en-US", {
       hour: "numeric",
       minute: "numeric",
       hourCycle: "h12"
      })
     }
    }
   },
   get "empty/"() {
    return {
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "empty-icon"
        }
       }
      ]
     },
     get onresize() {
      return this.setSize
     },
     get "style.css"() {
      return `:host {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 font-size: ${this["resize-width.number"]}px;
 line-height: ${this["resize-height.number"]}px;
 text-align: center;
 background: ${this["theme.color"]};
 opacity: 25%;
}`
     }
    }
   },
   get "blank/"() {
    return {}
   },
   get "title/"() {
    return {
     get "index.htm"() {
      return this["title.htm"]
     },
     get "style.css"() {
      return this["title.css"]
     }
    }
   },
   get "shelf/"() {
    return {
     get "index.requests"() {
      return [
       ...(this["path.txt"] !== "./"
        ? [
           {
            get "folder.name"() {
             return "back-button"
            }
           },
           {
            get "folder.name"() {
             return "title"
            },
            get "title.txt"() {
             return this["path.txt"]
            },
            get "title.css"() {
             return `:host {
              background: transparent;
              line-height: ${this["height.number"] - 2 * this["padding.number"]}px;
              display: block;
              font-weight: 200;
              font-size: 24px;
             }`
            }
           }
          ]
        : []),
       {
        get "folder.name"() {
         return "flex-spacer"
        }
       },
       {
        get "index.htm"() {
         return `⟳`
        },
        get "style.css"() {
         return this["unicode-button.css"]
        },
        get onclick() {
         return () => {
          location = location.origin
         }
        },
        get "folder.name"() {
         return "reset-button"
        }
       }
      ]
     },
     get "style.css"() {
      return `:host {
 display: flex;
 flex-flow: row;
 gap: 4px;
 padding: ${this["padding.number"]}px;
 background: ${this.screenTheme()};
}`
     },
     get "padding.number"() {
      return 4
     },
     get "height.number"() {
      return 42
     }
    }
   },
   get "search/"() {
    return {
     get ".tag"() {
      return `search`
     },
     get "style.css"() {
      return `:host {
       position: relative;
       font-size: 16px;
      }
       
      :host::before {
       content: "🔍";
       position: absolute;
       left: 20px;
       top: 0;
       bottom: 0;
       width: 32px;
       line-height: 32px;
      }`
     },
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "blank"
        },
        get ".tag"() {
         return `input`
        },
        get ".attributes"() {
         return { type: "search", placeholder: "Search parts" }
        },
        get "style.css"() {
         return `:host {
    padding-left: 48px;
    padding-right: 12px;
    background: #5b5c6a;
    border-radius: 16px;
    height: 32px;
    border: none;
    color: white;
   }`
        },
        get "index.htm"() {
         return `Search`
        }
       }
      ]
     }
    }
   },
   get "header/"() {
    return {
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "text"
        },
        get "value.txt"() {
         return "Parts"
        }
       },
       {
        get "folder.name"() {
         return "search"
        }
       },
       {
        get "folder.name"() {
         return "add-part"
        }
       }
      ]
     },
     get "style.css"() {
      return `:host {
       justify-content: space-between;
       display: flex;
       flex-flow: row;
       margin: 16px;
       flex: 0 0 min-content;
      }`
     },
     get ".tag"() {
      return `h1`
     },
     get "title.css"() {
      return `:host {
 font-size: 32px;
 font-weight: 500;
 line-height: 32px;
}`
     }
    }
   },
   get "status/"() {
    return {
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "address-usage"
        }
       },
       {
        get "folder.name"() {
         return "address"
        }
       },
       {
        get "folder.name"() {
         return "version"
        }
       }
      ]
     },
     get "style.css"() {
      return `:host {
 display: flex;
 flex-flow: row;
 background: ${this.screenTheme(0.2)};
}`
     }
    }
   },
   get "version/"() {
    return {
     get "index.htm"() {
      return 62 / 1000
     },
     get "pill-icon-right.bool"() {
      return this["true.bool"]
     },
     get "style.css"() {
      return this["stat.css"]
     }
    }
   },
   get "taskbar/"() {
    return {
     get "height.number"() {
      return `28px`
     },
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "start-button"
        }
       },
       ...(this["tasks.requests"] ?? []),
       {
        get "folder.name"() {
         return "flex-spacer"
        }
       },
       {
        get "folder.name"() {
         return "tray"
        }
       }
      ]
     },
     get "style.css"() {
      return `:host { position: relative; width: 100 %; box - sizing: border - box; height: 100 %; margin: 0; display: flex; flex - flow: row; gap: 3px; height: 100 %; padding: 4px 2px 2px; background: #c3c3c3; box - shadow: inset 0 1px #c3c3c3, inset 0 2px white; } `
     }
    }
   },
   get "desktop/"() {
    return {
     get "style.css"() {
      return `:host{ background: #377f7f } `
     }
    }
   },
   get "error404/"() {
    return {
     get "index.htm"() {
      return `404`
     },
     get "style.css"() {
      return `:host {
 background: tomato;
 box-sizing: border-box;
 border: 0.5px dashed #821;
}`
     }
    }
   },
   get "add-part/"() {
    return {
     get ".tag"() {
      return `button`
     },
     get "index.htm"() {
      return `＋ Create Part`
     },
     get "style.css"() {
      return `:host {
 border-radius: 16px;
 line-height: 0px;
 vertical-align: baseline;
 display: inline-block;
 background: #3a4;
 height: 0px;
 padding: 16px;
 border: none;
}`
     }
    }
   },
   get "part-list/"() {
    return {
     get "style.css"() {
      return `:host {
       padding: 16px 48px;
       display: flex;
       flex-flow: column;
       background: #eaeaec;
       color: #333445;
       overflow-y: auto;
       font-size: 17px;
       font-weight: 200;
      }`
     },
     get "index.requests"() {
      return Object.keys(C.get(this["path.txt"])[".properties"]).map(name => ({
       get "folder.name"() {
        return "part-list-item"
       },
       get "part.name"() {
        return name
       }
      }))
     },
     get onscroll() {
      return this.scrollNameY
     }
    }
   },
   get "empty-icon/"() {
    return {
     get "index.htm"() {
      return `∅`
     }
    }
   },
   get "start-menu/"() {
    return {
     get "style.css"() {
      return `:host {
       position: relative;
       min-width: 164px;
       display: flex;
       flex-flow: column;
       position: absolute;
       left: 2px;
       bottom: ${this.get("taskbar/height.number") - 4}px;
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
      }`
     },
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "locate"
        }
       },
       {
        get "folder.name"() {
         return "relate"
        }
       },
       {
        get "folder.name"() {
         return "debate"
        }
       },
       {
        get "folder.name"() {
         return "horizontal-line-1"
        }
       },
       {
        get "folder.name"() {
         return "welcome"
        }
       },
       {
        get "folder.name"() {
         return "horizontal-line-2"
        }
       },
       {
        get "folder.name"() {
         return "save-computer"
        }
       },
       {
        get "folder.name"() {
         return "restart-computer"
        }
       },
       {
        get "folder.name"() {
         return "restart-server"
        }
       }
      ]
     }
    }
   },
   get "test-canvas/"() {
    return {
     get "style.css"() {
      const { width, height } = this["size.json"] ?? {},
       standardHeight = Math.min(256, height),
       aspect = width / height,
       scale = standardHeight / height

      return `:host {
 box-sizing: border-box;
 background: ${this.screenTheme(0.6)};
 position: absolute;
 width: ${width}px;
 height: ${height}px;
 transform-origin: top left;
 top: 23px;
 transform: scale(${scale});
}`
     },
     get ".attributes"() {
      return { id: this["title.txt"] }
     }
    }
   },
   get "flex-spacer/"() {
    return {
     get "style.css"() {
      return `:host {
 flex: 1 1
}`
     }
    }
   },
   get "back-button/"() {
    return {
     get "index.htm"() {
      return `‹`
     },
     get "style.css"() {
      return this["unicode-button.css"]
     },
     get onclick() {
      return () => {
       const computedPath = this["path.txt"].split("/").slice(0, -2).join("/") + "/"
       this.goto({
        get "path.txt"() {
         return computedPath
        }
       })
      }
     }
    }
   },
   get "address/"() {
    return {
     get "index.htm"() {
      return this["host.head"][".uri"]
     },
     get "style.css"() {
      return this["stat.css"] + `:host { flex: 1 1 }`
     }
    }
   },
   get "mini-browser/"() {
    return {
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "title"
        }
       },
       {
        get "folder.name"() {
         return "test-canvas"
        },
        get "index.requests"() {
         return this["input.requests"]
        }
       }
      ]
     },
     get "style.css"() {
      const { width, height } = this["size.json"] ?? {},
       standardHeight = Math.min(256, height),
       aspect = width / height,
       scaledWidth = standardHeight * aspect

      return `:host {
 border-radius: 8px;
 display: flex;
 flex-flow: column;
 position: relative;
 overflow: clip;
 box-shadow:
  inset 0 0 0 1px ${this["theme.color"]},
  2px 4px 9px -2px ${this["theme.color"]};
 flex: 0 0 ${scaledWidth}px;
 height: ${standardHeight + 23}px;
}`
     },
     get "size.json"() {
      return { width: 640, height: 480 }
     }
    }
   },
   get "start-button/"() {
    return {
     get "style.css"() {
      const colors1 = ["white", "black"],
       colors2 = ["#dbdbdb", "#7a7a7a"]
      if (this["start-menu.bool"]) {
       colors1.reverse()
       colors2.reverse()
      }
      return `:host {
 flex: 0 0;
 position: relative;
 width: 100%;
 box-sizing: border-box;
 height: 100%;
 display: flex;
 flex-flow: row;
 gap: 3px;
 border: none;
 font: bold 11px / 16px sans-serif;
 box-sizing: border-box;
 padding: ${this["start-menu.bool"] ? 4 : 3}px 4px 2px;
 text-align: left;
 background: #c3c3c3;
 box-shadow:
  inset -1px -1px ${colors1.pop()},
  inset 1px 1px ${colors1.pop()},
  inset -2px -2px ${colors2.pop()},
  inset 2px 2px ${colors2.pop()};
}

:host(:focus)::after {
 border: 1px dotted black;
 content: "";
 position: absolute;
 margin: 3px;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
}

:host > icon- {
 width: 16px;
 height: 16px;
 background: url(data:image/png;base64,${this["icon.png"]});
 background-size: 16px;
}`
     },
     get "index.htm"() {
      return `<icon-></icon->Start`
     },
     get onpointerdown() {
      const toggledBool = !this["host.head"]["start-menu.bool"]
      return () =>
       this.goto({
        get "start-menu.bool"() {
         return toggledBool
        }
       })
     },
     get ".attributes"() {
      return { tabindex: 1 }
     }
    }
   },
   get "part-list-item/"() {
    return {
     get "index.requests"() {
      return [
       {
        get "folder.name"() {
         return "text"
        },
        get "value.txt"() {
         return this["part.name"]
        }
       },
       {
        get "folder.name"() {
         return "flex-spacer"
        }
       },
       {
        get "folder.name"() {
         return "text"
        },
        get "value.txt"() {
         const partname = this["part.name"]
         return Object.getOwnPropertyDescriptor(C.get(this["path.txt"]), partname).get.toString().length
        }
       }
      ]
     },
     get onclick() {
      return () => {
       const partName = this["part.name"]
       if (partName.endsWith("/")) {
        const computedPath = this["path.txt"] + partName
        this.goto({
         get "path.txt"() {
          return computedPath
         }
        })
       } else {
        console.warn("open " + partName + " now")
       }
      }
     },
     get "style.css"() {
      return `:host {
       position: relative;
       cursor: pointer;
       text-overflow: ellipsis;
       white-space: nowrap;
       overflow: hidden;
       line-height: 24px;
       box-sizing: border-box;
       justify-content: space-between;
       border-radius: 8px;
       flex: 0 0 40px;
       display: flex;
       padding: 8px;
      }
      :host(:hover) {
       background: ${this.screenTheme(0.8)};
      }`
     }
    }
   },
   get "address-usage/"() {
    return {
     get "index.htm"() {
      return Math.trunc(("https://" + this["host.head"][".uri"]).length / 20.48) + " %"
     },
     get "style.css"() {
      return this["stat.css"]
     }
    }
   },
   get "stat.css"() {
    return `:host {
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
   ${this["pill-icon-right.bool"] ? "text-align: right;" : ""}
   display: inline-block;
   line-height: 24px;
   padding: 3px;
   background: ${this["theme.color"]};
   padding-${this["pill-icon-right.bool"] ? "left" : "right"}: 12px;
  }`
   },
   get "query.txt"() {
    let hadHost = false
    const css = this.reduceChain(
     (t, head, i) => (
      hadHost
       ? t
       : t.unshift(
          head === head["host.head"]
           ? ((hadHost = true), head[".node"].hasAttribute("id") ? "#" + head[".node"].getAttribute("id") : "body")
           : head[".tag"]
         ),
      t
     ),
     []
    ).join(" > ")
    return css
   },
   get "title.htm"() {
    return `${this["title.txt"] ?? "Untitled"}`
   },
   get "title.css"() {
    return `:host {
   margin: 0;
   display: block;
   font-weight: 600;
   padding: 4px;
   text-transform: uppercase;
   background: ${this["theme.color"]};
  }`
   },
   get "theme.color"() {
    return `#333445`
   },
   get ".root"() {
    return document
   },
   get "manifest.uri"() {
    return `${location.origin}/manifest.json`
   },
   get ".sheets"() {
    return this[".root"].adoptedStyleSheets
   },
   get "unicode-button.css"() {
    return `:host {
   cursor: pointer;
   border-radius: 4px;
   line-height: 32px;
   width: 32px;
   font-size: 32px;
   aspect-ratio: 1 / 1;
   height: 32px;
   text-align: center;
  }

  :host(:hover) {
   background: ${this.screenTheme(0.2)};
  }`
   }
  }
 },
 get "server/"() {
  return {
   get start() {
    return () => {
     oninstall = () => globalThis.skipWaiting()
     onactivate = onmessage = () => clients.claim()
     onfetch = e => {
      const { host, pathname, search } = new URL(e.request.url),
       path = pathname.slice(1).split("/"),
       filename = path.pop()
      if (host !== this["folder.name"])
       throw new RangeError(`Cross origin fetch not supported yet.\n Fetching ${e.request.url}.${this["trace.txt"]}`)
      e.respondWith(this.get((path.length ? path.join("/") + "/" : "./") + search).respond(filename))
     }
    }
   },
   get respond() {
    return filename => {
     const encoder = new TextEncoder()
     let body, type

     if (filename in this) {
      const extension = this.typeOf(filename),
       string = this[filename]
      body = encoder.encode(string)
      type =
       {
        ico: "image/ico",
        png: "image/png",
        js: "text/javascript; charset=UTF-8",
        css: "text/css; charset=UTF-8",
        htm: "text/html; charset=UTF-8",
        html: "text/html; charset=UTF-8"
       }[extension] ?? "text/plain; charset=UTF-8"
      if (extension === "png" || extension === "ico") {
       const B = atob(string),
        k = B.length,
        A = new ArrayBuffer(k),
        I = new Uint8Array(A)
       for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i)
       body = new Blob([I], { type })
      }
     } else {
      body = encoder.encode(this["bootstrap.htm"])
      type = "text/html; charset=UTF-8"
     }
     return new Response(body, {
      headers: {
       "content-type": type,
       expires: "Sun, 20 Jul 1969 20:17:00 UTC",
       server: "kireji"
      }
     })
    }
   },
   get "script.js"() {
    const prefix = "const C = {\n ",
     suffix = "\n}\nC.start()\n",
     inside = Object.values(C[".properties"])
      .map(_ => _.get)
      .join(",\n ")

    return prefix + inside + suffix
   },
   get "manifest.json"() {
    return JSON.stringify({
     name: this["folder.name"].split(".")[0],
     short_name: this["folder.name"],
     start_url: ".",
     display: "standalone",
     background_color: this["theme.color"],
     theme_color: this["theme.color"],
     description: "An expirimental app.",
     icons: [
      {
       src: "icon.png",
       sizes: "144x144",
       type: "image/png"
      }
     ]
    })
   },
   get "favicon.ico"() {
    return this["icon.png"]
   },
   get "bootstrap.htm"() {
    return `<!DOCTYPE html>\n<!-- LOCAL -->\n<meta name="robots" content="noindex">\n<link rel="manifest">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<style>\n html,\n body {\n  overscroll-behavior-y: contain !important;\n  overflow: clip;\n  height: 100%;\n  margin: 0;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n }\n</style>\n<script src="${this["script.uri"]}"></script>`
   }
  }
 },
 get "core.parts/"() {
  return {
   get "index.requests"() {
    return [
     {
      get "folder.name"() {
       return "header"
      }
     },
     {
      get "folder.name"() {
       return "shelf"
      }
     },
     {
      get "folder.name"() {
       return "part-list"
      }
     },
     {
      get "folder.name"() {
       return "status"
      }
     }
    ]
   },
   get "style.css"() {
    return `:host {
     --system-ui:
     system-ui,
     "Segoe UI",
     Roboto,
     Helvetica,
     Arial,
     sans-serif,
     "Apple Color Emoji",
     "Segoe UI Emoji",
     "Segoe UI Symbol";
     background: ${this["theme.color"]};
     font: 13px var(--system-ui);
     margin: 0;
     overflow: hidden;
     padding: 0;
     display: grid;
     color: white;
     grid-template:
     "header" auto
     "shelf" ${this[".node"].querySelector(`shelf-`).head["height.number"]}px
      "main" 1fr
      "status" 32px / 100%;
    }

    :host > h1 {
     grid-area: header;
    }

    :host > shelf- {
     grid-area: shelf;
    }

    :host > part-list {
     grid-area: main;
    }

    :host > status- {
     grid-area: status;
    }`
   },
   get "part-list-scroll-y.number"() {
    return 0
   },
   get "path.txt"() {
    return "./"
   }
  }
 },
 get "pilot.parts/"() {
  return {
   get "style.css"() {
    return `:host {
position: fixed;
top: 0;
left: 0;
width: 100%;
box-sizing: border-box;
height: 100%;
margin: 0;
display: grid;
grid-template-rows: 1fr ${this.get("taskbar/height.number")};
font: 11px / 16px sans-serif;
}`
   },
   get "index.requests"() {
    return [
     {
      get "folder.name"() {
       return "desktop"
      }
     },
     {
      get "folder.name"() {
       return "taskbar"
      }
     },
     ...(this["windows.requests"] ?? []),
     ...(this["start-menu.bool"]
      ? [
         {
          get "folder.name"() {
           return "start-menu"
          }
         }
        ]
      : []),
     ...(this["context-menu.bool"]
      ? [
         {
          get "folder.name"() {
           return "context-menu"
          }
         }
        ]
      : [])
    ]
   },
   get "start-menu.bool"() {
    return this["false.bool"]
   }
  }
 },
 get "ejaugust.com/"() {
  return {
   get "index.requests"() {
    return [
     {
      get "folder.name"() {
       return "core.parts"
      },
      get "path.txt"() {
       return this.up()["core-path.txt"]
      },
      get "part-list-scroll-y.number"() {
       return this.up()["part-list-scroll-y.number"]
      }
     },
     {
      get "folder.name"() {
       return "pilot.requests"
      }
     },
     {
      get "folder.name"() {
       return "orenjinari.com"
      }
     }
    ]
   },
   get "style.css"() {
    return `:host {
     --w: ${this["tile-width.number"] ?? 14}px;
     --h: ${this["tile-height.number"] ?? 14}px;
     box-sizing: border-box;
     gap: var(--h);
     padding: calc(var(--w) * 4.5) calc(var(--h) * 4.5);
     display: flex;
     flex-flow: row;
     align-items: stretch;
     background: url(data:image/png;base64,${this["blue-grid.png"]}), #999AAB;
     background-size: calc(var(--w) * 10) calc(var(--h) * 10);
     transition: background-size 0.2s;
     transform: scale(50%)
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
    :host > core-parts,
    :host > pilot-parts,
    :host > orenjinari-com {
     position: relative;
     width: calc(var(--w) * 40);
     height: calc(var(--h) * 30);
     border-radius: 7px;
     overflow: hidden;
    }`
   },
   get "blue-grid.png"() {
    return "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"
   },
   get onresize() {
    return entry => {
     const {
       borderBoxSize: [{ blockSize: height, inlineSize: width }]
      } = entry,
      tileSize = 14,
      trueTilesWide = width / tileSize,
      trueTilesHigh = height / tileSize,
      roundedTilesWide = Math.round(trueTilesWide),
      roundedTilesHigh = Math.round(trueTilesHigh),
      xFactor = trueTilesWide / roundedTilesWide,
      yFactor = trueTilesHigh / roundedTilesHigh,
      tileWidth = xFactor * tileSize,
      tileHeight = yFactor * tileSize

     Object.defineProperties(this, {
      "tile-width.number": {
       get() {
        return tileWidth
       },
       configurable: true
      },
      "tile-height.number": {
       get() {
        return tileHeight
       },
       configurable: true
      }
     })

     this.render()
    }
   },
   get "core-path.txt"() {
    return `ejaugust.com`
   },
   get "part-list-scroll-y.number"() {
    return 0
   }
  }
 },
 get "orenjinari.com/"() {
  return {
   get "index.requests"() {
    return [
     {
      get "folder.name"() {
       return "blank"
      },
      get ".tag"() {
       return "h1"
      },
      get "index.htm"() {
       return `404`
      },
      get "style.css"() {
       return `:host { text-align: center }`
      }
     },
     {
      get "folder.name"() {
       return "blank"
      },
      get ".tag"() {
       return "h4"
      },
      get "index.htm"() {
       return `Page not found here...perhaps elsewhere`
      },
      get "style.css"() {
       return `:host { text-align: center }`
      }
     },
     {
      get "folder.name"() {
       return "nari-artwork"
      },
      get "style.css"() {
       return `:host {
        background-size: contain;
        object-fit: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-image:
         url(data:image/png;base64,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);
        }`
      }
     },
     {
      get "folder.name"() {
       return "nari-recent"
      },
      get "index.number"() {
       return 0
      }
     },
     {
      get "folder.name"() {
       return "nari-recent"
      },
      get "index.number"() {
       return 1
      }
     },
     {
      get "folder.name"() {
       return "nari-recent"
      },
      get "index.number"() {
       return 2
      }
     }
    ]
   },
   get "style.css"() {
    return `:host {
     font-family: "Trebuchet MS", Helvetica, sans-serif;
     display: grid;
     grid-template:
     "sp1 sp1 sp1 sp1 sp1" 1fr
     "sp2 hh1 hh1 hh1 sp3" max(min(6%, 48px), 36px)
     "sp2 hh4 hh4 hh4 sp3" max(min(4%, 32px), 24px)
     "sp2 art art art sp3" max(min(70%, 300px), 128px)
     "sp2 re1 re2 re3 sp3" max(min(10%, 96px), 36px)
     "sp2 sp4 sp4 sp4 sp3" 1.5fr / 1fr max(min(25%, 360px), 64px)  max(min(25%, 360px), 64px)  max(min(25%, 360px), 64px) 1fr;
     background: #dadbca;
     width: 100%;
     height: 100%;
     pad: 24px;
    }

    h1 {
     grid-area: hh1;
    }

    h4 {
     grid-area: hh4;
    }

    nari-artwork {
     grid-area: art;
    }

    nari-recent:nth-of-type(1) {
     grid-area: re1;
    }

    nari-recent:nth-of-type(2) {
     grid-area: re2;
    }

    nari-recent:nth-of-type(3) {
     grid-area: re3;
    }`
   },
   get "portfolio-scroll-y.number"() {
    return 0
   }
  }
 },
 get "dev.core.parts/"() {
  return this["core.parts/"]
 },
 get "dev.pilot.parts/"() {
  return this["pilot.parts/"]
 },
 get "dev.ejaugust.com/"() {
  return this["ejaugust.com/"]
 },
 get "dev.orenjinari.com/"() {
  return this["orenjinari.com/"]
 },
 get up() {
  return (n = 1) => {
   if (isNaN(n) || n <= 0) throw new RangeError(`up(n) requires n to be a natural number, not ${n}.`)
   let head = this
   while (n--) {
    head = Object.getPrototypeOf(head)
   }
   return head
  }
 },
 get get() {
  return path => {
   if (!path) throw new RangeError(`get(path) - path cannot be falsish.`)
   if (path.includes("#") || path.includes("?")) throw new RangeError("get(path) - path cannot include slug.")
   let request
   if (path === "./") return request ? this.fork(request) : this
   let head = this
   if (path.startsWith("https://")) {
    head = C
    path = path.slice(8)
   } else {
    const n = (path.match(/(?<=^(\.\.\/)*)\.\.\//g) ?? []).length
    if (n) {
     head = head.up(n)
     path = path.slice(n * 3)
    }
   }
   const folders = path.split("/"),
    filename = folders.pop()
   while (folders.length) {
    const name = folders.shift()
    head = head.into(name)
   }
   if (request) head = head.fork(request)
   return filename ? head[filename] : head
  }
 },
 get fork() {
  return request => this.up().commit(this.transfer({}, this[".request"], request))
 },
 get into() {
  return name => {
   if (!name) throw new RangeError(`into() called with falsish name.`)
   return this.commit({
    get "folder.name"() {
     return name
    }
   })
  }
 },
 get start() {
  return () => {
   Object.setPrototypeOf(this, null)
   const host = this.commit(
    {
     get "folder.name"() {
      return self instanceof (self.Window ?? class {}) ? "client" : "server"
     }
    },
    this["host.request"]
   ).adopt({
    get "host.head"() {
     return host
    },
    get goto() {
     return request => {
      console.warn("who renders " + Object.keys(request).join(" or ") + "?")
      host.adopt(host.transfer(host[".request"], request))
      //host.render()
      if (history._timeout) clearTimeout(history._timeout)
      history._timeout = setTimeout(() => history.replaceState({}, null, `https://` + host[".uri"]), 120)
     }
    }
   })
   host.start()
  }
 },
 get adopt() {
  return (...X) => {
   for (const x of X) {
    const a = (typeof x === "string" ? this[`${x}/`] : x) ?? this[`error404/`]
    if (!a)
     throw new RangeError(
      (typeof x === "string" ? `404: ${x}/` : `undefined argument passed to adopt.`) + this["trace.txt"]
     )
    this.transfer(this, a)
   }
   return this
  }
 },
 get commit() {
  return (...requests) => {
   let head = this
   for (const request of requests) {
    head = Object.create(head)
    if ("default/" in head) head.adopt("default", request)
    else head.adopt(request)
    const folder = head[head["folder.name"] + "/"]
    if (folder) {
     head.adopt(folder, request)
     if ("default/" in folder) head.adopt("default", request, folder, request)
    }
    head.adopt({
     get ".request"() {
      return request
     }
    })
   }
   return head
  }
 },
 get remove() {
  return () => {
   this.forEach(head => head.remove())
   const { ".sheet": sheet, ".sheets": sheets } = this,
    index = sheets.findIndex(_ => _ === sheet)
   sheets.splice(index, 1)
   this[".node"].remove()
  }
 },
 get inherit() {
  return (name, ...B) => this.transfer({}, this.up()[`${name}/`] ?? {}, ...B)
 },
 get forEach() {
  return callback => {
   for (const node of [...this[".node"].childNodes]) if (node.head) callback(node.head)
  }
 },
 get transfer() {
  return (a, ...B) => {
   while (B.length) Object.defineProperties(a, Object.getOwnPropertyDescriptors(B.shift()))
   return a
  }
 },
 get forChain() {
  return callback => {
   let head = this,
    index = 0

   while (head) {
    callback(head, index++)
    head = head.up()
   }
  }
 },
 get reduceChain() {
  return (callback, value) => {
   this.forChain((head, index) => (value = callback(value, head, index)))
   return value
  }
 },
 get screenTheme() {
  return (addend = 0.1) =>
   "#" +
   this["theme.color"]
    .match(/[^#]{2}/g)
    .map(s => Math.trunc((1 - (1 - parseInt(s, 16) / 255) * (1 - addend)) * 255).toString(16))
    .join("")
 },
 get "icon.png"() {
  return "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"
 },
 get "os-path.txt"() {
  return this.reduceChain((t, head) => `${head["folder.name"]}/${t}`, "")
 },
 get "trace.txt"() {
  return this.reduceChain((t, head) => t + `\n\tat ${head["folder.name"]}`, "")
 },
 get "true.bool"() {
  return true
 },
 get "false.bool"() {
  return false
 },
 get ".properties"() {
  return Object.getOwnPropertyDescriptors(this)
 },
 get "depth.number"() {
  return (this.up()?.["depth.number"] ?? 0) + 1
 },
 get "folder.name"() {
  return "C:"
 },
 get "default/"() {
  return {
   get "path.uri"() {
    return this.up()["path.uri"] + "/" + this["folder.name"]
   }
  }
 },
 get ".request"() {
  return {
   get "folder.name"() {
    return "C:/"
   }
  }
 },
 get "file.txt"() {}
}

// C.start()

// the node is the critical point.
// where property values must change on the node, it would help to know, from the node, the files whose value changes will influence the node.

// at first, lets manually collect the data

onload = e => {
 if (!document.body.valid) {
  console.warn("invalid cache on document.body")
 }
}
