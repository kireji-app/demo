<sub><i>© 2013 - 2025 Eric Augustinowicz. All Rights Reserved.</i></sup>
# [Static Client-Rendered Web Apps with a URL to Every State](https://github.com/EJAugust/EJAugust)
Many games allow players to save their state. Here, that information is stored as a hash:
```
╭────────────────────────────────────────────────╮
│ https:// game.example.com # 0-2c9_ghc3whi45... |
╰────────────────────────────┬-------------------┤
                             │ URI fragment/hash │
                             ╰───────────────────╯
```
Apps can be designed with complex features like writing and drawing tools and compression of that state information into the hash is automatic. This means users can share public links to their work even though the app is offline and they never uploaded anything.

This project is currently in alpha. See below for links to deployed examples.
## Method
By thinking of a hash as a [base-b numeral](https://en.wikipedia.org/wiki/Positional_notation), letting $`b = 64`$ and allowing hashes up to 2000 characters, we obtain $`k_{\text{max}} = 64^{2001} - 2`$, the largest possible hash value.

Any object $`O`$ that can switch between $`k`$ states can be thought of as a numeral. At any given time, the object represents one positive integer $`n < k`$. Interacting with the object changes the depicted value. We compute the bijection $`\text{url} \xleftrightarrow{} \text{object state}`$ as a [base conversion](https://en.wikipedia.org/wiki/Positional_notation#Base_conversion). This simple approach achieves the greatest possible lossless compression ratio for arbitrary data.

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &(\;\text{host}_{\text{T}}, \text{hash}_n\;) \\ \textcolor{grey}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://www.example.com\#1u"}} & &\textcolor{#AAAA44}{[\textcolor{#AA8866}{\text{"www.example.com"}}\textcolor{grey}{,} \textcolor{#AA8866}{\text{"1u"}}]}\\\;\\\;\\\;\\\;\\&\text{host}_{\text{T}} &\xleftrightarrow{} &\text{T} = \{\;{O_T}_0,\;{O_T}_1,\;{O_T}_2,\;\ldots,\;{O_T}_{k-1}\;\} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"www.example.com"}} & &\textcolor{grey}{\textcolor{#4466AA}{\texttt{const}}\;\textcolor{#88AAEE}{\texttt{part}}\texttt{ = }\textcolor{#4466AA}{\texttt{new class}}\;\textcolor{#33AA88}{\texttt{T}}\;\textcolor{#4466AA}{\texttt{extends}}\;\textcolor{#33AA88}{\texttt{TBase}}\;\textcolor{#AAAA44}{\texttt{\{}}} \\ & & &\texttt{\textcolor{#BFBFBF}{\quad state} \textcolor{grey}{=} \textcolor{#88AAEE}{-1}\textcolor{#4466AA}{n}} \\ & & &\texttt{\textcolor{#448833}{\quad// compiled from dns-root/com/example/www }} \\ & & &\texttt{\textcolor{#AAAA44}{\}()}}\\\;\\\;\\\;\\\;\\&\text{hash}_n &\xleftrightarrow{} &n \\ \textcolor{gray}{\text{e.g., }}&\texttt{\textcolor{#AA8866}{"1u"}} & &\texttt{\textcolor{#88AAEE}{94}\textcolor{#4466AA}{n}} \end{alignat}`$

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &{O_{\text{T}}}_n \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://www.example.com\#1u"}} & &\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}}\\\;\\\;\\\;\\\;\\&{O_{\text{T}}}_n &\xleftrightarrow{} &\{\;{{O_{\text{T}}}_n}_0, {{O_{\text{T}}}_n}_1, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{a}.state \textcolor{grey}{===} \textcolor{#88AAEE}{9}\textcolor{#4466AA}{n},}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{b}.state \textcolor{grey}{===} \textcolor{#88AAEE}{4}\textcolor{#4466AA}{n}}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &\{\;{\text{url}_{T}}_{n_0}, {\text{url}_{T}}_{n_1}, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://www.example.com\#1u"}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \textcolor{#AA8866}{\text{"https://subtype.example.com\#9"}}, \\ & & &\quad \textcolor{#AA8866}{\text{"https://subtype.example.com\#4"}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

All parts extend from the type at $`\textcolor{#AA8866}{\texttt{"core.parts"}}`$ which extends native [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) and has cardinality $`\texttt{\textcolor{#88AAEE}{1}\textcolor{#4466AA}{n}}`$, making its only state $`\texttt{\textcolor{#88AAEE}{0}\textcolor{#4466AA}{n}}`$.

Client application types start with $`\textcolor{#AA8866}{\text{"www."}}`$, extend $`\textcolor{#AA8866}{\text{"app.core.parts"}}`$ and have DNS `A` or `CNAME` records pointing to a server which provides empty document `/index.html` and packed script `/framework.js` which provides all type definitions.

## Examples
* [ejaugust.com](https://www.ejaugust.com) My portfolio and blog.
* [kireji.io](https://www.kireji.io) An app with a link to every haiku-like poem in a given grammer.
* [glowstick.click](https://www.glowstick.click) An app for presenting animated web content with a link to every playback moment and subset clip.
* [core.parts](https://www.core.parts) Interactive documentation for the project.

## Roadmap<br>![version](https://img.shields.io/badge/version-0.99.13-silver) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
Version `1.0.0` is under development.
|Phase|Phase
|-|-
|**Framework**|✅ Done
|**CI/CD pipeline**|✅ Done
|**Debugging tools and documentation**|🔄 Ongoing