# `kireji.js` – Versioning and Long-Term Stability

This document outlines the versioning strategy used by `kireji.js` to maintain consistency across application states and ensure long-term permalink stability.

---

## 1. Why Versioning Matters in `kireji.js`

Unlike traditional applications that store state on the backend, `kireji.js` encodes all runtime state directly into the URI. This creates a powerful feature—**permalinks to any exact state**—but also a responsibility: we must ensure that old links continue to work as the framework evolves.

To solve this, `kireji.js` provides a **semantic versioning model** for its core hash function.

---

## 2. Semantic Versioning Scheme

The hash function that defines component behavior and layout is versioned using the standard **major.minor.patch** format:

```
MAJOR.MINOR.PATCH
```

| Level | When to Increment                                      |
| ----- | ------------------------------------------------------ |
| Major | Breaking change to existing state mappings             |
| Minor | New components/routes added, existing links still work |
| Patch | Bugfixes, small adjustments, no impact on URI behavior |

### Example:

* `1.0.0`: First long-term stable version
* `1.1.0`: Adds new application without changing old routes
* `2.0.0`: Refactors match/mix behavior in a way that invalidates some previous URLs

Until version `1.0.0`, `kireji.js` is in **alpha** and the hash tree may change without stability guarantees.

---

## 3. State Stability and Backward Compatibility

Each version of the hash tree can be treated as its own schema for URI encoding and decoding. `kireji.js` sets aside a small reserved namespace for routing to a specific version of the tree.

This allows developers to:

* Pin content to a specific version
* Maintain deep links in blog posts or docs
* Add new routes or applications without breaking old ones

In the future, the version number will be encoded directly in the URI and parsed at runtime to ensure compatibility.

---

## 4. Archived Versions

To preserve past behavior, older versions of the hash tree may be archived and bundled with builds marked as long-term support (LTS).

This ensures that even if the project evolves rapidly, any link shared with a previous version of the application can still reconstruct its corresponding UI state.

Archived versions will include:

* A frozen copy of the MPHF tree
* Static metadata for all part cardinalities and prototypes
* Version-tagged build artifacts (if necessary)

---

## 5. Planned Stability Milestone

| Target Version | Purpose                                          |
| -------------- | ------------------------------------------------ |
| `1.0.0`        | First stable release with backward compatibility |
| `1.x.x`        | Non-breaking extensions                          |
| `2.0.0`        | First intentional breaking change                |

Until `1.0.0`, version information is not embedded in the URI itself. Developers working with alpha versions should treat permalinks as non-durable.

---

## 6. Automatic Versioning

`kireji.js` includes an **automatic versioning system** built into its local development environment. At build time, if the environment is detected as local, the framework prompts the developer to specify the change severity—major, minor, or patch. Based on this input and the current version, the system automatically increments and outputs the appropriate next version number. This ensures consistent version tracking while allowing developers to focus on feature implementation.

## Summary

`kireji.js` treats the application state as a form of typed data and commits to preserving that data over time through semantic versioning. The versioning system ensures that every URI, once published, can remain a valid and functional entry point into the application—without requiring a database or server persistence.

As the framework matures, this commitment to permalink durability will allow users and developers to build confidently on top of a stable, compressive foundation.
