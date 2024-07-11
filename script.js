const Core = {
 get uri2data() {
  return href => {
   const commaIndex = href.indexOf(","),
    header = href.slice(5, commaIndex).split(";"),
    type = header.shift() || "text/plain"
   let datum = href.slice(commaIndex + 1)
   if (type.at(-1) === "base64") datum = atob(datum)
   if (type === "type/json") return `\n return ${datum}\n`
   if (type === "text/getter") return " " + datum + " "
   if (type === "text/expression") return " return " + datum + " "
   return `return \`${datum}\``
  }
 },
 get uri2getter() {
  return href => {
   if (href.startsWith("data:")) return this.uri2data(href)
   return `return ${
    href.startsWith("https://") ? `this["host.head"].up().get("${href.slice(8)}")` : `this.get("${href}")`
   }`
  }
 },
 get uri2request() {
  return uri => {
   const { host, searchParams } = new URL(uri, "https://example.com/"),
    request = {}
   for (const [k, v] of searchParams.entries() ?? []) {
    const single = eval(`({ get "${k}"(){${this.uri2getter(v || k)}} })`),
     getter = Object.getOwnPropertyDescriptor(single, k).get
    this.transfer(request, single)
    getter.uri = v
   }
   if (host === "example.com") return request
   return this.transfer(request, {
    get "part.name"() {
     return host
    }
   })
  }
 },
 get data2uri() {
  return (datum, type = "text/plain") => {
   if (type === "text/plain") type = ""
   const encode = this["uri-safe.regex"].test(datum),
    header = [type, ...(encode ? ["base64"] : [])].join(";")
   if (encode) datum = btoa(datum)
   return `data:${header},${datum}`
  }
 },
 get getter2uri() {
  return getter => {
   if (getter.uri) return getter.uri
   const body = ("" + getter).match(/^get "?(.+)"?\(\)\s*\{\s*([\s\S]*)\s*\}$/)?.[2]
   if (body === null || body === undefined) throw new Error(`This getter can't be parsed.${getter}`)
   const expression = body?.match(/^return\s*(.*)$/)?.[1]
   if (!expression) return this.data2uri(body, "text/getter")
   const datum = expression.match(/^`((?:[^`]|\\`)*)`$/)?.[1]
   if (datum) return this.data2uri(datum)
   const absoluteHREF = expression.match(/^this\["host\.head"\]\.up()\.get\("(.*)"\)$/)?.[1]
   if (absoluteHREF) return `https://${absoluteHREF}`
   const relativeHREF = expression.match(/^this\.get\("(.*)"\)$/)?.[1]
   if (relativeHREF) return relativeHREF
   return (getter.uri = this.data2uri(expression, "text/expression"))
  }
 },
 get request2uri() {
  return request => {
   const map = Object.getOwnPropertyDescriptors(request)
   let params = []
   let partname = "untitled"
   let pathname = "/"
   for (const [name, { get }] of Object.entries(map).sort()) {
    if (name === "part.name") {
     partname = get.apply(this)
    } else params.push(`${name}=${this.getter2uri(get)}`)
   }
   return `${partname}${pathname}${params.length ? "?" + params.join("&") : ""}`
  }
 },
 get ".uri"() {
  return this.request2uri(this[".request"])
 },
 get "core.head"() {
  return Core
 },
 get "script.uri"() {
  return `${location.origin}/script.js`
 },
 get "client.part"() {
  return {
   get boot() {
    return () => {
     client = this
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
        if (this.request2uri(this["host.request"]) !== location.host + location.pathname + location.search)
         console.warn(
          `lossy encoding detected: \n${this.request2uri(this["host.request"])}\n${
           location.host + location.pathname + location.search
          }`
         )
        if (original) manifest.href = this["manifest.uri"]
        client = this
        this.render()
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
     const node = this[".node"]
     if (!node) return

     if (this["depth.number"] > 20) {
      console.warn("too deep", this["trace.txt"])
      return
     } // debug only

     if (node instanceof Text) {
      if (node.innerHTML != this["index.htm"]) node.innerHTML = this["index.htm"]
      return
     }

     if (this["index.htm"] !== undefined) {
      if (node.innerHTML != this["index.htm"]) node.innerHTML = this["index.htm"]
     } else {
      const incomingRequests = this["index.parts"] ?? []

      if (!(incomingRequests && Array.isArray(incomingRequests)))
       throw new Error(
        `Cannot use parts file of type ${typeof incomingRequests}.\n${incomingRequests}${this["trace.txt"]}`
       )

      const { childNodes } = node,
       max = 250

      let i = -1

      while (incomingRequests.length) {
       i++

       if (i >= max) throw "∞ loop"

       const incomingRequest = incomingRequests.shift(),
        incomingURI = this.request2uri(incomingRequest),
        existingURI = childNodes[i]?.head[".uri"]

       if (!incomingRequest) throw new Error(`No name on node.\n\t[${this["index.parts"]}].${this["trace.txt"]}`)

       if (incomingURI === existingURI) continue

       const existingIndex = [...childNodes].findIndex((n, o) => o > i && n.head[".uri"] === incomingURI)

       if (existingIndex !== -1) {
        node.insertBefore(childNodes[existingIndex], childNodes[i])
        continue
       }

       const head = this.commit(incomingRequest),
        childNode = head[".node"]

       if (i !== -1 && i < childNodes.length) node.insertBefore(childNode, childNodes[i])
       else node.appendChild(childNode)

       childNode.callback?.()
      }

      while (childNodes[i + 1]) childNodes[i + 1].head.remove()

      this.forEach(head => head.render())
     }

     const style = this["style.css"]

     if (style !== undefined) {
      const query = this["query.txt"]
      this[".sheet"].replaceSync(
       this["style.css"].replaceAll(/:host\(([^)]+)\)/g, query + "$1").replaceAll(":host", query)
      )
     }
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
     const value = this[".node"].scrollTop
     this.goto(`${this["part.name"]}-scroll-y.number=data:text/json,${value}`)
    }
   },
   get "default.part"() {
    return this.inherit("default", {
     get onclick() {},
     get onresize() {},
     get onscroll() {},
     get onpointerdown() {},
     get ".attributes"() {},
     get "style.css"() {},
     get "index.htm"() {},
     get "index.parts"() {},
     get ".tag"() {
      let name = this["part.name"].replaceAll(/[^a-zA-Z0-9]+/g, "-")
      if (!name.includes("-")) name += "-"
      return name
     },
     get ".node"() {
      let node
      if (this === this["host.head"]) {
       node = document.body
      } else {
       const tag = this[".tag"]
       if (tag === "#text") node = document.createTextNode(this["index.htm"] ?? "")
       else node = document.createElement(tag)
      }
      this.adopt({
       get ".node"() {
        return node
       }
      })
      node.head = this
      node.onclick = this.onclick
      node.onscroll = this.onscroll
      node.onpointerdown = this.onpointerdown
      for (const [name, value] of Object.entries(this[".attributes"] ?? {})) node.setAttribute(name, value)
      if (this.onresize || this.onscroll) {
       let scroll = !!this.onscroll
       new ResizeObserver(e => {
        if (scroll) {
         scroll = false
         node.scrollTo(
          this[this["part.name"] + "-scroll-x.number"] ?? 0,
          this[this["part.name"] + "-scroll-y.number"] ?? 0
         )
        }
        let timeout = this["core.head"]["timeout.number"]
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => this.onresize?.(e[0]), 75)
        Object.defineProperty(this["core.head"], "timeout.number", {
         get() {
          return timeout
         },
         configurable: true
        })
       }).observe(node)
      }
      return node
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
   get "size.part"() {
    return {
     get "index.htm"() {
      return this["core.uri"].length
     },
     get "style.css"() {
      return this["stat.css"]
     }
    }
   },
   get "tray.part"() {
    return {
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "factory-reset"
        }
       },
       {
        get "part.name"() {
         return "fullscreen"
        }
       },
       {
        get "part.name"() {
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
   get "line.part"() {
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
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "line-number"
        }
       },
       {
        get "part.name"() {
         return "line-content"
        }
       }
      ]
     },
     get "line-content.part"() {
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
     get "line-number.part"() {
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
   get "text.part"() {
    return {
     get ".tag"() {
      return `#text`
     },
     get "index.htm"() {
      return this["content.txt"]
     }
    }
   },
   get "clock.part"() {
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
   get "empty.part"() {
    return {
     get "index.parts"() {
      return [
       {
        get "part.name"() {
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
   get "blank.part"() {
    return {}
   },
   get "title.part"() {
    return {
     get "index.htm"() {
      return this["title.htm"]
     },
     get "style.css"() {
      return this["title.css"]
     }
    }
   },
   get "shelf.part"() {
    return {
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "back-button"
        }
       },
       {
        get "part.name"() {
         return "title"
        },
        get "title.txt"() {
         return this["selected-part.name"]
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
       },
       {
        get "part.name"() {
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
        get "part.name"() {
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
   get "search.part"() {
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
     get "index.parts"() {
      return [
       {
        get "part.name"() {
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
   get "header.part"() {
    return {
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "text"
        },
        get "content.txt"() {
         return "Parts"
        }
       },
       {
        get "part.name"() {
         return "search"
        }
       },
       {
        get "part.name"() {
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
   get "status.part"() {
    return {
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "core-address-usage"
        }
       },
       {
        get "part.name"() {
         return "core-address"
        }
       },
       {
        get "part.name"() {
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
   get "version.part"() {
    return {
     get "index.htm"() {
      return 61 / 1000
     },
     get "pill-icon-right.bool"() {
      return this["true.bool"]
     },
     get "style.css"() {
      return this["stat.css"]
     }
    }
   },
   get "taskbar.part"() {
    return {
     get "height.number"() {
      return `28px`
     },
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "start-button"
        }
       },
       ...(this["tasks.parts"] ?? []),
       {
        get "part.name"() {
         return "flex-spacer"
        }
       },
       {
        get "part.name"() {
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
   get "desktop.part"() {
    return {
     get "style.css"() {
      return `:host{ background: #377f7f } `
     }
    }
   },
   get "error404.part"() {
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
   get "add-part.part"() {
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
   get "part-list.part"() {
    return {
     get "style.css"() {
      return `:host {
 padding: 48px;
 padding-top: 16px;
 display: flex;
 flex-flow: column;
 background: #eaeaec;
 color: #333445;
 overflow-y: auto;
 font-size: 17px;
 font-weight: 200;
}`
     },
     get "index.parts"() {
      const makeItem = name => ({
        get "part.name"() {
         return "part-list-item"
        },
        get "selected-part.name"() {
         return name
        }
       }),
       propertyEntries = Object.entries(this["core.head"][".properties"]),
       reducer = (parts, [name]) => {
        if (name.endsWith(".part")) parts.push(makeItem(name.slice(0, -5)))

        return parts
       }
      return propertyEntries.reduce(reducer, [])
     },
     get onscroll() {
      return this.scrollNameY
     }
    }
   },
   get "empty-icon.part"() {
    return {
     get "index.htm"() {
      return `∅`
     }
    }
   },
   get "start-menu.part"() {
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
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "locate"
        }
       },
       {
        get "part.name"() {
         return "relate"
        }
       },
       {
        get "part.name"() {
         return "debate"
        }
       },
       {
        get "part.name"() {
         return "horizontal-line-1"
        }
       },
       {
        get "part.name"() {
         return "welcome"
        }
       },
       {
        get "part.name"() {
         return "horizontal-line-2"
        }
       },
       {
        get "part.name"() {
         return "save-computer"
        }
       },
       {
        get "part.name"() {
         return "restart-computer"
        }
       },
       {
        get "part.name"() {
         return "restart-server"
        }
       }
      ]
     }
    }
   },
   get "test-canvas.part"() {
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
     get "core.head"() {
      return this
     },
     get ".attributes"() {
      return { id: this["title.txt"] }
     }
    }
   },
   get "flex-spacer.part"() {
    return {
     get "style.css"() {
      return `:host {
 flex: 1 1
}`
     }
    }
   },
   get "back-button.part"() {
    return {
     get "index.htm"() {
      return `‹`
     },
     get "style.css"() {
      return this["unicode-button.css"]
     },
     get onclick() {
      return () => {
       this.goto("selected-part.name=data:text/getter,")
      }
     }
    }
   },
   get "core-address.part"() {
    return {
     get "index.htm"() {
      return this["core.uri"]
     },
     get "style.css"() {
      return this["stat.css"] + `:host { flex: 1 1 }`
     }
    }
   },
   get "mini-browser.part"() {
    return {
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "title"
        }
       },
       {
        get "part.name"() {
         return "test-canvas"
        },
        get "index.parts"() {
         return this["input.parts"]
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
   get "start-button.part"() {
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
      return () => this.goto(`start-menu.bool=${this["core.head"]["start-menu.bool"]}.bool`)
     },
     get ".attributes"() {
      return { tabindex: 1 }
     }
    }
   },
   get "part-list-item.part"() {
    return {
     get "index.parts"() {
      return [
       {
        get "part.name"() {
         return "text"
        },
        get "content.txt"() {
         return this["selected-part.name"]
        }
       },
       {
        get "part.name"() {
         return "flex-spacer"
        }
       },
       {
        get "part.name"() {
         return "text"
        },
        get "content.txt"() {
         return "# ch"
        }
       }
      ]
     },
     get onclick() {
      return () => {
       const name = this["selected-part.name"]
       this.goto(`selected-part.name=data:,${name}`)
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

:host${this["core.head"]["selected-part.name"] === this["selected-part.name"] ? "" : "(:hover)"} {
 background: ${this.screenTheme(0.3)};
}`
     }
    }
   },
   get "example-viewer.part"() {
    return {
     get "title.txt"() {
      return `Examples`
     },
     get "index.parts"() {
      const name = this["selected-part.name"],
       part = {
        get "part.name"() {
         return name
        }
       },
       selectedObject = this["core.head"].commit(part)

      return [
       {
        get "part.name"() {
         return "mini-browser"
        },
        get "title.txt"() {
         return "Default"
        },
        get "input.parts"() {
         return [part]
        }
       },
       ...Object.entries(selectedObject[".examples"] ?? {}).map(([name, [part, size]]) => ({
        get "part.name"() {
         return "mini-browser"
        },
        get "title.txt"() {
         return name
        },
        get "size.json"() {
         return size
        },
        get "input.parts"() {
         return [part]
        }
       }))
      ]
     },
     get onscroll() {
      return this.scrollNameY
     },
     get "style.css"() {
      return `:host {
 display: flex;
 flex-flow: row wrap;
 align-content: start;
 gap: 16px;
 padding: 16px;
 overflow: hidden;
 position: relative;
 overflow-y: auto;
 align-items: start;
 background: ${this["theme.color"]};
}

:host > title- {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
}`
     }
    }
   },
   get "core-address-usage.part"() {
    return {
     get "index.htm"() {
      return Math.trunc(("https://" + this["core.uri"]).length / 20.48) + " %"
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
    const css = this.reduceChain(
     (t, head, i) => (
      t.unshift(
       head === head["host.head"]
        ? head[".node"].hasAttribute("id")
          ? "#" + head[".node"].getAttribute("id")
          : "body"
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
 get "server.part"() {
  return {
   get boot() {
    return () => {
     oninstall = () => globalThis.skipWaiting()
     onactivate = onmessage = () => clients.claim()
     onfetch = e => {
      const { host, pathname, search } = new URL(e.request.url),
       path = pathname.slice(1).split("/"),
       filename = path.pop()
      if (host !== this["part.name"])
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
      const extension = filename.split(".").at(-1),
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
    const prefix = "const Core = {\n ",
     suffix = "\n}\nCore.boot()\n",
     inside = Object.values(this["core.head"][".properties"])
      .map(_ => _.get)
      .join(",\n ")

    return prefix + inside + suffix
   },
   get "manifest.json"() {
    return JSON.stringify({
     name: this["part.name"].split(".")[0],
     short_name: this["part.name"],
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
 get "default.part"() {
  return {
   get ".examples"() {}
  }
 },
 get "host.request"() {
  return this.uri2request(location)
 },
 get "uri-safe.regex"() {
  return /^[a-zA-Z0-9-./;:_?=]*$/
 },
 get "core.parts.part"() {
  return {
   get "index.parts"() {
    const name = this["selected-part.name"]
    return [
     {
      get "part.name"() {
       return name ? "shelf" : "header"
      }
     },
     {
      get "part.name"() {
       return name ? "example-viewer" : "part-list"
      }
     },
     ...(name
      ? [
         {
          get "part.name"() {
           return "status"
          }
         }
        ]
      : [])
    ]
   },
   get "style.css"() {
    const topRow = this["selected-part.name"]
     ? `"header" ${this[".node"].querySelector(`shelf-`).head["height.number"]}px`
     : `"header" auto`

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
     ${topRow}
     "main" 1fr
     ${this["selected-part.name"] ? `"status" 32px` : ``} / 100%;
    }

    :host > shelf-,
    :host > h1 {
     grid-area: header;
    }

    :host > example-viewer,
    :host > part-explorer {
     grid-area: main;
    }

    :host > status- {
     grid-area: status;
    }`
   },
   get "part-list-scroll-y.number"() {
    return 0
   },
   get "example-viewer-scroll-y.number"() {
    return 0
   },
   get "selected-part.name"() {}
  }
 },
 get "pilot.parts.part"() {
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
   get "index.parts"() {
    return [
     {
      get "part.name"() {
       return "desktop"
      }
     },
     {
      get "part.name"() {
       return "taskbar"
      }
     },
     ...(this["windows.parts"] ?? []),
     ...(this["start-menu.bool"]
      ? [
         {
          get "part.name"() {
           return "start-menu"
          }
         }
        ]
      : []),
     ...(this["context-menu.bool"]
      ? [
         {
          get "part.name"() {
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
 get "ejaugust.com.part"() {
  return {
   get "index.parts"() {
    return [
     {
      get "part.name"() {
       return "core.parts"
      },
      get "selected-part.name"() {
       return this.up()["selected-part.name"]
      },
      get "part-list-scroll-y.number"() {
       return this.up()["part-list-scroll-y.number"]
      },
      get "example-viewer-scroll-y.number"() {
       return this.up()["example-viewer-scroll-y.number"]
      }
     },
     {
      get "part.name"() {
       return "pilot.parts"
      }
     },
     {
      get "part.name"() {
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
   get "selected-part.name"() {
    return `ejaugust.com`
   },
   get "part-list-scroll-y.number"() {
    return 0
   },
   get "example-viewer-scroll-y.number"() {
    return 0
   }
  }
 },
 get "orenjinari.com.part"() {
  return {
   get "index.parts"() {
    return [
     {
      get "part.name"() {
       return "nari-artwork"
      }
     },
     {
      get "part.name"() {
       return "nari-recent"
      },
      get "index.number"() {
       return 0
      }
     },
     {
      get "part.name"() {
       return "nari-recent"
      },
      get "index.number"() {
       return 1
      }
     },
     {
      get "part.name"() {
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
display: grid;
grid-template:
"sp1 sp1 sp1 sp1 sp1" 1fr
"sp2 art art art sp3" max(min(40%, 240px), 128px)
"sp2 re1 re2 re3 sp3" max(min(20%, 96px), 36px)
"sp2 sp4 sp4 sp4 sp3" 2fr / 1fr max(min(25%, 240px), 64px)  max(min(25%, 240px), 64px)  max(min(25%, 240px), 64px) 1fr;
background: #dadbca;
width: 100%;
height: 100%;
pad: 24px;
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
 get "dev.core.parts.part"() {
  return this["core.parts.part"]
 },
 get "dev.pilot.parts.part"() {
  return this["pilot.parts.part"]
 },
 get "dev.ejaugust.com.part"() {
  return this["ejaugust.com.part"]
 },
 get "dev.orenjinari.com.part"() {
  return this["orenjinari.com.part"]
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
   if (path.includes("#")) throw new RangeError("get(path) - path cannot include hash.")
   let patch
   if (path.includes("?")) {
    const getters = []
    path = path.slice(0, path.indexOf("?"))
    for (const [k, v] of new URL(path, "https://example.com/").searchParams.entries() ?? [])
     getters.push(`get "${k}"(){${this.uri2getter(v || k)}}`)
    patch = eval(`({\n ${getters.join(",\n ")}\n})`)
   }
   if (path === "./") return patch ? this.fork(patch) : this
   let head = this
   if (path.startsWith("https://")) {
    head = this["core.head"]
    path = path.slice(8)
   } else {
    const n = (path.match(/(?<=^(\.\.\/)*)\.\.\//g) ?? []).length
    if (n) {
     head = head.up(n)
     path = path.slice(n * 3)
    }
   }
   const parts = path.split("/"),
    filename = parts.pop()
   while (parts.length) {
    const name = parts.shift()
    head = head.into(name)
   }
   if (patch) head = head.fork(patch)
   return filename ? head[filename] : head
  }
 },
 get fork() {
  return part => this.up().commit(this[".request"]).adopt(part)
 },
 get into() {
  return name => {
   if (!name) throw new RangeError(`into() called with falsish name.`)
   return this.commit({
    get "part.name"() {
     return name
    }
   })
  }
 },
 get boot() {
  return () => {
   Object.setPrototypeOf(this, null)
   const host = this.commit(
    {
     get "part.name"() {
      return self instanceof (self.Window ?? class {}) ? "client" : "server"
     }
    },
    this["host.request"]
   )

   host
    .adopt({
     get "host.head"() {
      return host
     },
     get goto() {
      return delta => {
       host.adopt(host.transfer(host[".request"], this.uri2request(`?` + delta)))
       host.render()
       if (history._timeout) clearTimeout(history._timeout)
       history._timeout = setTimeout(() => history.replaceState({}, null, `https://` + host[".uri"]), 120)
      }
     }
    })
    .boot()
  }
 },
 get adopt() {
  return (...X) => {
   for (const x of X) {
    const a = typeof x === "string" ? this[`${x}.part`] : x
    if (!a)
     throw new RangeError(
      (typeof x === "string" ? `404: ${x}.part` : `undefined argument passed to adopt.`) + this["trace.txt"]
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
    head = Object.create(head).adopt("default", request)
    const fullPart = head[head["part.name"] + ".part"]
    if (fullPart) {
     head.adopt(fullPart, request)
     if ("default.part" in fullPart) head.adopt("default", request, fullPart, request)
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
  return (name, ...B) => this.transfer({}, this.up()[`${name}.part`] ?? {}, ...B)
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
    if (head === head["host.head"]) break
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
 get "core.uri"() {
  return this["core.head"][".uri"]
 },
 get "icon.png"() {
  return "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"
 },
 get "trace.txt"() {
  return "" + this.reduceChain((t, head) => t + `\n\tat ${head["part.name"]}`, "")
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
 get "part.name"() {
  return "core"
 },
 get ".request"() {
  return {
   get "part.name"() {
    return "core"
   }
  }
 }
}

Core.boot()

const error = {
 recomputed:
  "https://dev.core.parts/?inspector.bool=./true.bool&other.test=123.json&selected-part.name=data:text/expression,name ",
 actual:
  "https://dev.core.parts/?inspector.bool=./true.bool&other.test=123.json&selected-part.name=data:text/getter,return%20name"
}
