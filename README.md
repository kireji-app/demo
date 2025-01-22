## [About This Repository](https://github.com/EJAugust/EJAugust) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/your-username/your-repo) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
This repo unites all my personal projects using a frontend framework that I have been developing for years.

Every web app built in this framework offers a permalink to every valid client state, generated automatically. That URL achieves maxmimal compression storing the state of the client application.

This allows offline browsing, editing and sharing.

## Web Components as Units
Each web application - and every datum that makes up the application's data model - is measured and tracked by a reusable component called a unit. All units form tree structure with a single root unit.

Units are implimented at runtime as class instances that track an integer which maximally compresses the global state as measured by that unit.

### Unit Domain Names
Every unit has it's own dedicated apex domain or subdomain. This serves as the name of the unit. The hierarchy of subdomain names does not relate to the hierarchy of units. This allows us to organize units into meaningful groups without affecting their behavior. After adding an A type DNS record for a domain, the unit at that domain becomes a published client application. Cross-unit content is merged at deploy time into one root unit so the client does not engage in cross-origin resource sharing (CORS).

#### Common Units

|Unit Name|Unit Description
|-|-
|**`root.core.parts`**|the root unit; all other units are downstream from this one; this unit is derived from all other units; this unit measures the combined behavior of the deployment pipeline, the client window, and the client serviceWorker.
|**`unit.core.parts`**|the base unit; all other units extend from this one
|**`disjunction.core.parts`**|the base unit of all disjoint unions
|**`conjunction.core.parts`**|the base unit of all cartesian products

### Defining a Unit
A unit is defined by a handful of optional source files, each of which overrides a base unit's behavior. These source files are used whenever the framework launches (e.g. on deploy in node.js, on window load on the client, or on serviceWorker install). Native javascript events interface with these source files and vice versa.

These source files are distributed across three kinds of unit behavior. In addition, each unit can have additional source files. Units always have cross-origin access and can read all other units' source files.

#### Core Functionality
|File|Purpose
|-|-
|**`base.uri`**|gives the origin of the base unit the unit extends<br>*The keyword "super" is used to call on the functionality of the base unit.*
|**`.env`**|environment variable keys (with optional values) made available to `define.js`
|**`define.js`**|runs when instantiating a unit; used to instantiate dependant units

#### Change Propagation
A unit's value is automatically recomputed when the value(s) assigned to its derived units change. The reverse is also true: all affected derived unit(s)' are automatically assigned values whenever this unit's own value is assigned.

A change in any datum must propagate in both directions in order to spread out to the entire system.

These files allow each unit to control propagation:
|File|Purpose
|-|-
|**`setState.js`**|change the value assigned to the unit and propagate that change both rootward and leafward
|**`propagateRootward.js`**<br>**`propagateLeafward.js`**|react to and pass along changes made elsewhere in the system

This allows every datum to act as a controller that drives the rest of the system.

#### Document Interaction
|File|Purpose
|-|-
|**`install.js`**|bind the unit to existing document elements and create dedicated elements
|**`uninstall.js`**|unbind the unit from existing document elements and destroy dedicated elements

#### Analysis
A unit can be expressed as a polynomial equal to the cardinality of the set of unique measurements the unit can observe, according to its design. The root unit defines a polynomial expression equal to the cardinality of the set of valid code paths for the entire system. Every level of the hierarchy is both a single unit and the constituent units from which it derives.

This allows mathematical analysis using established methods.

## Project Roadmap
|Status|Phase|Description
|-|-|-
|✅ Done|**Core framework**|Philosophy, functionality and algorithm
|✅ Done|**CI/CD pipeline**|Automation of content deployment
|🔄 Ongoing|**Example content**|Live demos and documentation
|⏳ Planned|**Bootstrapped IDE**|A development environment for contributors