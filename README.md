<sub><i>© 2013 - 2025 Eric Augustinowicz. All Rights Reserved.</i></sup>
# [Static Client-Rendered Web Apps with a URL to Every State](https://github.com/EJAugust/EJAugust)
This project is a JavaScript library that builds [static](https://en.wikipedia.org/wiki/Static_web_page) [single-page](https://en.wikipedia.org/wiki/Single-page_application) [client-rendered](https://www.patterns.dev/react/client-side-rendering/) [progressive web applications](https://en.wikipedia.org/wiki/Progressive_web_app) with robust hash-based state management:
```
╭───────────────────────────────────────────────╮
│ https:// www.example.com # 0-2c9_ghc3whi45... |
╰───────────────────────────┬-------------------┤
                            │ URI fragment/hash │
                            ╰───────────────────╯
```
Using a straightforward approach, all user-configurable state information is compressed in real-time with optimal space-efficiency.

This framework can build small-scale, feature-rich applications (such as a short-form document editor or an icon painting utility) that let users create something offline and share a public link to it without uploading anything.

This project is currently in alpha. See below for the [roadmap](#roadmap) and [live demos](#live-demos).
## Method
As an array of characters, a URL hash can be considered a [numeral](https://en.wikipedia.org/wiki/Positional_notation) representing integer $`n < k_{\text{max}}`$ in some base $`b`$. This framework uses an alphabet of $`b = 64`$ characters and allows all hashes up to 2000 characters long. This provides a hash cardinality of $`k_{\text{max}} = (64^{2001}-64)/63 ≈ 2.3 * 10^{3612} ≈ 2^{12000}`$, or about 1500 bytes of storage space.

In the same way that a hash is an array of characters, object types in this framework are an array of simpler types. Just like a hash, an object $`O`$ of type $`T_O`$ exists in one of $`k_{T_O}`$ states and represents a positive integer $`n < k_{T_O}`$. When $`O`$'s properties change, so does $`n`$.

We compute the [perfect hash function](https://en.wikipedia.org/wiki/Perfect_hash_function) $`\text{hash} \xleftrightarrow{} \text{object state}`$ using the same techniques we would use to compute a [base conversion](https://en.wikipedia.org/wiki/Positional_notation#Base_conversion).

Every type is identified by a unique domain name which, combined with a hash, provides a URL for every instance of every data type. This gives us the bijections needed to recover independant type and state information:

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &(\;\text{host}_{\text{T}}, \text{hash}_n\;) \\ \textcolor{grey}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com\#1u"}} & &\textcolor{#AAAA44}{[\textcolor{#AA8866}{\text{"two-digit.example.com"}}\textcolor{grey}{,} \textcolor{#AA8866}{\text{"1u"}}]}\\\;\\\;\\\;\\\;\\&\text{host}_{\text{T}} &\xleftrightarrow{} &\text{T} = \{\;{O_T}_0,\;{O_T}_1,\;{O_T}_2,\;\ldots,\;{O_T}_{k-1}\;\} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"two-digit.example.com"}} & &\textcolor{grey}{\textcolor{#4466AA}{\texttt{const}}\;\textcolor{#88AAEE}{\texttt{part}}\texttt{ = }\textcolor{#4466AA}{\texttt{new class}}\;\textcolor{#33AA88}{\texttt{TwoDigit}}\;\textcolor{#4466AA}{\texttt{extends}}\;\textcolor{#33AA88}{\texttt{Conjunction}}\;\textcolor{#AAAA44}{\texttt{\{}}} \\ & & &\texttt{\textcolor{#BFBFBF}{\quad state} \textcolor{grey}{=} \textcolor{#88AAEE}{-1}\textcolor{#4466AA}{n}} \\ & & &\texttt{\textcolor{#448833}{\quad// compiled from dns-root/com/example/two-digit }} \\ & & &\texttt{\textcolor{#AAAA44}{\}()}}\\\;\\\;\\\;\\\;\\&\text{hash}_n &\xleftrightarrow{} &n \\ \textcolor{gray}{\text{e.g., }}&\texttt{\textcolor{#AA8866}{"1u"}} & &\texttt{\textcolor{#88AAEE}{94}\textcolor{#4466AA}{n}} \end{alignat}`$

The objects managed by this process are called "parts" and are controllers in a model-view-controller runtime framework which can assign the runtime state to the type:

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &{O_{\text{T}}}_n \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com\#1u"}} & &\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}}\\\;\\\;\\\;\\\;\\&{O_{\text{T}}}_n &\xleftrightarrow{} &\{\;{{O_{\text{T}}}_n}_0, {{O_{\text{T}}}_n}_1, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{tensPlace}.state \textcolor{grey}{===} \textcolor{#88AAEE}{9}\textcolor{#4466AA}{n},}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{onesPlace}.state \textcolor{grey}{===} \textcolor{#88AAEE}{4}\textcolor{#4466AA}{n}}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

URLs can now act as file literals which readily break down into smaller components:

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &\{\;{\text{url}_{T}}_{n_0}, {\text{url}_{T}}_{n_1}, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com\#1u"}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com\#9"}}, \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com\#4"}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$


All types exist in a hierarchy with each one ultimately extending from a common base type ($`\textcolor{#AA8866}{\texttt{"core.parts"}}`$) which extends native [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array). A type's cardinality and state are [bigints](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). The base type has a cardinality of $`\texttt{\textcolor{#88AAEE}{1}\textcolor{#4466AA}{n}}`$ and its one state is $`\texttt{\textcolor{#88AAEE}{0}\textcolor{#4466AA}{n}}`$.

All client application types start with $`\textcolor{#AA8866}{\text{"www."}}`$ and extend $`\textcolor{#AA8866}{\text{"app.core.parts"}}`$. These types have associated DNS records pointing to a server hosting the output directory `./public`.

The framework packs all type definitions into `./public/framework.js` which on first visit registers itself as a service worker to serve `manifest.json` and become an offline installable PWA. On window load, it serves itself as the client rumtime framework and recovers its initial state from the window location. On native event (where attached), it updates the client state and window location together.

Using domain names enables future configuration of type information via DNS. Using the hash instead of query parameters or a pathname enables the user to engage with the app without sending activity to a server which is useful both for user privacy and for reducing the burdon on cloud services. Furthermore, the [URI fragment](https://datatracker.ietf.org/doc/html/rfc3986#section-3.5) is the most appropriate segment for this kind of information.

Hashes should not be hard-coded anywhere in an application's source. Instead, a staging layer allows parts to stage an arbitrary number of operations on the current state in order to obtain a URL to another state without affecting the current data model and URL. This enables anchor links like `<a href=#1u>` to be generated at runtime.

Finally, semantic versioning can be used to associate a hash with the version of the type hierarchy that it was generated in. However, as the project is in alpha, this feature has not been implemented.

## Live Demos
* [www.kireji.io](https://www.kireji.io) A short-form document editor.
* [www.core.parts](https://www.core.parts) Interactive documentation for the project.
* [www.ejaugust.com](https://www.ejaugust.com) My portfolio and blog.
* [www.glowstick.click](https://www.glowstick.click) An app presenting animated web content with the ability to edit and share video clips.

## Roadmap
![version](https://img.shields.io/badge/version-0.100.12-silver) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)

Version `1.0.0` is under development.
|Phase|Status
|-|-
|**Framework**|Completed
|**CI/CD pipeline**|Completed
|**Debug tools, docs**|In progress
|**Live demos**|In progress
|**LTS plan**|In progress