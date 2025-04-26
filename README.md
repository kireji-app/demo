# [Static Client-Rendered Web Applications With a URI to Every State](https://github.com/EJAugust/EJAugust)

This project combines a [perfect hash function](https://en.wikipedia.org/wiki/Perfect_hash_function) with a component-based frontend framework. It builds [static](https://en.wikipedia.org/wiki/Static_web_page) [single-page](https://en.wikipedia.org/wiki/Single-page_application) [progressive web applications](https://en.wikipedia.org/wiki/Progressive_web_app) with [server-side](https://www.patterns.dev/react/client-side-rendering/) and [client-side](https://www.patterns.dev/react/client-side-rendering/) file rendering. The perfect hash function allows the app to encode its runtime state as a [URI](https://datatracker.ietf.org/doc/html/rfc3986):
```
╭─────────────────────────────────────────────╮
│ https:// www.example.com / ghc3whi45g4w3 /  |
╰─────────────────────────────────────────────╯
  https://     App Name    /   App State   /
```

The framework can be used to build small-scale, feature-rich web apps (such as a short-form document editor or an icon painting utility). The user interface works like a [wysiwyg](https://en.wikipedia.org/wiki/WYSIWYG) editor for a small amount of user-configurable data. Using a straightforward approach, that data is compressed into the URI in real-time with optimal space efficiency.

The URI can then be shared, which in turn shares exactly what the user sees in the application. This gives the illusion that the user uploaded the app's content to the server when no information was uploaded. Instead, the user found a pre-defined route containing the content. Another way to think about it is that the URI is itself the file containing the content, making it easy to share.

The project is currently in alpha. See below for [live demos](#live-demos).

## Roadmap
[![version](https://img.shields.io/badge/version-0.115.1-silver)](https://github.com/EJAugust/EJAugust)
[![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha)
[![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)

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
|**Periodicity/sets with infinite cardinality**|Planned

## Live Demos
* [www.core.parts](https://www.core.parts) Interactive documentation for the project.
* [www.desktop.parts](https://www.desktop.parts) A retro-style operating system experience.
* [www.ejaugust.com](https://www.ejaugust.com) My portfolio and blog.
* [www.orenjinari.com](https://www.orenjinari.com) Another creator's portfolio website.

### Coming Soon
* [www.user.parts](https://www.user.parts) A user profile and avatar creator.
* [www.kireji.io](https://www.kireji.io) A short-form document editor.
* [www.glowstick.click](https://www.glowstick.click) A video streaming platform with the ability to edit and share video clips.

## License
<sub><i>© 2013 - 2025 Eric Augustinowicz. All Rights Reserved.</i></sup><br>
The project is still in alpha. It is not ready for large scale usage. Please do not copy, modify or redistribute this project but feel free to contact me. The project acts as prior art allowing me to continue to develop these ideas.

## Method
These methods are subject to change as I continue research and development.

### Build Process
This framework creates a static web application by packing source files into a single source-mapped script, `./api/serverless.js`, and deploying that script as both a client service worker and cloud serverless function.

On first visit to a given URI, the request reaches a serverless function for that domain name which uses the incoming request to pre-render an HTML file with inlined CSS. This is like a still image of the requested application in the requested state. This ensures:
1. That the client will always see something besides a blank page on first visit, while the rest of the application data downloads in the background.
2. Search engine crawlers like Googlebot will see fully rendered pages for any given link.

An inline script registers `serverless.js` as a service worker while the window continues parsing the HTML. No other assets (including PWA assets like `manifest.json`, icons or screenshots) are fetched until after the client window is controlled by a service worker, ensuring that all of these assets are client-rendered, reducing the burden on the serverless function.

### Parts and State Encoding
A bijection $`\textcolor{#88AAEE}{\text{pathname} \xleftrightarrow{} \text{object state}}`$ is computed. The method uses an alphabet of $`\textcolor{#88AAEE}{b = 64}`$ characters to encode/decode integers as an array of variable-length pathname segments (each segment up to $`\textcolor{#88AAEE}{250}`$ characters long). Each path segment can represent $`\textcolor{#88AAEE}{k_{\text{segment}} = (64^{251}-64)/63 ≈ 3.56 * 10^{451} ≈ 2^{1500}}`$ unique values (about $`\textcolor{#88AAEE}{1500}`$ bits of storage space). The computation is similar to a numeral [base conversion](https://en.wikipedia.org/wiki/Positional_notation#Base_conversion) with some added complexity which takes advantage of the storage potential of a variable-length string. 

UI component objects called "parts" are instantiated by the framework at runtime. A part $`\textcolor{#88AAEE}{O}`$ of type $`\textcolor{#88AAEE}{T_O}`$ exists in one of $`\textcolor{#88AAEE}{k_{T_O}}`$ states and represents a positive integer $`\textcolor{#88AAEE}{n < k_{T_O}}`$. When $`\textcolor{#88AAEE}{O}`$'s properties change, so does $`\textcolor{#88AAEE}{n}`$. In this way, each part is its own perfect hash function.

Every part is identified by a unique domain name which, combined with a pathname, provides a URI for every state of every component, making the perfect hash function complete over all possible component types.

$`\begin{alignat}{3} &{{u_T}_v}_n &\xleftrightarrow{} &(\;\text{d}_T, \text{v}, n_0, n_1, \ldots, n_m\;) \\ \textcolor{grey}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com/v123/0t"}} & &\textcolor{#AAAA44}{[\textcolor{#AA8866}{\text{"two-digit.example.com"}}\textcolor{grey}{,} \textcolor{#AAAA88}{123.*.*}, \textcolor{#AA8866}{\text{"0t"}}]}\\\;\\\;\\\;\\\;\\&\text{d}_{\text{T}} &\xleftrightarrow{} &\text{T} = \{\;{O_T}_0,\;{O_T}_1,\;{O_T}_2,\;\ldots,\;{O_T}_{k-1}\;\} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"two-digit.example.com"}} & &\textcolor{grey}{\textcolor{#4466AA}{\texttt{const}}\;\textcolor{#88AAEE}{\texttt{part}}\texttt{ = }\textcolor{#4466AA}{\texttt{new class}}\;\textcolor{#33AA88}{\texttt{TwoDigit}}\;\textcolor{#4466AA}{\texttt{extends}}\;\textcolor{#33AA88}{\texttt{Conjunction}}\;\textcolor{#AAAA44}{\texttt{\{}}} \\ & & &\texttt{\textcolor{#BFBFBF}{\quad state} \textcolor{grey}{=} \textcolor{#88AAEE}{-1}\textcolor{#4466AA}{n}} \\ & & &\texttt{\textcolor{#448833}{\quad// compiled from dns-root/com/example/two-digit }} \\ & & &\texttt{\textcolor{#AAAA44}{\}()}}\\\;\\\;\\\;\\\;\\&(\;n_0, n_1, \ldots, n_m\;) &\xleftrightarrow{} &n \\ \textcolor{gray}{\text{e.g., }}&\texttt{\textcolor{#AA8866}{"0t"}} & &\texttt{\textcolor{#88AAEE}{94}\textcolor{#4466AA}{n}} \end{alignat}`$

Parts act like controllers in a model-view-controller paradigm. They can have their state read and written either as an integer or via direct manipulation of the part or its subparts.

$`\begin{alignat}{3} &{{u_T}_v}_n &\xleftrightarrow{} &{O_{\text{T}}}_n \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com/v123/0t"}} & &\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}}\\\;\\\;\\\;\\\;\\&{O_{\text{T}}}_n &\xleftrightarrow{} &\{\;{{O_{\text{T}}}_n}_0, {{O_{\text{T}}}_n}_1, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{tensPlace}.routeID \textcolor{grey}{===} \textcolor{#88AAEE}{9}\textcolor{#4466AA}{n},}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{onesPlace}.routeID \textcolor{grey}{===} \textcolor{#88AAEE}{4}\textcolor{#4466AA}{n}}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

URIs act as typed data literals which are readily composed and decomposed into more URIs.

$`\begin{alignat}{3} &{{u_T}_v}_n &\xleftrightarrow{} &\{\;{{u_T}_v}_{n_0}, {{u_T}_v}_{n_1}, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com/v123/0t"}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com/v123/8"}}, \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com/v123/3"}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

### Type Schema
Each part type has a base type from which it extends. There is a core type $`\textcolor{#AA8866}{\texttt{"core.parts"}}`$ which all other types directly or indirectly extend.

These types perform the majority of the perfect hash arithmetic:
1. $`\textcolor{#AA8866}{\texttt{"one.core.parts"}}`$ - The default base of a type if none is given. This represents a part with no subparts. It has a cardinality of $`\texttt{\textcolor{#88AAEE}{1}}`$. That one state has the integer value $`\texttt{\textcolor{#88AAEE}{0}}`$.
1. $`\textcolor{#AA8866}{\texttt{"match.core.parts"}}`$ - Only one of its subparts can be enabled at a time, behaving like a single option selected from a set.
1. $`\textcolor{#AA8866}{\texttt{"mix.core.parts"}}`$ - A part which controls a set of subparts, all of which are enabled if the part is enabled and whose states are all independent of one another. This acts like a single point selected from a cartesian product space whose dimensions are its subparts.
1. $`\textcolor{#AA8866}{\texttt{"string.core.parts"}}`$ - Combining features of both mix and match, this represents a variable-length array of subparts which acts like a (possibly mixed-radix) string.

Each type is responsible for inheriting or overriding its parent type's cardinality, which is immutable for each type.

This forms a type tree whose root type is $`\textcolor{#AA8866}{\texttt{"core.parts"}}`$.

The framework initializes a root part whose type is $`\textcolor{#AA8866}{\texttt{"user.parts"}}`$. This defines the user-configurable space state which can be configured via URI.

Using domain names for all types enables future configuration of type information via DNS.
### Versioning and LTS
The global type schema has a semantic versioning scheme.

|major|.|minor|.|patch
|-|-|-|-|-

- Does this commit make breaking changes to existing routes?
  - yes: increment the major version number
  - no: does this commit add new routes?
    - yes: increment the minor version number
    - no: increment the patch version number

To enable long-term support (LTS), a segment of the URI path can be devoted to the major version number of the global type schema that generated the URI.

The project is still in alpha so the rules are slightly different. Version information is not encoded in the URI. The first LTS version will be version 1.0.0 or later.