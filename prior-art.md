## Prior Art
### About this document
The project is still in a chaotic stage of development. I would like to freely explore its potential. This code repository including documentation (including this document), acts as prior art for the greater purpose I am working towards.

### Project purpose
I want everyone to have free, public domain access to powerful development tools like efficient problem solving algorithms, a fast and easy-to-use build framework, code libraries and multimedia assets like fonts and icons.

The purpose of this project is to bring together as many relevant features as possible into a single operating system designed to allow things to be decomposed into their parts and reassembled in new ways (like LEGO®).

People should be able to rapidly prototype different compositions of assets to create fully-featured data-driven experiences. The only expense for small-scale app deployment should be the cost of the domain name.

I believe a global data type schema that changes infrequently would enable aggressive caching strategies that can lower the cost of cloud deployment. I am exploring the potential for highly optimized data encoding and mathematical formalisms which may provide new opportunities for incorporating the DNS deeper into the development process.

### Framework
#### Existing features
This repo already brings together lots of features and notions. To list them all is not possible as they are frequently changing. Here is a list of just some of the features that are currently implemented and likely to remain part of the project going forward:

- a unique social sharing paradigm that
  - allows users to create content offline
  - allows users to share public links to their work without uploading anything
  - doesn't have a central database and doesn't allow users to upload anything 
- a highly versatile base-conversion algorithm
- a single global type schema comprised of many useful types
- maximally space efficient URL coding for data of any type
- an intuitive and formalized 'part' concept which
  - allows data types to be decomposed and recomposed into new ones
  - maintains optimal space efficiency as part assemblies scale
- a virtual machine
  - composed of parts
  - whose entire state can fit in the URL
  - which makes itself available across four environments:
    1. the cloud build process where it
      - packs together remote type definitions
      - deploys itself as a static asset
      - deploys itself as a serverless function
    2. the cloud serverless function where it
       - serves inlined HTML and CSS for instant page rendering
       - provides first-time visitors with a smooth installation process
       - provides SEO for search crawlers that don't understand client-rendered SPAs
    3. client service worker which
       - keeps the app forever offline
       - leaves the why and how of software updates to the browser
         - automatic service worker updates are mandatory and can't be disabled anyways
         - automatic service worker updates are the only browser activity that should generate traffic to the static asset server and serverless function
       - caches the entire type schema
         - the latest schema across all domains is packed together into the service worker and both receive assigned the new version number
    4. the client to where it
         - hydrates any statically-generated content
         - efficiently manages the DOM
         - keeps the URL in sync with the app state as often as it can
           - this is throttled just enough to prevent the browser from applying its own, even more aggressive throttling
- an operating system
  - which runs on the machine
  - whose entire state fits in a URL
    - which means it inherently offers comprehensive deep-linking
  - which can hide itself to create kiosk-like presentations for its running apps
- automatic semantic versioning
- quine-like self-outputting
- the ability to pack
  - all its type assets into a single file
  - a subset of the type assets into a single class source file
  - source mapping for tracing all packed scripts to their sources
- a handful of example applications each with their own features


##### Example Applications
This project includes example applications that serve as prior art for their features and the obvious extensions and future applications they inspire. For example:
- An operating system that, like $`\textcolor{#AA8866}{\text{"www.desktop.parts"}}`$ can store its entire runtime state including the state of all of its running tasks in a short string such as a URL.
- A document editor and/or library that, like $`\textcolor{#AA8866}{\text{"www.kireji.io"}}`$, assigns a URL to and optionally allows the direct editing of every
  - word
  - haiku
  - multi-word expression (MWE)
  - linguistic pattern such as
    - every word x depicted in every color y
    - every poem x depicted in every font y
    - every phrasal template x populated with the given expressions Y
    - every phrasal template x along with the opportunity for a user to populate it with words, haikus, MWEs, or phrasal templates such as those
      - selected from a pre-defined list or dictionary
      - user-submitted as an appendix to a pre-defined list or dictionary
      - user-submitted as a "staged change" to a pre-defined list or dictionary
      - user-submitted as plain text for the purpose of populating a phrasal template
      - etc
    - etc.
  - etc.
