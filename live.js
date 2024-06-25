{
 const

  // Temporary: create a function so I can pack base64 values into query strings.
  PACK = string => btoa(string).replaceAll('+', '%2B'),

  // For posterity. Currently unused.
  VERSION = 32 / 1000,

  // Determine whether script is running on the client or the serviceWorker.
  ENVIRONMENT = 'HTMLElement' in globalThis ? 'CLIENT' : 'SERVER',

  // For debug, create a passthru logger that doesn't take focus away from the code.
  _ = (..._) => (VERBOSE_LOGGING && (console.groupCollapsed(ENVIRONMENT, ..._), console.trace(..._), console.groupEnd()), _.pop()),

  // Create a master variable to control debug settings.
  DEBUG_MODE = false,

  // Create a variable to control the visibility of all debug logs that log through _().
  VERBOSE_LOGGING = DEBUG_MODE,

  // This is for debug. It shows each node's URL as an attribute in the DOM
  // (so they show up when inspecting the page using browser dev tools)
  URL_AS_ATTRIBUTE = DEBUG_MODE,

  // Create a function that takes in a value URL and percent-encodes it.
  $ = valueURL => encodeURIComponent(valueURL),

  // Create a function that takes in a $-encoded URL and unencodes it.
  $$ = valueURL => decodeURIComponent(valueURL),

  // Create the cache that stores all values (including metastrings) according to their HTTPS URL.
  CORE = {
   "https://dev.core.parts/test?": `data=${$(`data:;base64,${PACK(`:host { background: green }`)}`)}`,
   "https://dev.core.parts/globalThis?": "operation=globalThis",
   "https://dev.core.parts/document?": "operation=access&a=globalThis&b=data:,document",
   "https://dev.core.parts/body?": "operation=access&a=document&b=data:,body",
   "https://dev.core.parts/404/?": `childURLs=data:;operation=parse/list;base64,${PACK(`data:;tagname=${$(`data:,town-`)};childURLs=${$(`data:;operation=parse/list;base64,${PACK(`data:;tagname=${$(`data:,hero-`)};base64,${PACK(`He's not getting past me!`)}`)}`)};base64,${PACK(`We need a hero!<br>`)} data:;tagname=${$(`data:,villian-`)};base64,${PACK(`I'm on my way.`)}`)}&layout=layout`,
   "https://dev.core.parts/404/layout?": `operation=math/add&a=data:,&b=data:text/css;base64,${PACK(`:host { background: brown }`)}`,
   "https://dev.core.parts/operations/globalThis?": "expression=data:text/javascript;base64," + PACK(`globalThis`),
   "https://dev.core.parts/operations/assign?": "a=../globalThis&b=data:,hello&c=data:,world&expression=data:text/javascript;base64," + PACK(`a[b]=c`),
   "https://dev.core.parts/operations/access?": "a=data:;operation=parse/integer,6&b=data:;operation=parse/integer,3&expression=data:text/javascript;base64," + PACK(`a[b]`),
   "https://dev.core.parts/operations/math/add?": "a=data:;operation=parse/integer,1&b=data:;operation=parse/integer,2&expression=data:text/javascript;base64," + PACK(`a+b`),
   "https://dev.core.parts/operations/math/power?": "a=data:;operation=parse/integer,2&b=data:;operation=parse/integer,8&expression=data:text/javascript;base64," + PACK(`a**b`),
   "https://dev.core.parts/operations/math/log?": "a=data:;operation=parse/integer,8&b=data:;operation=parse/integer,2&expression=data:text/javascript;base64," + PACK(`Math.log(a)/Math.log(b)`),
   "https://dev.core.parts/operations/math/subtract?": "a=data:;operation=parse/integer,3&b=data:;operation=parse/integer,2&expression=data:text/javascript;base64," + PACK(`a-b`),
   "https://dev.core.parts/operations/math/multiply?": "a=data:;operation=parse/integer,2&b=data:;operation=parse/integer,3&expression=data:text/javascript;base64," + PACK(`a*b`),
   "https://dev.core.parts/operations/math/divide?": "a=data:;operation=parse/integer,6&b=data:;operation=parse/integer,3&expression=data:text/javascript;base64," + PACK(`a/b`),
   "https://dev.core.parts/operations/parse/integer?": "data=data:,3.14&radix=data:,10&expression=data:text/javascript;base64," + PACK(`parseInt(data,parseInt(radix))`),
   "https://dev.core.parts/operations/parse/float?": "data=data:,3.14&expression=data:text/javascript;base64," + PACK(`parseFloat(data)`),
   "https://dev.core.parts/operations/parse/list?": `data=data:,3%2014&delimiter=${$(`data:;base64,${PACK(' ')}`)}&expression=data:text/javascript;base64,${PACK(`data.split(delimiter)`)}`,
   "https://dev.core.parts/operations/parse/json?": "data=data:,3.14&expression=data:text/javascript;base64," + PACK(`JSON.parse(data)`),
  },

  // Create a listener object where concerned objects can
  // put a reference to themselves in a set indexed by the url of
  // the value of the property. When that value changes,
  // it will look here for the set of all nodes to set
  // the property on.
  TRACKING_RECIEVER = {},

  // Create a cause and effect network that maps
  // value URLs to the value URLs that generated them
  // This allows updating existing runtime values when their definitions change.
  FX = {

  },

  // Create a function to register cause-effect linkages between URL pairs
  REGISTER_CAUSALITY = (causeURL, effectURL) => {

   // Make sure they really are urls.
   if (typeof causeURL !== 'string' || typeof effectURL !== 'string')
    throw `RegisterCausalityError: One or both urls are not a string. causeURL: ${typeof causeURL}, effectURL: ${typeof effectURL}`

   // Do not remember causality for data URIs.
   if (causeURL.startsWith('data:') || effectURL.startsWith('data:'))
    return

   // If this cause has never been seen before, create it's FX set.
   if (!(causeURL in FX))
    FX[causeURL] = new Set()

   // Register the relationship by adding the effectURL into causeURL's set. 
   FX[causeURL].add(effectURL)
  },

  /* Create a recursive function that takes a request and creates the corresponding value
     by applying an operation to one or more other values using the same request process.
     It injects a history modification scheme which keeps runtime objects up to date with
     the code that generated them despite changes made to that code after the objects
     were created. */
  GET = (requestURL, skipCache) => {

   // Don't respond to a blank request.
   if (!requestURL)
    throw `GetError: Bad request URL. (${requestURL === undefined ? 'undefined' : 'empty string'})`

   // Don't allow non-string
   if (typeof requestURL !== 'string')
    throw `GetError: Request URL must be a string. (got ${typeof requestURL})`

   if (requestURL.includes(' '))
    throw `GetError: malformed URL includes a space. (${requestURL})`

   // Check cache for the value first, if allowed.
   if (!skipCache && requestURL in CORE)
    return _(requestURL, 'y (cache)', CORE[requestURL])

   // This is for debug only.
   if (money-- <= 0)
    throw `MoneyError: Please get more money, Eric. ${requestURL}`

   const
    // Check if the URL uses our custom URI scheme.
    useMetaProtocol = requestURL.startsWith('meta:'),
    // Break down the URL into it's components
    { protocol: scheme, origin, pathname, searchParams, hash } = new URL(
     // Remove the CORE protocol prefix if it was there.
     requestURL = requestURL.slice(useMetaProtocol ? 'meta:'.length : 0)
    ),
    // Get the request URL without params or hash.
    requestBaseURL = origin + pathname;

   // Temporarily warn that we don't process input params yet.
   if (searchParams.size !== 0) {
    console.warn(`Warning: Request meta are not yet supported. (${requestURL})`)
    requestURL = requestBaseURL
    if (!skipCache && requestURL in CORE)
     return _(requestURL, 'y (cache)', CORE[requestURL])
   }

   // Choose behavior depending on the URI scheme.
   switch (scheme) {

    // data: describes magic values.
    case 'data:': {

     // Throw error if data URI is missing a comma
     if (!requestURL.includes(','))
      throw `GetError: Encountered datauri with no comma. (${requestURL})`

     const
      // Use a regular expression to validate and group the datauri characters.
      match = requestURL.match(/^^data:([^;,/]+\/[^;,]+)?((?:;[^;,]+=[^;,]*)*)(;base64)?,(.*)$/),
      // Capture the parts of the datauri
      [, mediatype = 'text/plain', mediaParameters = '', base64Mark, encodedBody] = match ?? [];

     // Throw an error if the match didn't come through.
     if (!match)
      throw `GetError: Datauri couldn't be parsed. (${requestURL})`

     // Extract the entries from the string.
     // The first entry will always be empty and must be removed because the
     //  meta string is always either empty or begins with a semicolon.
     entries = mediaParameters.split(';').map(entryString => entryString.split('=')).slice(1),

      // Turn the entries into an object
      meta = MAKE_META(entries, requestURL)

     // If the character set is not specified, it's US-ASCII
     if (!('charset' in meta))
      meta['charset'] = 'US-ASCII'

     // Don't allow 'data' or 'mediatype' attributes to be already assigned.
     //  Instead, it is always a copy of the URI's body and it's known mediatype as a simple literal string.
     if ('data' in meta)
      throw `GetError: For now, the 'data' attribute is reserved in datauri. (${requestURL})`

     if ('mediatype' in meta)
      throw `GetError: For now, the 'mediatype' attribute is reserved in datauri. (${requestURL})`

     // Set it on meta to pass it to the operation or as meta.
     meta['data'] = 'data:' + (base64Mark ?? '') + ',' + encodedBody
     meta['mediatype'] = 'data:,' + mediatype


     // If the request used the meta: prefix, cache and return the meta of the file.
     if (useMetaProtocol) {
      // Readd the prefix to distinguish meta from value
      requestURL = 'meta:' + requestURL
      return CORE[requestURL] = _(requestURL, meta)
     }

     // If there is an operation, get our value by applying it.
     if ('operation' in meta) {

      // Cache and return the value created by applying the operation.
      return CORE[requestURL] = _('operation (data)', APPLY(meta))
     }

     // If not, cache and return the body.
     return CORE[requestURL] = _('data',
      // If the body is base64 encoded, decode it before returning.
      base64Mark ? atob(encodedBody) : encodedBody
     )
    }

    // https: describes everything but magic values
    case 'https:': {

     // For all https: values, the source of truth is the meta string (if one exists).


     // Create the meta's string URL by simply adding a question mark.
     const queryURL = requestBaseURL + '?'

     // We only want the meta because there's no value at the given location.
     // If there's also no meta, the value is undefined. Return and cache undefined.
     if (!(queryURL in CORE))
      return CORE[requestURL] = _(`404 undefined. (${requestURL})`, undefined)

     // When the meta string (located at queryURL) changes,
     //  the value (located at requestURL) might change too.
     REGISTER_CAUSALITY(queryURL, requestURL)

     // The meta object, which is parsed from the meta string, certainly might change.
     REGISTER_CAUSALITY(queryURL, 'meta:' + requestURL)

     // Make the meta.
     const
      query = CORE[queryURL],
      entries = query.split('&').map(entryString => entryString.split(/(?<=^[^=]*)=/)),
      meta = MAKE_META(entries, requestBaseURL)

     // Choose behavior depending on which meta are found.
     switch (true) {
      // If the request used the meta: prefix, cache and return the meta of the file.
      case useMetaProtocol:
       // Readd the prefix to distinguish from the cached value
       requestURL = 'meta:' + requestURL
       return CORE[requestURL] = _(requestURL, meta)

      // If there is an operation in the meta, apply it to the meta.
      case 'operation' in meta:

       // Track the cause and effect first.
       for (const valueURL of Object.values(meta))
        REGISTER_CAUSALITY(valueURL, requestURL)

       // Cache and return the result of applying the operation.
       return CORE[requestURL] = _(requestURL, APPLY(meta))

      // If instead there's an expression, this is an operation.
      case 'expression' in meta:
       // postfx:
       //         if expression attribute kicked, each result of me is kicked @operation
       //         else each result which used the default meta which has changed is kicked @operation

       // Track the cause and effect first.
       for (const valueURL of Object.values(meta))
        REGISTER_CAUSALITY(valueURL, requestURL)

       // Cache and return the operation made using the meta
       //  as the expression and the body as the default arguments.
       return CORE[requestURL] = _(requestURL, MAKE_OPERATION(meta))

      // If instead there's a data attribute, treat that as the body.
      case 'data' in meta:

       // Track the cause and effect first.
       REGISTER_CAUSALITY(meta.data, requestURL)

       // Cache and return the raw data string
       return CORE[requestURL] = _('data passthru', requestURL, GET(meta.data))

      // Anything else is undefined right now.
      default:
       return _(requestURL, undefined)
     }
    }

    // If it's another scheme, throw an error.
    default:
     throw `GetError: The requestURL uses an unsupported URI scheme "${scheme}". (${requestURL})`
   }
  },

  // Create a function that turns a meta into an operation.
  MAKE_OPERATION = defaultMeta => {
   /* Running an operation requires
       1. An expression with some variables
       2. Default values for all those variables
       3. Optional runtime values to replace those defaults
       
      We combine items 1 and 2 once to create the operation.
      We merge in a different item 3 every time we run the operation. */

   // Get the expression itself.
   const
    expressionURL = defaultMeta['expression'],
    expression = GET(expressionURL);

   // Throw an error if the expression didn't come out.
   if (!expression)
    throw `MakeOperationError: Missing or empty expression (${expressionURL})`

   // Create some empty arrays to store the default meta's names and values in a reliable order.
   const attributesInOrder = Object.keys(defaultMeta)

   // Make sure each name is a valid javascript identifier.
   for (const attribute of attributesInOrder) {

    // Throw an error if the name isn't a valid identifier.
    if (!/^(?:[a-zA-Z$_]+[0-9]*)+$/.test(attribute))
     throw `MakeOperationError: '${attribute}' is not a valid attribute for expression (${expressionURL})`

    // Throw an error if the name is a reserved keyword in javascript.
    if (["instanceof", "typeof", "break", "do", "new", "var", "case", "else", "return", "void", "catch", "finally", "continue", "for", "switch", "while", "this", "with", "debugger", "function", "throw", "default", "if", "try", "delete", "in"].includes(attribute))
     throw `MakeOperationError: '${attribute}' cannot be used as an attribute for expression (${expressionURL})`
   }

   // Create the operation's core function, which never changes.
   const DO = _('operation', new Function('$_EXPRESSION', '$_DEFAULT', '$_INPUT', ...attributesInOrder, 'return ' + expression))

   // Return a function which merges an arbitrary runtime params object (if that's what $_ARG[0] is) with the defaults.
   return runtimeMeta => DO({ BODY: expression, REQUEST_URL: expressionURL }, defaultMeta, runtimeMeta, ...attributesInOrder.map(attribute => GET(runtimeMeta?.[attribute] ?? defaultMeta[attribute])))
  },

  // Create a function that turns an array of entries into a meta.
  MAKE_META = (entries, url) => {

   // Begin with the empty meta object.
   const
    meta = {},
    baseURL = url.startsWith('data:') ? 'https://dev.core.parts/' : url;

   /* Expand each url in the incoming entires, resolving it's modified
      relative value URL (https relative url with rest '...' operator)
      to an absolute https:// address (standard form)
      The order they are listed in the entries matters here -
      the paramter resolving operation is not commutative, thanks to the possibility
      of some meta listed later (especially rest meta) of replacing
      the value of the same attribute listed earlier.
      As is the standard, the final value given for any
      attribute listed twice is the only one used for that attribute. */

   for (const [attribute, valueURL] of entries) {

    // Throw an error if a reserved keyword was used.
    if (attribute === 'meta' || attribute === 'url')
     throw `MakeMetaError: attribute name "${attribute}" is reserved. { ${baseURL}: ${JSON.stringify(meta)} }`

    if (valueURL === undefined)
     throw `MakeMetaError: attribute "${attribute}" has undefined value URL which is not allowed. ${url} `

    // Either expand the meta as a set because it has a rest operator ('...')
    if (attribute.startsWith('...')) {

     // GET the meta given by the attribute name, minus the three dots
     const restMeta = GET('meta:' + new URL(attribute.slice(3), url))

     // Assign all meta to the one under construction.
     Object.assign(meta, restMeta)

     continue
    }

    // Or else the final base url will depend on whether the attribute is 'operation' or not. 
    const finalBaseURL = attribute === 'operation' ? 'https://dev.core.parts/operations/' : baseURL;

    // The resolved URL is the absolute path to the value
    // Set it on the meta object currently under construction.
    if (valueURL.startsWith('data%3A')) {
     meta[attribute] = $$(valueURL)
    } else if (valueURL.startsWith('data:')) {
     meta[attribute] = valueURL
    } else if (valueURL.startsWith('https%3A')) {
     meta[attribute] = new URL($$(valueURL), finalBaseURL).href;
    } else {
     meta[attribute] = new URL(valueURL, finalBaseURL).href;
    }
   }

   // Assign metauri and own url to the meta and return it.
   return meta// Object.assign(meta, { meta: 'meta:' + url, 'self': url })
  },

  // Create a function that applies an operation, embedded in a meta, to the meta itself.
  APPLY = meta => {
   // Get the operation itself.
   const
    operationURL = meta['operation'],
    operation = GET(operationURL);

   // Throw an error if the operation didn't come out.
   if (!operation)
    throw `ApplyError: Missing operation. (${operationURL})`

   // Apply the operation to the meta and return the result.
   return operation(meta)
  },

  // Create a function that sets core entries directly to the given values.
  SET = incomingCorePatch => {

   const
    // Keep track of the already set patch.
    lockedCorePatch = new Set(),

    // Create a function to recurse the causality pathways.
    updateRecursive = causeURLs => {

     // For each of the incoming set of cause URLs ...
     for (const causeURL of causeURLs) {

      // Don't update the same url twice.
      if (causeURL in lockedCorePatch)
       continue

      // Check if the affected urls changed and need to be notified.
      const
       existingValue = CORE[causeURL],
       incomingValue = causeURL in incomingCorePatch ? incomingCorePatch[causeURL] : GET(causeURL, true)

      if (existingValue !== incomingValue) {

       // Cache the new value on the core.
       CORE[causeURL] = incomingValue;

       // Update anyone listening to the cause's URL and assign the value to whatever attribute they attached to
       if (causeURL in TRACKING_RECIEVER)
        Object.entries(TRACKING_RECIEVER[causeURL]).forEach(([attribute, nodeset]) => nodeset.forEach(node => node[attribute] = incomingValue))
      }

      // Track the url so we won't update it again.
      lockedCorePatch.add(causeURL)

      // Continue recursively.
      if (causeURL in FX)
       updateRecursive(FX[causeURL])
     }
    }

   // Call the recursive function for the first time.
   updateRecursive(Object.keys(incomingCorePatch));
  }

 // This is for debug only.
 var money = 50

 if (ENVIRONMENT === 'CLIENT') {

  // We are on the client and need to give injection functionality to all HTML elements.
  const

   // Create a node pool to track all created HTML elements.
   NODE_POOL = {},

   // Create a list of certain keyboard and mouse events that are also attributes that indicate that a node can be focused on.
   FOCUS_EVENTS = ["onfocus", "onpointerdown", "onclick", "oncontextmenu", "onblur"],

   // Create a map of attributes to event handling styles, telling HTML elements in the pool which properties are managed by attribute values and how.
   EVENT_ATTRIBUTE_TYPES = { onkeydown: 0, onkeyup: 0, onclick: 0, onwheel: 0, oncontextmenu: 0, onpointerdown: 0, onpointerup: 0, onpointermove: 0, ondblclick: 0, onfocus: 0, onblur: 0, layout: 1, childURLs: 1, data: 1, ondragstart: -1 }

  // Empower any HTMLElement to be controlled by this script via GET and SET
  Object.defineProperties(HTMLElement.prototype, {
   // Injecting the node sets it up for everything else, allowing us to track it, sync it, and recycle it via the pool.
   inject: {
    get() {
     return assignedURL => {

      // Prevent duplicate data injection
      if ('url' in this)
       throw new TypeError(`cannot inject node twice (injected as ${this.url}, tried to inject as ${assignedURL})`)

      const
       // Create a cascading stylesheet for the encapsulated layout of the node.
       layoutContainer = new CSSStyleSheet(),
       // Prepare a URL for fetching the attributes and values (meta) of this node's assigned URL
       metaURL = 'meta:' + assignedURL,
       // Prepare the fallback URL in case no meta comes back
       fallbackMetaURL = 'meta:https://dev.core.parts/404/',
       // Don't track causality if this node comes from a datauri.
       // The meta of a datauri cannot change without the datauri changing.
       // A different uri always generates a different node.
       trackCausality = !assignedURL.startsWith('data:'),
       // Create a function for populating this node's attributes based on
       //  incoming meta.
       populate = incomingMeta => {

        // Prepare to assign all relevant attributes from the meta.
        const attributes = Object.keys(incomingMeta)

        // If certain keyboard and mouse event meta are present, assign a tab index to make the node 'focus'-able. 
        // TODO: override attributes like this from the meta
        if (attributes.some(attribute => FOCUS_EVENTS.includes(attribute)))
         this.tabIndex = 0

        // Go over the predefined common node attributes and attach to
        //  each node event according on it's "event attribute type."
        //  TODO: brainstorm cool alternatives
        for (const attribute in EVENT_ATTRIBUTE_TYPES) {

         // Get the URL of the attribute's given value.
         const valueURL = incomingMeta[attribute];

         // Pick depending on the attachment type.
         switch (EVENT_ATTRIBUTE_TYPES[attribute]) {

          // Type -1 prevents default without getting a value.
          case -1:
           this[attribute] = e => e.preventDefault()
           break

          // Type 0 doesn't track causality on the value (which should be an operation),
          //  but instead GETs it and forgets it whenever the matching event is called.
          // These operations in particular are able to call SET on other values,
          //  turning HTMLElements into human interface controllers for the CORE. 
          case 0:
           if (!attributes.includes(attribute)) break
           this[attribute] = event => GET(valueURL)?.({ event })
           break

          /* For Type 1, this node does cache the value (even if what's cached is a very indirect reference),
             and needs to be told if ever that value changes.
             
             This is done through a property matching the attribute which is set to the 
              value URL's corresponding value every time that value is SET. */
          case 1:
           if (!attributes.includes(attribute)) break

           // Fetch the value and assign it to the self for the first time.
           this[attribute] = GET(valueURL)
           console.log({ value: this[attribute], attribute, valueURL })
           // Similar to the node and it's assigned URL, the attribute doesn't track causality.
           //  if its valueURL is a datauri. Datauris can't change when their value changes.
           if (!valueURL.startsWith('data:')) {
            const
             reciever = TRACKING_RECIEVER[valueURL] ??= {},
             nodeset = reciever[attribute] ??= new Set();

            if (!nodeset.has(this))
             nodeset.add(this)
           }
         }
        }
       }


      // Set the node up with settable attributes that work for
      //  both first-time setup and causality updates.
      Object.defineProperties(this, {
       url: { value: assignedURL, writable: false, configurable: false, enumerable: true },
       shadow: { value: this.attachShadow({ mode: "closed" }), writable: false, configurable: false },
       fallbackMeta: {
        // Just like meta, but fetches the hardcoded fallbackURL and 
        //  doesn't have a fallback of it's own.
        //  todo: even more hard-coded (like right here) metafallback
        set(fallbackMeta) {

         if (trackCausality) {
          const
           reciever = TRACKING_RECIEVER[fallbackMetaURL] ??= {},
           nodeset = reciever.fallbackMeta ??= new Set();

          if (!nodeset.has(this))
           nodeset.add(this)
         }

         populate(fallbackMeta)
        }
       },
       meta: {
        // Set the meta to populate the page.
        get() { return meta },
        set(meta) {

         if (trackCausality) {
          const
           reciever = TRACKING_RECIEVER[metaURL] ??= {},
           nodeset = reciever.meta ??= new Set();

          if (!nodeset.has(this))
           nodeset.add(this)
         }

         // Find out if we need to use the fallback meta.
         if (meta === undefined) {
          this.fallbackMeta = GET(fallbackMetaURL)
          return
         }

         populate(meta)
        }
       },
       layout: { set(cssString) { layoutContainer.replaceSync(cssString) } },
       childURLs: {
        // The childURLs is simply the list of child nodes (by relative or absolute URL)
        //  that must currently be parented to the shadow.
        set(incomingChildURLs) {

         // This setter defines an algorith that determines the
         //  inserts/rearranges/removals needed to make the existing node
         //  list match the incoming node list.

         // Throw an error if incomingChildURLs isn't an array.
         if (!(incomingChildURLs instanceof Array))
          throw `HTMLElementError: childURLs must be a list of URLs. Got type "${typeof incomingChildURLs}." (${incomingChildURLs}) (${this.url})`

         // Get the current children.
         const currentChildren = [...this.shadow.children]

         // If the new list is empty, remove all the children.
         if (incomingChildURLs.length === 0) {
          currentChildren.forEach(x => x.remove())
          return
         }

         // Otherwise, get all their URLs to compare with the incoming list.
         const existingChildURLs = currentChildren.map(currentChild => currentChild.url)

         // If it's already the same, nothing changes.
         if (existingChildURLs.join(" ") === incomingChildURLs.join(" "))
          return

         // Prepare to compare an existing and incoming URL at each array index.
         let childIndex = -1;

         for (let childIndex = 0; childIndex <= Math.min(existingChildURLs.length, incomingChildURLs.length);)

          // For each index where there is both an existing and an incoming URL specified...
          while (existingChildURLs.length && incomingChildURLs.length) {

           // Increase the index by one.
           childIndex++
           const
            existingChildURL = existingChildURLs.shift(),
            incomingChildURL = incomingChildURLs.shift()

           // If the two URLs at the current index are not the same...
           if (existingChildURL !== incomingChildURL) {

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
       },
       data: {
        // This is a temporary, but simple, way of adding an HTML string to the shadow.
        set(data) {
         // Do use this technique if shadow has children.
         if (this.shadow.children.length)
          return

         this.shadow.innerHTML = data
        }
       },
       install: {
        // Install adds a new node to the shadow (or recycles one from the node pool) with the given URL.
        get() {
         return (incomingChildURL, index) => {

          // Validate the url.
          if (!incomingChildURL)
           throw new TypeError(`install url cannot be ${incomingChildURL === undefined ? "undefined" : incomingChildURL === "" ? "an empty string" : `"${incomingChildURL}"`} (installing <${this.tagName}> on ${this.incomingChildURL})`)

          const absoluteChildURL = incomingChildURL.startsWith('data:') ? incomingChildURL : new URL(incomingChildURL, this.url).href;

          // Try and find a matching node in the pool that isn't being used.
          let node = (absoluteChildURL in NODE_POOL ? [...NODE_POOL[absoluteChildURL]].find(x => !x.isConnected && !x.parentNode) : undefined);

          // If there is no node, we need to make one.
          if (node === undefined) {

           // Create the new node's tag name
           const
            tagWord = absoluteChildURL.match(/https:\/\/[^\/]*\/(?:[^\/]*\/)*((?:[a-zA-Z$_]+[0-9]*)+)(?:\/[^\/]*)?$/)?.[1],
            tagName = tagWord ? (tagWord.includes('-') ? tagWord : tagWord + '-') : 'node-',
            childMeta = GET('meta:' + incomingChildURL),
            finalTagName = ('tagname' in childMeta ? GET(childMeta['tagname']) : undefined) ?? tagName;

           // Create a new HTMLElement.
           node = document.createElement(finalTagName)
          }

          if (index < this.shadow.children.length)
           // Install the node at a specific place ...
           this.shadow.insertBefore(node, this.shadow.children[index])

          else
           // ... or add it as the last child.
           this.shadow.appendChild(node)

          // Do the injection if needed.
          if (!('url' in node))
           node.inject(absoluteChildURL)
         }
        }
       }
      })

      if (URL_AS_ATTRIBUTE)
       this.setAttribute('data-url', assignedURL)

      // Make the shadow adopt the new stylesheet.
      this.shadow.adoptedStyleSheets.push(layoutContainer)

      // If the nodepool doesn't have a set for this url yet, add it.
      if (!(assignedURL in NODE_POOL))
       NODE_POOL[assignedURL] = new Set()

      // Add the injected node to the set of managed nodes in the pool for this url.
      NODE_POOL[assignedURL].add(this)

      this.meta = GET(metaURL)
     }
    }
   }
  })
  /* Create the client-only/window-only event that triggers setup on the client side.
     This one assigns to the built-in javascript feature 'onload' which is an
     event that doesn't get called until the page's body node has been created. */
  onload = async () => {
   /*// Install the local server (or connect with the existing one). This allows saving and syncing state across tabs.
   const {
    waiting: w,
    installing: i,
    active: a = await new Promise(f => (w ?? i).onstatechange = ({ target: t }) => t.state === 'activated' ? f(t) : 0)
   } = await navigator.serviceWorker.register(location.origin + '/beauty.js')*/

   /* Inject the page's location into the body
      The body will then configure itself based on the meta of that url.
      If that URL doesn't have meta, a fallback set of meta is used. */
   document.body.inject(location.href)

   setTimeout(() => {
    SET({ "https://dev.core.parts/404/?": `childURLs=data:;operation=parse/list;base64,${PACK(`data:;tagname=${$(`data:,bank-`)};childURLs=${$(`data:;operation=parse/list;base64,${PACK(`data:;tagname=${$(`data:,guard-`)};base64,${PACK(`Reconfigured!`)}`)}`)};base64,${PACK(`We need a hero!<br>`)} data:;layout=${$(`https://dev.core.parts/test`)};tagname=${$(`data:,robber-`)};base64,${PACK(`<br>The matrix has <i>spoken</i>. <code><b>PREPARE YOUR SOUL</b></code>`)}`)}&layout=layout` })
    setTimeout(() => {
     SET({ "https://dev.core.parts/test?": `data=${$(`data:;base64,${PACK(`:host { background: brown }`)}`)}` })
    }, 3500)
   }, 3500)

   console.warn(`TODOs\n\t- Meta2+\n\t- unset listeners removed by changed OR deleted meta\n\t- Change to value of A at uri Au affects another value B at Bu if A is used as operator or operator argument for a datauri which is embedded as a value (direct or indirect) in B still needs to track their causality.`)
   console.log({ FX, NODE_POOL, CORE, TRACKING_RECIEVER })
  }
 } else {
  // We are on the server.

  // Fetch the home page. 
  onfetch = event => _({ fetch: event.request.url })
 }
}

// TODO: operation continuation attribute. 
// Given this attribute and an operator, operator must return a meta, and that meta is treated just like the one that produced it.