# `kireji.js` – Runtime Environment Model

This document provides an overview of the four runtime environments supported by `kireji.js`. It outlines how the framework maintains consistency, reactivity, and optimal performance across the entire stack - from build time to client interaction.

---

## Overview of the Four Environments

`kireji.js` is designed to operate identically across four distinct environments:

1. **Build Environment**
2. **Server (Serverless Functions)**
3. **Service Worker**
4. **Client Window**

Each environment has specific responsibilities, yet all operate on the same static payload. The state is encoded, propagated, and hydrated using a consistent hash-based model across all layers.

---

## 1. Build Environment

### Responsibilities:

- **Executes unit tests at build time** by simulating runtime logic across all environments using the static hash model
- **Static analysis of source files**
- **Hash tree construction and cardinality computation**
- **Inlines component definitions into `/kireji.js`**

### Features:

- Resolves the entire application structure into a single build artifact
- Serializes all runtime component prototypes into JavaScript literals
- Sets default application state to be rendered server-side

### Output:

- Fully packed and source-mapped script (`/kireji.js`) that powers all subsequent environments

---

## 2. Server Environment

### Responsibilities:

- **Responds to initial HTTP requests**
- **Renders full HTML snapshot for any valid URI**

### Features:

- Enables SEO by serving pre-rendered HTML for any permalink
- Outputs CSS-inlined, DOM-complete pages for fast first paint
- Injects minimal bootstrap logic to register the service worker and transfer control to the client

### Constraints:

- Stateless; only computes a single frame of the app based on URL state
- All logic is deterministic and derived from the hash tree

---

## 3. Service Worker Environment

### Responsibilities:

- **Controls all client-side network requests after installation**
- **Hydrates the static DOM rendered by the server**

### Features:

- Ensures full offline support
- Manages asset caching and updates using browser-native SW APIs
- Coordinates between different instances of the app across tabs and acts as the bridge between the server-rendered DOM and the live component model in the client window

---

## 4. Client Window Environment

### Responsibilities:

- **Listens for user interaction events** such as clicks, keypresses, and pointer movements
- **Reacts performantly to user input** by updating application state with minimal recomputation
- **Interprets the full application state**
- **Renders all DOM and component logic in real time**

### Features:

- Throttles address bar updates to remain in sync with application state
- Manages user interaction, animations, and local rendering
- Encodes new state changes back into the URI without needing a backend

---

## Shared Behavior Across Environments

- **Immutable State Roots**: All environments operate on the same root hash model
- **State Derivation**: Given a URI, all environments reconstruct the same application state
- **Hydration Logic**: Service worker and client window bootstrap from the static state encoded in the URI

---

## Summary

`kireji.js` achieves full-stack consistency by applying the same hash-based logic across four distinct environments. Each environment is stateless, reactive, and bound by a shared contract: the application’s entire state must be fully described and derived from the URI alone. This approach eliminates backend dependencies while enabling SEO, PWA functionality, and real-time interaction—all from a single, static build artifact.
