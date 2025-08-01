# `kireji.js` – Architecture Overview

This document provides a technical deep dive into the inner workings of `kireji.js`. It supplements the main README with details on the hashing model, URL compression strategy, and state representation.

---

## 1. Minimal Perfect Hashing

`kireji.js` employs a piecewise-defined, recursive **minimal perfect hash function (MPHF)** to compress part state information into compact, shareable URLs. Each application state is represented as a natural number $`n`$, with the MPHF ensuring a 1:1 mapping between $`n`$ and its respective part state configuration.

### 1.1 Bijection Model

The core mapping is:

```
n <--> Part State
```

Each part declares its cardinality $`k`$, which defines the number of possible states it can occupy. The system ensures that every part maps deterministically to a unique number $`0 < n < k`$ within its cardinality range.

### 1.2 URL Path Encoding

Each full application state is encoded into a URL using variable-length base-64 segments. A typical path looks like:

```
https://www.example.com/ghc3w_hi4-5g4w3/
```

Each segment represents a portion of the application's state tree. Path segments can store \~1500 bits of entropy each, using the geometric series:

$$
k_{segment} = (64^{251} - 64)/63 ≈ 2^{1500}
$$

This provides extremely dense representation of state without relying on query parameters or local storage, making states sharable and deep-linkable by permanent URLs.

## 2. Part Model and State Composition

### 2.1 Mix and Match Parts

`kireji.js` models state as a recursive tree:

* `mix.core.parts` performs **multiplicative composition** (Cartesian product of independent subparts)
* `match.core.parts` performs **additive composition** (exclusive options / partitioning)

These two operations enable arbitrarily complex state spaces to be built from small, reusable parts.

### 2.2 Stateful Behavior

Each part reads and writes its state as an integer. This state is derived from the states of its subparts or from local input, and any mutation automatically updates its hash value.

Example mapping:

```
https://two-digit.example.com/v123/0t
-> [domain: two-digit.example.com, version: 123, state: 94]
-> subpart mapping: [tensPlace.routeID = 9, onesPlace.routeID = 4]
```

## 3. State Propagation

`kireji.js` supports rootward and leafward propagation of state changes. Any state mutation in a subpart triggers a full recalculation of parent route identifiers up to the DNS root. This model ensures full consistency across nested part hierarchies.

The URL in the address bar always reflects the root part's state and is updated at throttled intervals (to align with browser frame rate limits and avoid DoS mitigation mechanisms).

## 4. Prototype Tree and Inheritance

Each domain maps to a runtime object (called a part), and subdomains define subparts. These parts follow a prototype-based inheritance model:

* Domains can extend other domains
* Behaviors and cardinalities are inherited or overridden
* The root prototype is `part.core.parts`

This system enables reuse and modularity while preserving static determinism.

## 5. Current DNS Integration Status

DNS-based behaviors are currently **modeled only**:

* TXT record fetching is implemented in a commented-out form
* No live production use of DNS records occurs yet
* This modeling forms the basis for future decentralized architecture

---

## Summary

`kireji.js`'s architecture is defined by its emphasis on stateless, composable, mathematically rigorous component modeling. The hash function acts as the universal interface for state storage, navigation, and sharing, enabling a new paradigm for front-controlled applications without traditional backends.

For build engineers, architects, and researchers, `kireji.js` offers a reproducible and self-contained environment to explore scalable UI logic, compressed state modeling, and reactive full-stack design.
