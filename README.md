<sub><i>© 2013 - 2025 Eric Augustinowicz. All Rights Reserved.</i></sup>
# [Static Client-Rendered Web Applications With a URL to Every State](https://github.com/EJAugust/EJAugust)
This project is a JavaScript framework that uses Vercel to cloud-build a [static](https://en.wikipedia.org/wiki/Static_web_page) [single-page](https://en.wikipedia.org/wiki/Single-page_application) [progressive web application](https://en.wikipedia.org/wiki/Progressive_web_app) with [server-side](https://www.patterns.dev/react/client-side-rendering/) and [client-side](https://www.patterns.dev/react/client-side-rendering/) file rendering. The framework creates a virtual-machine that encodes its entire state as a [URI](https://datatracker.ietf.org/doc/html/rfc3986):
```
╭─────────────────────────────────────────────╮
│ https:// www.example.com / ghc3whi45g4w3... |
╰─────────────────────────────────────────────╯
                      Task / State
```

The framework creates a virtual machine that includes an operating system with standard features like opening multiple applications at once, switching between tasks with a taskbar, and the ability to explore and edit files and folders.

Using a straightforward approach, all user-configurable information in the operating system (such as which windows were open and what content was visible in each apps) can be compressed into a single URL in real-time with optimal space efficiency.

In a URI, the [fragment](https://datatracker.ietf.org/doc/html/rfc3986#section-3.5) allows more special characters than the [path](https://datatracker.ietf.org/doc/html/rfc3986#section-3.3). However, Google's search engine crawler [doesn't support fragments](https://developers.google.com/search/docs/crawling-indexing/url-structure) so this framework uses the path. This project is currently in alpha, so this and other details are subject to change as I do more research.

The domain name of the URI corresponds to the type of application which is currently set as the live wallpaper of the operating system.

This repo contains the source code for all the data types, organized by domain name. Together, they create the virtual machine which the framework packs into a single source-mapped script.

The operating system can run multiple small-scale, feature-rich web apps (such as a short-form document editor or an icon painting utility).

That URL can then be shared which effectively shares all the app content even though the user never uploaded anything.

By closing all apps except one, the user can create more advanced content in the given app without running out of URL space. By putting an app into "wallpaper" mode and closing all windows, the user can obtain an appealing full-screen form of the content that retains some menu controls and which can then be shared as a message or e-card.

As mentioned, the project is still in alpha. See below for the [roadmap](#roadmap) and [live demos](#live-demos).

## Method
As an array of characters, a pathname segment can be considered a [numeral](https://en.wikipedia.org/wiki/Positional_notation) representing an integer $`n < k_{\text{max}}`$ in some base $`b`$. This framework uses an alphabet of $`b = 69`$ characters and creates variable-length pathname segments up to 250 characters long. This provides a per-segment routing cardinality of $`k_{\text{segment}} = (69^{251}-69)/68 ≈ 5.23 * 10^{459} ≈ 2^{1527}`$ or about 1527 bits of storage space.

In the same way that a pathname is an array of characters, object types in this framework are an array of simpler types. Just like the pathname, an object $`O`$ of type $`T_O`$ exists in one of $`k_{T_O}`$ states and represents a positive integer $`n < k_{T_O}`$. When $`O`$'s properties change, so does $`n`$.

A [perfect hash function](https://en.wikipedia.org/wiki/Perfect_hash_function) $`\text{pathname} \xleftrightarrow{} \text{object state}`$ is computed in a manner similar to a numeral [base conversion](https://en.wikipedia.org/wiki/Positional_notation#Base_conversion).

Every type is identified by a unique domain name which, combined with a pathname, provides a URL for every instance of every data type.

$`\begin{alignat}{3} &{{u_T}_v}_n &\xleftrightarrow{} &(\;\text{d}_T, \text{v}, n_0, n_1, \ldots, n_m\;) \\ \textcolor{grey}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com/v123/0t"}} & &\textcolor{#AAAA44}{[\textcolor{#AA8866}{\text{"two-digit.example.com"}}\textcolor{grey}{,} \textcolor{#AAAA88}{123.*.*}, \textcolor{#AA8866}{\text{"0t"}}]}\\\;\\\;\\\;\\\;\\&\text{d}_{\text{T}} &\xleftrightarrow{} &\text{T} = \{\;{O_T}_0,\;{O_T}_1,\;{O_T}_2,\;\ldots,\;{O_T}_{k-1}\;\} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"two-digit.example.com"}} & &\textcolor{grey}{\textcolor{#4466AA}{\texttt{const}}\;\textcolor{#88AAEE}{\texttt{part}}\texttt{ = }\textcolor{#4466AA}{\texttt{new class}}\;\textcolor{#33AA88}{\texttt{TwoDigit}}\;\textcolor{#4466AA}{\texttt{extends}}\;\textcolor{#33AA88}{\texttt{Conjunction}}\;\textcolor{#AAAA44}{\texttt{\{}}} \\ & & &\texttt{\textcolor{#BFBFBF}{\quad state} \textcolor{grey}{=} \textcolor{#88AAEE}{-1}\textcolor{#4466AA}{n}} \\ & & &\texttt{\textcolor{#448833}{\quad// compiled from dns-root/com/example/two-digit }} \\ & & &\texttt{\textcolor{#AAAA44}{\}()}}\\\;\\\;\\\;\\\;\\&(\;n_0, n_1, \ldots, n_m\;) &\xleftrightarrow{} &n \\ \textcolor{gray}{\text{e.g., }}&\texttt{\textcolor{#AA8866}{"0t"}} & &\texttt{\textcolor{#88AAEE}{94}\textcolor{#4466AA}{n}} \end{alignat}`$

The objects managed by this process are called "parts" and are controllers in a model-view-controller runtime framework which can assign the runtime state to itself and its subparts:

$`\begin{alignat}{3} &{{u_T}_v}_n &\xleftrightarrow{} &{O_{\text{T}}}_n \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com/v123/0t"}} & &\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}}\\\;\\\;\\\;\\\;\\&{O_{\text{T}}}_n &\xleftrightarrow{} &\{\;{{O_{\text{T}}}_n}_0, {{O_{\text{T}}}_n}_1, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{tensPlace}.routeID \textcolor{grey}{===} \textcolor{#88AAEE}{9}\textcolor{#4466AA}{n},}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{onesPlace}.routeID \textcolor{grey}{===} \textcolor{#88AAEE}{4}\textcolor{#4466AA}{n}}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

URLs act as typed data literals which readily break down into smaller components:

$`\begin{alignat}{3} &{{u_T}_v}_n &\xleftrightarrow{} &\{\;{{u_T}_v}_{n_0}, {{u_T}_v}_{n_1}, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com/v123/0t"}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com/v123/8"}}, \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com/v123/3"}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

### Type Schema
This project required the creation of a global type schema.

Each type has a base type from which it extends. There is a core part type ($`\textcolor{#AA8866}{\texttt{"core.parts"}}`$) which extends native [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array). All other types extend directly or indirectly from the core.

The core type has a cardinality of $`\texttt{\textcolor{#88AAEE}{1}}`$. That one state is $`\texttt{\textcolor{#88AAEE}{0}}`$.

Each type is responsible for inheriting or overriding its parent type's cardinality, which is immutable for each type. The source files required to compile each type are also immutable.

This forms a type tree whose root type is ($`\textcolor{#AA8866}{\texttt{"core.parts"}}`$).

#### Virtual Machine
The root type ($`\textcolor{#AA8866}{\texttt{"desktop.parts"}}`$) which defines the state of a virtual machine. It has four subparts corresponding to the four major web development environments it can launch in:
1. For the cloud build environment, $`\textcolor{#AA8866}{\texttt{"build.core.parts"}}`$
2. For the cloud serverless function environment, $`\textcolor{#AA8866}{\texttt{"server.core.parts"}}`$
3. For the client service worker, $`\textcolor{#AA8866}{\texttt{"worker.core.parts"}}`$,
4. For the client window, $`\textcolor{#AA8866}{\texttt{"desktop.parts"}}`$

This forms a runtime object tree whose root is ($`\textcolor{#AA8866}{\texttt{"desktop.parts"}}`$).

##### Operating System and Tasks
The client window machine $`\textcolor{#AA8866}{\texttt{"desktop.parts"}}`$ is an operating system for the virtual machine. It includes:
- A desktop with icons for quickly launching tasks.
- A menu that allows quickly launching tasks.
- A taskbar that allows switching between running tasks and a start button for opening the task menu.

The operating system can run up to 20 tasks at once. In the future, this limit could change or go away entirely.

The operating system has exactly one task in **live wallpaper mode**. This renders the website behind the taskbar of the operating system. The live wallpaper task (such as $`\textcolor{#AA8866}{\texttt{"www.orenjinari.com"}}`$) cannot be restored or minimized. Instead, the user can pick between themes, which results in navigation changing origins in their browser.

All tasks
- can run in wallpaper mode
- extend $`\textcolor{#AA8866}{\text{"task.desktop.parts"}}`$
- have a type name that starts with $`\textcolor{#AA8866}{\text{"www."}}`$
- are meant to be reached over the web
- require the appropriate DNS record(s)

One such task is the part explorer (at $`\textcolor{#AA8866}{\texttt{"www.core.parts"}}`$) which can inspect the global type tree, the runtime object tree (including viewing and staging changes to each runtime part, up to and including the self-referential case of inspecting the currently running part explorer window itself).

During all of this interaction, the URL in the address bar constantly changes to reflect the current state of the operating system.

All task DNS records point to Vercel where many domain names point to the same static asset and serverless function.

### Build Process
The framework packs all type definitions into a single file, `./api/*.js` where `/api` is the root for both public static assets and serverless functions and where `*` is replaced by a version-specific name to enable long term support (LTS).

On first visit to a given host (like $`\textcolor{#AA8866}{\text{"www.glowstick.click"}}`$) the Vercel serverless function runs the virtual machine and uses the request path to pre-render HTML file with inlined CSS. This is like a still image of the operating system in the requested state. This ensures:
1. That the client will always see something besides a blank page on first visit, while the rest of the application loads
2. Search engine crawlers like Googlebot will see fully rendered pages for any given link

After the browser parses the static DOM content and styles, the client then downloads `*.js` as the client script which hydrates the static page. Then, the same script is registered as a service worker, which locally replaces the serverless function for offline interaction.

PWA assets like `manifest.json`, icons and screenshots are designed to be client-rendered and the framework is engineered not to fetch any resources until the service worker is in place.

The root part ($`\textcolor{#AA8866}{\texttt{"www.desktop.parts"}}`$) is instantiated explicitly by `*.js` at start up. All other parts are instantiated by their parent part when the application launches. This creates a global uniform data structure representing the state of the entire runtime. It's subparts represent the state of various aspects of the runtime.

Using domain names for all types enables configuration of type information via DNS.

### Versioning and LTS
The global type schema has a semantic versioning scheme.

|major|.|minor|.|patch
|-|-|-|-|-

- Does this commit make breaking changes to existing routes?
  - yes: increment the major version number
  - no: does this commit add new routes?
    - yes: increment the minor version number
    - no: increment the patch version number

To enable long-term support (LTS), a segment of the URL path is devoted to giving the major version number of the global type schema that generated the URL.

The project is still in alpha so the rules are slightly different. Version information is not encoded in the URL. The first LTS version will be version 1.0.0 or later.

## Live Demos
Some of these projects were in the works before this framework was created and their overlapping needs inspired the creation of a unifying framework.

* [www.kireji.io](https://www.kireji.io) A short-form document editor.
* [www.core.parts](https://www.core.parts) Interactive documentation for the project.
* [www.ejaugust.com](https://www.ejaugust.com) My portfolio and blog.
* [www.desktop.parts](https://www.orenjinari.com) The operating system for the virtual machine.
* [www.glowstick.click](https://www.glowstick.click) A video streaming platform with the ability to edit and share video clips.
* [www.orenjinari.com](https://www.orenjinari.com) An artist portfolio which includes images, animations, interaction and video streaming.

## Roadmap
![version](https://img.shields.io/badge/version-0.114.3-silver) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)

Version `1.0.0` is under development.
|Phase|Status
|-|-
|**Framework and core functionality**|Completed
|**CI/CD pipeline**|Completed
|**Debug tools, docs**|In progress
|**Example applications**|In progress
|**LTS plan**|In progress
|**Advanced DNS integration**|Planned
|**Community-curated content**|Planned
|**Periodicity and types with infinite cardinality**|Planned

## License and Extensions
<sub>The project is still in alpha. It is not ready for large scale usage. Please do not copy, modify or redistribute this project but feel free to contact me. The project acts as prior art allowing me to continue to develop these ideas. See prior-art.md for more.</sub>