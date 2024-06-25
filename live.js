{
 const

  VERSION = 31 / 1000,

  // Determine whether script is running on the client or the serviceWorker.
  ENVIRONMENT = 'HTMLElement' in globalThis ? 'CLIENT' : 'SERVER',

  // For debug, create a passthru logger that doesn't take focus away from the code.
  _ = (..._) => (VERBOSE_LOGGING && (console.groupCollapsed(ENVIRONMENT, ..._), console.trace(..._), console.groupEnd()), _.pop()),

  // Create a variable to control the visibility of all logs that log through _().
  VERBOSE_LOGGING = true,

  // Create the cache that stores all values and parameter strings according to their HTTPS URL.
  PARTS = {
   "https://dev.core.parts/globalThis?": "operation=globalThis",
   "https://dev.core.parts/document?": "operation=access&a=globalThis&b=data:,document",
   "https://dev.core.parts/body?": "operation=access&a=document&b=data:,body",
   "https://dev.core.parts/404/?": "manifest=manifest&layout=layout",
   "https://dev.core.parts/404/crumbs?": "layout=layout",
   "https://dev.core.parts/404/header?": "layout=layout",
   "https://dev.core.parts/404/footer?": "layout=layout",
   "https://dev.core.parts/404/manifest?": "operation=parse/list&datastring=data:,https://dev.core.parts/404/crumbs%20https://dev.core.parts/404/header%20https://dev.core.parts/404/footer",
   "https://dev.core.parts/404/layout?": "operation=math/add&a=data:,:host&b=data:base64," + btoa(`{ background: green }`),
   "https://dev.core.parts/operations/globalThis?": "expression=data:text/javascript;base64," + btoa(`globalThis`),
   "https://dev.core.parts/operations/assign?": "a=../globalThis&b=data:,hello&c=data:,world&expression=data:text/javascript;base64," + btoa(`a[b]=c`),
   "https://dev.core.parts/operations/access?": "a=data:operation=parse/integer,6&b=data:operation=parse/integer,3&expression=data:text/javascript;base64," + btoa(`a[b]`),
   "https://dev.core.parts/operations/math/add?": "a=data:operation=parse/integer,1&b=data:operation=parse/integer,2&expression=data:text/javascript;base64," + btoa(`a+b`),
   "https://dev.core.parts/operations/math/power?": "a=data:operation=parse/integer,2&b=data:operation=parse/integer,8&expression=data:text/javascript;base64," + btoa(`a**b`),
   "https://dev.core.parts/operations/math/log?": "a=data:operation=parse/integer,8&b=data:operation=parse/integer,2&expression=data:text/javascript;base64," + btoa(`Math.log(a)/Math.log(b)`),
   "https://dev.core.parts/operations/math/subtract?": "a=data:operation=parse/integer,3&b=data:operation=parse/integer,2&expression=data:text/javascript;base64," + btoa(`a-b`),
   "https://dev.core.parts/operations/math/multiply?": "a=data:operation=parse/integer,2&b=data:operation=parse/integer,3&expression=data:text/javascript;base64," + btoa(`a*b`),
   "https://dev.core.parts/operations/math/divide?": "a=data:operation=parse/integer,6&b=data:operation=parse/integer,3&expression=data:text/javascript;base64," + btoa(`a/b`),
   "https://dev.core.parts/operations/parse/integer?": "datastring=data:,3.14&radix=data:,10&expression=data:text/javascript;base64," + btoa(`parseInt(datastring,parseInt(radix))`),
   "https://dev.core.parts/operations/parse/float?": "datastring=data:,3.14&expression=data:text/javascript;base64," + btoa(`parseFloat(datastring)`),
   "https://dev.core.parts/operations/parse/list?": "datastring=data:,3%2014&delimiter=data:,%20&expression=data:text/javascript;base64," + btoa(`datastring.split(delimiter)`),
   "https://dev.core.parts/operations/parse/json?": "datastring=data:,3.14&expression=data:text/javascript;base64," + btoa(`JSON.parse(datastring)`),
  },

  // Create a listener object where concerned objects can
  // put a reference to themselves in a set indexed by the url of
  // the value of the property. When that value changes,
  // it will look here for the set of all nodes to set
  // the property on.
  PARAMETER_LISTENERS = {},

  // Create a cause and effect network that maps
  // value URLs to the parameter value URLs that generated them
  // This allows updating existing runtime values when their definitions change.
  FX = {

  },

  // Create a function that turns a parameter object into an operation.
  MAKE_OPERATION = defaultParameters => {
   /* Running an operation requires
       1. An expression with some variables
       2. Default values for all those variables
       3. Optional runtime values to replace those defaults
       
      We combine items 1 and 2 once to create the operation.
      We merge in a different item 3 every time we run the operation.
   */

   // Get the expression itself.
   const
    expressionURL = defaultParameters['expression'],
    expression = GET(expressionURL);

   // Throw an error if the expression didn't come out.
   if (!expression)
    throw `MakeOperationError: Missing or empty expression (${expressionURL})`

   // Delete the expression parameter since it is not considered a true parameter.
   delete defaultParameters['expression'];

   // Create some empty arrays to store the default parameters' names and values in a reliable order.
   const parameterNamesInOrder = Object.keys(defaultParameters)

   // Make sure each name is a valid javascript identifier.
   for (const parameterName of parameterNamesInOrder) {

    // Throw an error if the name isn't a valid identifier.
    if (!/^(?:[a-zA-Z$_]+[0-9]*)+$/.test(parameterName))
     throw `MakeOperationError: '${parameterName}' is not a valid parameter name for expression (${expressionURL})`

    // Throw an error if the name is a reserved keyword in javascript.
    if (["instanceof", "typeof", "break", "do", "new", "var", "case", "else", "return", "void", "catch", "finally", "continue", "for", "switch", "while", "this", "with", "debugger", "function", "throw", "default", "if", "try", "delete", "in"].includes(parameterName))
     throw `MakeOperationError: '${parameterName}' cannot be used as a parameter name for expression (${expressionURL})`
   }

   // Create the operation's core function, which never changes.
   const DO = _('operation', new Function('$_EXPRESSION', '$_DEFAULT', '$_INPUT', ...parameterNamesInOrder, 'return ' + expression))

   // Return a function which merges an arbitrary runtime params object (if that's what $_ARG[0] is) with the defaults.
   return runtimeParameters => DO({ BODY: expression, REQUEST_URL: expressionURL }, defaultParameters, runtimeParameters, ...parameterNamesInOrder.map(parameterName => GET(runtimeParameters?.[parameterName] ?? defaultParameters[parameterName])))
  },

  // Create a function that turns an array of parameter entries into a parameter object.
  TO_PARAM_OBJ = (entries, baseURL = 'https://dev.core.parts/') => {

   // Begin with the empty parameters object.
   const parameters = {};

   /* Expand each url in the incoming entires, resolving it's modified
      relative value URL (https relative url with rest '...' operator)
      to an absolute https:// address (standard form)
      The order they are listed in the entries matters here -
      the paramter resolving operation is not commutative, thanks to the possibility
      of some parameters listed later (especially rest parameters) of replacing
      the value of the same parameter listed earlier.
      As is the standard, the final value given for any
      parameter listed twice is the only one used for that parameter. */

   for (const [parameterName, parameterValueURL] of entries) {

    if (parameterValueURL === undefined)
     throw `ParamObjectError: parameter "${parameterName}" has undefined value URL which is not allowed. ${baseURL} `

    // Either expand the parameters as a set because it has a rest operator ('...')
    if (parameterName.startsWith('...')) {

     // GET the parameter set given by the rest parameter name, minus the three dots
     const restParameters = GET(new URL(parameterName.slice(3) + '#parameters', baseURL))

     // Assign all parameters to the one under construction.
     Object.assign(parameters, restParameters)

     continue
    }

    // Or else the final base url will depend on whether the parameter name is 'operation' or not. 
    const finalBaseURL = parameterName === 'operation' ? 'https://dev.core.parts/operations/' : baseURL;

    // The resolved URL is the absolute path to the parameter URL
    // Set it on the parameters object currently under construction.
    if (parameterValueURL.startsWith('data:'))
     parameters[parameterName] = parameterValueURL
    else
     parameters[parameterName] = new URL(parameterValueURL, finalBaseURL).href;
   }

   // Return the given object.
   return parameters
  },

  // Create a function to register cause-effect linkages between URL pairs
  REGISTER_CAUSALITY = (causeURL, effectURL) => {
   // Do not remember causality for data URIs.
   if (causeURL.startsWith('data:') || effectURL.startsWith('data:'))
    return

   // If this cause has never been seen before, create it's FX set.
   if (!(causeURL in FX))
    FX[causeURL] = new Set()

   // Register the relationship by adding the effectURL into causeURL's set. 
   FX[causeURL].add(effectURL)
  },

  // Create a function that applies an operation, embedded in a parameter object, to the parameter object itself.
  APPLY = parameters => {
   // Get the operation itself.
   const
    operationURL = parameters['operation'],
    operation = GET(operationURL);

   // Throw an error if the operation didn't come out.
   if (!operation)
    throw `ApplyError: Missing operation. (${operationURL})`

   // Delete the operation parameter since it is not considered a true parameter.
   delete parameters['operation']

   // Apply the operation to the parameters and return the result.
   return operation(parameters)
  },

  /* Create a recursive function that takes a request and creates the corresponding value
     by applying an operation to one or more other values using the same request process.
     It injects a history modification scheme which keeps runtime objects up to date with
     the code that generated them despite changes made to that code after the objects
     were created. */
  GET = (requestURL, skipCache) => {

   // Check cache for the value first, if allowed.
   if (!skipCache && requestURL in PARTS)
    return _(requestURL, 'y (cache)', PARTS[requestURL])

   // This is for debug only.
   if (money-- <= 0)
    throw `MoneyError: Please get more money, Eric. ${requestURL}`

   // Start by breaking down the URL into it's parts.
   const { protocol: scheme, origin, pathname, searchParams, hash } = new URL(requestURL), requestBaseURL = origin + pathname;

   // This is temporary.
   if (searchParams.size !== 0) {
    throw `GetError: Request parameters are not yet supported. (${requestURL})`
   }

   // Choose behavior depending on the URI scheme.
   switch (scheme) {

    // data: describes magic values.
    case 'data:': {

     // Break apart the data URI
     const [, , parameterString = 'charset=US-ASCII', base64Mark, encodedBody] = requestURL.match(/^data:([^;/,]+\/[^;/,]+)?;?((?:[^;,]+=[^;,]+)*)(;?base64)?,(.*)$/)

     // Look at the paremeters in case there's an operation.
     const
      parameterEntries = parameterString.includes(';') ? parameterString.split(';').map(e => e.split('=')) : [],
      parameters = TO_PARAM_OBJ(parameterEntries)

     // If there is one, get our value by applying it.
     if ('operation' in parameters) {

      // Don't allow datastring parameter to be already assigned. It will be set in the next step.
      if ('datastring' in parameters)
       throw `GetError: The 'datastring' parameter name in reserved in data URIs. ${requestURL}`

      // Set the datastring parameter to the URI's body to pass it to the operation.
      parameters['datastring'] = 'data:' + (base64Mark ?? '') + ',' + encodedBody

      // Cache and return the value created by applying the operation.
      return PARTS[requestURL] = _('operation (datastring)', APPLY(parameters))
     }

     // If not, cache and return the body.
     return PARTS[requestURL] = _('datastring',
      // If the body is base64 encoded, decode it before returning.
      base64Mark ? atob(encodedBody) : encodedBody
     )
    }

    // https: describes everything but magic values
    case 'https:': {

     // Return undefined (w/o caching it) if the given URL doesn't exist in the cache.
     if (!(requestBaseURL + '?' in PARTS))
      return _(`404 undefined. (${requestURL})`, undefined)

     // Register causality between request URL and parameters URL
     const parametersURL = requestBaseURL + '?'

     REGISTER_CAUSALITY(parametersURL, requestURL)

     // Get the parameters. TBA: Validate the cached string first?
     const parameters = TO_PARAM_OBJ([...new URL('?' + PARTS[parametersURL], requestBaseURL).searchParams.entries()], requestBaseURL)

     // Track the cause and effect first.
     for (const parameterValueURL of Object.values(parameters))
      REGISTER_CAUSALITY(parameterValueURL, requestURL)

     // Choose behavior depending on which parameters are found.
     switch (true) {
      // If there is a hash called parameters, return the parameters of the file.
      case hash === '#parameters':
       return PARTS[requestURL] = _('#parameters', parameters)

      // If there is an operation in the parameters, apply it to the parameters.
      case 'operation' in parameters:

       // Cache and return the result of applying the operation.
       return PARTS[requestURL] = _('operation (any)', APPLY(parameters))

      // If instead there's an expression, cache and return an operation made using the parameters as the defaults.
      case 'expression' in parameters:
       // postfx:
       //         if expression parameter kicked, each result of me is kicked @operation
       //         else each result which used a default parameter which has changed is kicked @operation
       return PARTS[requestURL] = MAKE_OPERATION(parameters)

      // Anything else is undefined right now.
      default:
       return _('fallback, no operation or expression', undefined)
     }
    }

    // If it's another scheme, throw an error.
    default:
     throw `GetError: The requestURL uses an unsupported URI scheme "${scheme}". (${requestURL})`
   }
  },

  // Create a function that sets parts directly to the given values.
  SET = incomingParts => {

   const
    // Keep track of the already set parts.
    lockedParts = new Set(),

    // Create a function to recurse the causality pathways.
    updateRecursive = causeURLs => {

     // For each of the incoming set of cause URLs ...
     for (const causeURL of causeURLs) {

      // Don't update the same url twice.
      if (causeURL in lockedParts)
       continue

      // Check if the affected urls changed and need to be notified.
      const
       existingValue = PARTS[causeURL],
       incomingValue = causeURL in incomingParts ? incomingParts[causeURL] : GET(causeURL, true)

      if (existingValue !== incomingValue) {

       // Set the new part into the database.
       PARTS[causeURL] = incomingValue;

       // Update any listening nodes.
       if (causeURL in PARAMETER_LISTENERS)
        Object.entries(PARAMETER_LISTENERS[causeURL]).forEach(([parameterName, nodeset]) => nodeset.forEach(node => node[parameterName] = incomingValue))
      }

      // Track the url so we won't update it again.
      lockedParts.add(causeURL)

      // Continue recursively.
      if (causeURL in FX)
       updateRecursive(FX[causeURL])
     }
    }

   // Call the recursive function for the first time.
   updateRecursive(Object.keys(incomingParts));
  }

 // This is for debug only.
 var money = 50

 if (ENVIRONMENT === 'CLIENT') {

  // We are on the client and need to give injection functionality to all HTML elements.
  const

   // Create a node pool to track all created HTML elements.
   NODE_POOL = {},

   // Create a list of certain keyboard and mouse events that are also parameter names that indicate that a node can be focused on.
   FOCUS_EVENTS = ["onfocus", "onpointerdown", "onclick", "oncontextmenu", "onblur"],

   // Create a map of parameter names to event handling styles, telling HTML elements in the pool which properties are managed by parameter strings and how.
   EVENT_PARAMETER_TYPES = { onkeydown: 0, onkeyup: 0, onclick: 0, onwheel: 0, oncontextmenu: 0, onpointerdown: 0, onpointerup: 0, onpointermove: 0, ondblclick: 0, onfocus: 0, onblur: 0, layout: 1, manifest: 1, ondragstart: -1 }

  // Empower any HTMLElement to be controlled by this script via GET and SET
  Object.defineProperties(HTMLElement.prototype, {
   // Install adds a new node to the shadow (or recycles one from the node pool) with the given URL.
   install: {
    get() {
     return (incomingChildURL, index) => {

      // Validate the url.
      if (!incomingChildURL)
       throw new TypeError(`install url cannot be ${incomingChildURL === undefined ? "undefined" : incomingChildURL === "" ? "an empty string" : `"${incomingChildURL}"`} (installing <${this.tagName}> on ${this.incomingChildURL})`)

      const absoluteChildURL = new URL(incomingChildURL, this.url).href;

      // Try and find a matching node in the pool that isn't being used.
      let node = (absoluteChildURL in NODE_POOL ? [...NODE_POOL[absoluteChildURL]].find(x => !x.isConnected && !x.parentNode) : undefined);

      // If there is no node, we need to make one.
      if (node === undefined) {

       // Create the new node's tag name
       const
        tagWord = absoluteChildURL.match(/https:\/\/[^\/]*\/(?:[^\/]*\/)*((?:[a-zA-Z$_]+[0-9]*)+)(?:\/[^\/]*)?$/)?.[1],
        tagName = tagWord ? (tagWord.includes('-') ? tagWord : tagWord + '-') : 'node-'

       // Create a new HTMLElement.
       node = document.createElement(tagName)
      }

      if (index < this.shadow.children.length)
       // Install the node at a specific place ...
       this.shadow.insertBefore(node, this.shadow.children[index])

      else
       // ... or add it the last child.
       this.shadow.appendChild(node)

      // Do the injection if needed.
      if (!('url' in node))
       node.inject(absoluteChildURL)
     }
    }
   },
   // Injecting the node sets it up for everything else, allowing us to track it, sync it, and recycle it via the pool.
   inject: {
    get() {
     return assignedURL => {

      // Prevent duplicate data injection
      if ('url' in this)
       throw new TypeError(`cannot inject node twice (injected as ${this.url}, tried to inject as ${assignedURL})`)

      // Create a cascading stylesheet for the encapsulated layout of the node.
      const layoutContainer = new CSSStyleSheet()

      // Set the node up for encapsulated component handling.
      Object.defineProperties(this, {
       url: { value: assignedURL, writable: false, configurable: false, enumerable: true },
       shadow: { value: this.attachShadow({ mode: "closed" }), writable: false, configurable: false, enumerable: true },
       parameters: { value: GET(assignedURL + '#parameters') ?? GET('https://dev.core.parts/404/#parameters'), writable: false, configurable: false, enumerable: true },
       layout: { set(cssString) { layoutContainer.replaceSync(cssString) } },
       manifest: {
        // The manifest is simply the list of child nodes (by relative URL) that must always be parented to the shadow.
        set(incomingChildURLs) {

         // This setter defines an algorith that determines the
         // inserts/rearranges/removals needed to make the existing node
         // list match the incoming node list

         // Throw an error if incomingChildURLs isn't an array.
         if (!(incomingChildURLs instanceof Array))
          throw `HTMLElementError: manifest must be a list of URLs. Got type "${typeof incomingChildURLs}." (${incomingChildURLs}) (${this.url})`

         // Get the current children.
         const currentChildren = [...this.shadow.children];

         // If the new list is empty, remove all the children.
         if (incomingChildURLs.length === 0) {
          currentChildren.forEach(x => x.remove())
          return
         }

         // Otherwise, get all their URLs to compare with the incoming list.
         const existingChildURLs = currentChildren.map(x => x.url)

         // If it's already the same, nothing changes.
         if (existingChildURLs.join(" ") === incomingChildURLs.join(" "))
          return

         // Prepare to compare an existing and incoming URL at each array index
         let childIndex = -1, existingChildURL, incomingChildURL;

         // For each index where there is both an existing and an incoming URL specified...
         while (existingChildURLs.length && incomingChildURLs.length) {
          // Increase the index by one.
          childIndex++

          // If the two URLs at the current index are not the same...
          if ((existingChildURL = existingChildURLs.shift()) !== (incomingChildURL = incomingChildURLs.shift())) {

           // See if the incoming URL does exist but not until later among the existing children.
           const existingIncomingURLIndex = existingChildURLs.findIndex(futureExistingChildURL => futureExistingChildURL === incomingChildURL)

           // If there was a match...
           if (existingIncomingURLIndex !== -1) {

            // Reorder the existing child node so that it is moved to the current index.
            this.shadow.insertBefore(this.shadow.children[childIndex + existingIncomingURLIndex + 1], this.shadow.children[childIndex])

            // Update the upcoming existing child URL list to match
            existingChildURLs.splice(existingIncomingURLIndex, 1)
           } else {

            // Otherwise, install a new child node onto the shadow with the given URL
            this.install(incomingChildURL, childIndex)
           }

           // Now check if the existing child that was already at this index is eventually incoming.
           if (incomingChildURLs.some(futureIncomingChildURL => futureIncomingChildURL === existingChildURL)) {

            // If so, pop it back into the upcoming search array, it will be the
            // existing node again at the next iteration of this loop.
            existingChildURLs.unshift(existingChildURL)
           } else {
            // If not, remove the child itself.
            // It will be available as a recycled node later in the node pool.
            this.shadow.children[childIndex + 1].remove();
           }
          }
         }

         // Correct any differences in list length that go beyond their common portion.
         if (existingChildURLs.length) {

          // Remove all existing children that were never mentioned in the incoming list.
          existingChildURLs.forEach(() => this.shadow.children[childIndex + 1].remove())
         } else if (incomingChildURLs.length) {

          // Install all incoming children that were beyond the length of the existing list.
          incomingChildURLs.forEach(incomingChildURL => this.install(incomingChildURL));
         }
        }
       }
      })

      // Make the shadow adopt the new stylesheet.
      this.shadow.adoptedStyleSheets.push(layoutContainer)

      // If the nodepool doesn't have a set for this url yet, add it.
      if (!(assignedURL in NODE_POOL))
       NODE_POOL[assignedURL] = new Set()

      // Add the injected node to the set of managed nodes in the pool for this url.
      NODE_POOL[assignedURL].add(this)

      // Prepare to assign certain parameters for the given URL to this node.
      const parameterNames = Object.keys(this.parameters)

      // If certain keyboard and mouse event parameters are present, assign a tab index to make the items 'focus'-able. 
      if (parameterNames.some(x => FOCUS_EVENTS.includes(x)))
       this.tabIndex = 0

      // Go over the predefined common node parameter names and attach to each node event according on it's parameter type.
      for (const parameterName in EVENT_PARAMETER_TYPES) {

       // Get the URL of the corresponding parameter value.
       const parameterURL = this.parameters[parameterName];

       // Pick depending on the attachment type.
       switch (EVENT_PARAMETER_TYPES[parameterName]) {

        // Type -1 prevents default without ever checking for a matching parameter.
        case -1:
         this[parameterName] = e => e.preventDefault()
         break

        // Type 0 doesn't cache the parameter value (an operation), but GETs it when the matching event is called.
        case 0:
         if (!parameterNames.includes(parameterName)) break
         this[parameterName] = event => GET(parameterURL)?.({ event })
         break

        /* For Type 1, this node does cache the value (even if what's cached is a very indirect reference),
           and needs to be told if ever that parameter value changes.
           
           This is done through a property matching the parameterName which is set to the named
            parameter's value every time that value is set from elsewhere. */
        case 1:
         if (!parameterNames.includes(parameterName)) break
         // Fetch the value and assign it to the self for the first time.
         this[parameterName] = GET(parameterURL)

         // Make sure we're tracking the url.
         if (!(parameterURL in PARAMETER_LISTENERS))
          PARAMETER_LISTENERS[parameterURL] = {}

         // This parameter URL is a value and goes by different parameter names for different nodes.
         // Make sure there is a set corresponding to the current parameter name
         if (!(parameterName in PARAMETER_LISTENERS[parameterURL]))
          PARAMETER_LISTENERS[parameterURL][parameterName] = new Set()

         // Finally, put this node in the set so it's 'listening' for changes to this parameter.
         PARAMETER_LISTENERS[parameterURL][parameterName].add(this)
         break
       }
      }
     }
    }
   }
  })
  /* Create the client-only/window-only event that triggers setup on the client side.
     This one assigns to the built-in javascript feature 'onload' which is an
     event that doesn't get called until the page's body node has been created. */
  onload = async () => {
   // Install the local server (or connect with the existing one). This allows saving and syncing state across tabs.
   const {
    waiting: w,
    installing: i,
    active: a = await new Promise(f => (w ?? i).onstatechange = ({ target: t }) => t.state === 'activated' ? f(t) : 0)
   } = await navigator.serviceWorker.register(location.origin + '/bootstrap.js')

   /* Inject the page's location into the body
      The body will then configure itself based on the parameters of that url.
      If that URL doesn't have parameters, a fallback set of parameters is used. */
   document.body.inject(location.href)

   setTimeout(() => {
    SET({ 'https://dev.core.parts/404/manifest': ['https://dev.core.parts/404/footer', 'https://dev.core.parts/404/crumbs', 'https://dev.core.parts/404/header'] })
   }, 3000)
  }
 } else {
  // We are on the server.
  onfetch = event => _({ fetch: event.request.url })
 }
}