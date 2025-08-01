# `kireji.js` – Runtime Environment Model

This document provides an overview of the three runtime environments supported by `kireji.js`. It outlines how the framework maintains consistency, reactivity, and optimal performance across the entire stack - from build time to client interaction.

---

## Overview of the Three Environments

`kireji.js` is designed to operate identically across three distinct environments:

1. **`server` (Creates a backend via Node.js)**
2. **`worker` (Creates a local backend via Service Worker)**
3. **`client` (Creates the GUI in a browser window)**

Each environment has unique responsibilities, but they all operate on the same static payload which bootstraps and renders hash-specific files identically across all three.

---

## 1. `server`

### Responsibilities:

- **Execute unit tests at build time** 
- **Static analysis of source files**
- **Hash tree construction and cardinality computation**
- **Inline and archive versioned component definitions into `/${version}.js`**
- **Respond to HTTP requests**
- **Render full HTML snapshots for any valid hash**
- **Serve the archived script**

### Features:

- Resolves the entire application structure into a single build artifact
- Serializes all runtime component prototypes into JavaScript literals
- Sets default application state to be rendered server-side
- Enables SEO by server-rendered HTML for any permalink
- Outputs CSS-inlined, DOM-complete pages for fast first paint
- Injects minimal bootstrap logic to register the service worker and transfer control to the client
- Stateless; only computes a single frame of the app based on URL state
- All logic is deterministic and derived from the hash tree

---

## 2. `worker`

### Responsibilities:

- **Controls all client-side network requests after installation**
- **Hydrates the static DOM rendered by the server**

### Features:

- Ensures full offline support
- Because all service workers are static and versioned, the app doesn't use network transactions
- Manages asset caching and updates using browser-native SW APIs
- Acts as the bridge between the server-rendered files and the client window

---

## 3. `client`

### Responsibilities:

- **Listens for user interaction events** such as clicks, keypresses, and pointer movements
- **Reacts performantly to user input** by updating application state with minimal recomputation
- **Interprets the full application state**
- **Renders all DOM and component logic in real time**

### Features:

- Presents the final local application
- Manages user interaction, animations, and local rendering
- Encodes new state changes back into the URL without needing a backend
- Offers fast, smooth, and rich/stateful cross-origin navigation
- Seamless rendering hand-off with no flash-of-unstyled-content (FOUC) on hydration.

---

## Shared Behavior Across Environments

- **Immutable State Roots**: All environments operate on the same root hash model
- **State Derivation**: Given a URL, all environments reconstruct the same system state
- **Hydration Logic**: Service worker and client window bootstrap from the static state encoded in the URL

---

## Summary

`kireji.js` achieves full-stack consistency by applying the same hash-based logic across three distinct environments. Each environment is stateless, reactive, and bound by a shared contract: the application's entire state must be fully described and derived from the URL alone. This approach eliminates backend dependency while enabling rich local state persistence and sharing, SEO, PWA functionality, real-time interaction and LTE version support.
