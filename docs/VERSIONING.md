# `kireji.js` – Versioning and Long-Term Stability

This document outlines the versioning strategy used by `kireji.js` to maintain consistency across application states and ensure long-term permalink stability.

---

## 1. Why Versioning Matters in `kireji.js`

Unlike traditional applications that store state on the backend, `kireji.js` encodes all runtime state directly into the URL. This creates a permalink to any exact state but also a challenge: ensuring old links continue to work as the framework evolves.

To solve this, `kireji.js` provides a **semantic versioning model** for its core hash function.

---

## 2. Semantic Versioning Scheme

The hash function that defines part behavior and layout is versioned using the standard **major.minor.patch** format:

```
MAJOR.MINOR.PATCH
```

| Level | When to Increment                                      |
| ----- | ------------------------------------------------------ |
| Major | Breaking change to existing state mappings             |
| Minor | New routes added, existing links still work            |
| Patch | Bugfixes, small adjustments, no impact on URL behavior |

### Example:

* `1.0.0`: First long-term stable version
* `1.1.0`: Adds new application without changing old routes
* `2.0.0`: Refactors match/mix behavior in a way that invalidates some previous URLs

Until version `1.0.0`, `kireji.js` is in **alpha** and the hash tree may change without stability guarantees.

---

## 3. State Stability and Backward Compatibility

Each version of the hash tree can be treated as its own schema for URL encoding and decoding. `kireji.js` sets aside a small reserved namespace for routing to a specific version of the tree.

This allows developers to:

* Pin content to a specific version
* Maintain deep links in notes or docs
* Add new routes or applications without breaking old ones

Hashes can be translated across versions. This is achieved by allowing any previous version of the application to unpack a given hash into a serialized form that later versions can parse.

---

## 4. Archived Versions

To preserve past behavior, all previously deployed versions of the hash tree are still available, archived and bundled according to their version number.

This ensures that even if the project evolves rapidly, any link shared generated in a previous version of the application can still reconstruct its corresponding UI state.

Archived versions include:

* A frozen copy of the MPHF tree
* Static copy of all content
* Git metadata to link back to that version's commit

---

## 5. Planned Stability Milestone

| Target Version | Purpose                                          |
| -------------- | ------------------------------------------------ |
| `1.0.0`        | First stable release with backward compatibility |
| `1.x.x`        | Non-breaking extensions                          |
| `2.0.0`        | First intentional breaking change                |

Developers working with the alpha version 0.x.x should treat permalinks as non-durable while the deployment strategy matures.

---

## 6. Automatic Versioning

`kireji.js` includes an **automatic versioning system** built into its local development environment. At build time, if the environment is detected as local, the framework allows the developer to specify change severity (major, minor, or patch) and the system automatically increments and outputs the appropriate next version number in the console at build time. This ensures consistent version tracking and LTE backwards compatibility testing during feature implementation.

## Summary

`kireji.js` treats the application state as a form of typed data and commits to preserving that data over time through semantic versioning. The versioning system ensures that every URL, once published, can remain a valid and functional entry point into the application—without requiring a database or server persistence.

As the framework matures, this commitment to permalink durability will allow users and developers to build confidently on top of a stable foundation.