- A development environment app that, like $`\textcolor{#AA8866}{\text{"www.core.parts"}}`$, can 'look at itself' by assigning a URL to and optionally allowing the direct editing of every state of every data type and component defined by a repo, database, or the DNS including a URL to every piece of meta-information about or simulation of every state of another app (or itself, such as would require a special encoding scheme to avoid infinite recursion).
- Any of the many other obvious applications inspired by the principles that enable this project to work, such as
  - a way to browse or link to every character sequence
  - a way to browse or link to every vector path
  - a way to browse or link to every outfit possible with a given collection of clothing items
  - a way to browse or link to every possible arrangement of a given collection of interior decorations and furniture
  - a way to enumerate (such as to find, index, compare and contrast) a collection of approaches to solving the same computational problem
  - etc.
- A blog or editorial website that, like $`\textcolor{#AA8866}{\text{"www.ejaugust.com"}}`$, presents text content and includes a method of embedding one or more interactive content elements so that the URL of the content in which the elements are embedded is 'aware' or 'reactive' to the state of the embedded element(s) themselves.
- A static website that, like $`\textcolor{#AA8866}{\text{"www.orenjinari.com"}}`$, presents a third party's own design at their own domain by incorporating it into the global type schema. This gives it access to all other types in the schema and makes all of its content openly available to all other types in the schema, as long as the type graph remains acyclic.
- The above use cases used in tandem with a search-result style list (such as a paginated list of links) that allows enumerating and scrolling through, browsing or searching for every value of a given type especially when generated automatically by a schema.
- The above use cases used in tandem with the express purpose of creating a self-hosted self-editing application whether it needs to be rebuilt to reflect changes or updates itself in real-time in response to source code or art asset modifications.
- The above use cases used in tandem with a git-like staging and committing system.
- The above use cases used in tandem with intentional constraints like [no writing with the letter e](https://en.wikipedia.org/wiki/Gadsby_(novel)) or painting with restrictions on color palettes especially when these limitations offer an appealing means of reframing a limit on the cardinality of a data type as a desirable feature.
- The above use cases used in tandem with periodic types with non-finite cardinality (rather than or in addition to types with finite cardinality).
- A video library or video streaming platform that, like $`\textcolor{#AA8866}{\text{"www.glowstick.click"}}`$, assigns a URL to and optionally allows the direct editing of every
  - segment ("subset" or "clip") of every video
  - scene of every title
  - act of every movie
  - episode of every show
  - frame of every segment
  - details page of every episode, show, title, etc.
  - way of sorting and viewing the library items
  - etc.
- A device that
  - contains only the minimal bootstrap
  - compiles the rest of its operating system from information on the DNS and/or a server
  - has the ability to enter into a certain physical state in response to network interaction

#### Extensions
Here, I have listed some extensions I'm developing or investigating. This serves to establish prior art for these endeavors and the wide field of obvious extensions that they inspire:

- Storing a type schema or some or all information about one (including but not limited to a global type schema like that used in this project) on the DNS.
- Storing a framework or some or all information about one (including but not limited to the framework in this repo) on the DNS, such as:
- a project management, work-tracking and debugging platform that leverages having a permalink to every state, like
  - the ability to perform rapid fuzz testing with
    - random URLs
    - URLs generated by an effective procedure
  - curated lists of URLs representing the point just before or during a certain event
  - fast, reliable, integrated QA procedures and reporting such as
    - a bug report ticket that includes URLs that deep-link directly to the bugged state of the application
    - a bug report ticket which is named after or otherwise categorized by the type schema
  - cloud building capabilities and data
  - quine-like self-outputting capabilities
  - etc.
- Storing any of the aforementioned information in a database.
  - for example, to allow users to curate it.
  - for example, to offer domain name services alongside it.
  - etc.
- Resolving some or all information from the DNS at build time.
- Resolving some or all information from the DNS at run time.
- Using these methods in combination with normal DNS registry or registrar services.
- Using these methods to compress:
  - files or configuration information for DNS
  - files or configuration information for HTTP/S
  - It's own source files or other plain text files
  - Binary files like multimedia
  - Entire applications and schemas (such as the applications and global schema of this project)
  - etc.
- Using these methods within a stand-alone application, such as:
  - a stand-alone application that doesn't require a browser
  - a stand-alone application that is a browser
  - a stand-alone application that looks or feels like a browser
  - a stand-alone application that renders information stored on the DNS
  - a stand-alone application that only requires a small bootstrap and the DNS to begin browsing.
  - etc.
- A system in which each domain owner curates type definitions associated with the domain(s) they own.