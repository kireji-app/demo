# Kireji: Entropy-Perfect Web Applications

**Kireji** is a web-based software platform that compresses application state into the URL using minimal perfect hash functions (MPHFs). It unifies multiple applications under a single, composable, state-addressable architecture.

All applications powered by Kireji are stateless in the traditional sense: their complete state is encoded directly in the URL. This allows for deterministic, lossless deep linking, bookmarking, and historical replay — all without cookies, localStorage, or server synchronization.

---

## Live Applications

You can explore the platform now through these publicly deployed apps:

* [ejaugust.com](https://www.ejaugust.com) – a notebook-style blog about the platform
* [desktop.parts](https://www.desktop.parts) – a preview of a GUI-based OS experience
* [kireji.app](https://www.kireji.app) – an entropy and hash-space explorer for the platform
### Coming Soon

The following apps are not built yet, but their domain names, PWA components and landing pages have been added to the platform:
* [core.parts](https://www.core.parts) – likely to become a web-based Universal IDE
* [user.parts](https://www.user.parts) – potential editor for software parts
* [glowstick.click](https://www.glowstick.click) – purpose TBD
* [kireji.io](https://www.kireji.io) – the future gamified UIDE
* [orenjinari.com](https://www.orenjinari.com) – example of an artist's portfolio

---

## 🔐 Entropy-Perfect Encoding

Each application state is assigned a unique variable-length base64 hash, derived from a bijective minimal perfect hash function. This makes URLs both compact and maximally expressive.

Example:

```
https://www.ejaugust.com/0.126.0/4lb5kAsH_R0Dv_UHg/
```

No duplicate states. No wasted space. No external state storage.

## The Charm: Measuring Entropy

Kireji introduces a unit of information called the **charm**, which measures entropy in terms of URL hash length. Charms reflect both the number of base64 digits and their variable-length structure. The current system's maximum hash length is 18 charms.

---

## MVC + MPHF Architecture

Kireji's architecture overlays Model-View-Controller (MVC) with a piecewise-defined minimal perfect hash function (MPHF):

* Each controller is a stateful component with its own cardinality.
* These components assemble like LEGO blocks, producing a single composite hash.
* JavaScript's prototype chain enables compositional inheritance between components.

---

## DNS-Based Namespacing

Each software component is assigned a name that follows DNS semantics so that a web application's URL (such as "www.ejaugust.com") can be quickly discerned from a runtime reference to one of its components, such as:

```js
_.com.ejaugust.www.notes["1753855231"]
```

`_` is the only global object, which prevents poluting the global namespace while allowing all components to make absolute reference to eachother via the above scheme.

Thanks to the domain names like `"core.parts"` and `"desktop.parts"`, shared components that _all_ apps use have a fitting place to live at runtime:

```js
_.parts.core    // Stores MVC abstracts and MPHF arithmetic
_.parts.desktop // Holds shared system state components
```

---

## Learn More

Learn more about LTE and versioning in [VERSIONING.md].

<!-- Looking ahead? See [FUTURE.md](FUTURE.md) for a deep dive into what's coming next.-->

Explore the technical background and ideas that shape the Kireji platform:

* [Entropy-Perfect Encoding](https://www.ejaugust.com/0.126.0/4lb5kAsH_R0Dv_UHg/) — on URL space, compression theory, and minimal perfect hash functions
* [The Charm](https://www.ejaugust.com/0.126.0/4lbx0eM3oGi_v_UHg/) — on measuring entropy and URL information density
* [The Multiverse and the Universal IDE](https://www.ejaugust.com/0.126.0/4lbeO3LCoWuDv_UHg/) — metaphors for self-rewriting environments
* [The Gamified Universal IDE](https://www.ejaugust.com/0.126.0/4lbofz2wN-YDv_UHg/) — an aspirational vision of immersive development tools
* [Why DNS?](https://www.ejaugust.com/0.126.0/4lbHaxElA7UDv_UHg/) — component namespacing and platform-wide coordination

## **Technology Stack**

* **JavaScript (ECMAScript)**
* **CSS (Vanilla)**
* **HTML (W3C Standards)**
* **Service Workers for offline support**
* **Serverless-compatible HTML rendering**

## **Zero Dependencies: A Simpler Equation**

`kireji.js` is written entirely with vanilla JavaScript, CSS, and HTML. No libraries, frameworks, or third-party packages are imported.

> This choice was made to preserve full control over the build output and align closely with web standards - but it also reflects a deeper design philosophy: by writing the system from scratch, every optimization becomes an opportunity to simplify the equation that defines the entire runtime behavior. `kireji.js` can be reasoned about end-to-end, as a self-contained and self-descriptive system.

## **Current Status**
[![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha)
[![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)

The following milestones completed:

* Core framework functionality
* CI/CD pipeline
* MVC + MPFH for stateless deep linking and data compression
* Modeled DNS-based component tree
* In-platform Component Inspector
* Desktop O/S Preview
* My Notebook - my blog which runs on the platform

### **Roadmap**

| Phase                                  | Status      |
| -------------------------------------- | ----------- |
| **Framework and Core Functionality**   | Completed   |
| **CI/CD Pipeline**                     | Completed   |
| **LTS Strategy**                       | Completed   |
| **Debug Tools, Docs**                  | In Progress |
| **Transfinite State Space**            | In Progress |
| **Operating System Concept**           | In Progress |
| **Advanced DNS Integration**           | Planned     |
| **Integrated Development Environment** | Planned     |
| **Changing the Game**                  | Planned     |

## **License and Attribution**

<sub>© 2013–2025 Eric Augustinowicz. All Rights Reserved.</sub> <sub>This is a personal research project in active development. It's not production-ready. Please do not copy or redistribute this codebase or its methods. All content is considered prior art.</sub>