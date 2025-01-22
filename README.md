## [About This Repository](https://github.com/EJAugust/EJAugust) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/your-username/your-repo) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
This repo unites all my personal projects using a frontend framework that I have been developing for years.

Every web app built in this framework offers a permalink to every valid client state, generated automatically. That URL achieves maxmimal compression storing the state of the client application.

This allows offline browsing, editing and sharing.

## Web Components as Units
Each web application - and every datum that makes up the application's data model - is measured and tracked by a reusable component called a unit. A unit is a class instance that tracks an integer which maximum compresses the value assigned to the unit. A unit's value is computed from value(s) assigned to its derived units.

### Lifecycle
Every unit has it's own dedicated apex domain or subdomain. A handful of scripts and configuration files define a unit:
|File|Purpose
|-|-
|**`base.uri`**|*(optional)* gives the origin of the base unit this unit extends<br>*The base unit can be referred to using the keyword "super" in any of the following scripts.*
|**`define.js`**|runs when instantiating a unit; used to instantiate dependant units
|**`.env`**|environment variable keys (with optional values) made available to define.js
|**`setState.js`**|change the value assigned to the unit and propagate that change both rootward and leafward
|**`propagateRootward.js`**<br>**`propagateLeafward.js`**|react to and pass along changes made elsewhere in the system
|**`install.js`**|bind the unit to existing document elements and create dedicated elements
|**`uninstall.js`**|unbind the unit from existing document elements and destroy dedicated elements

Native javascript events interface with these lifecycle scripts and the client application is the type whose name is `location.host`.

### Change Propagation
Using the type lifecycle, a change in any datum propagates out to the entire system - every datum is an endpoint that drives the system within its defined range of motion. A unit defines a polynomial expression equal to the cardinality of the set of valid value assignemnts for the unit. The root unit defines a polynomial expression equal to the cardinality of the set of valid code paths for the entire system. Every level of the hierarchy is both a single unit and an array of 0 or more units.

## Project Roadmap
|Status|Phase|Description
|-|-|-
|✅ Done|**Core framework**|Philosophy, functionality and algorithm
|✅ Done|**CI/CD pipeline**|Automation of content deployment
|🔄 Ongoing|**Example content**|Live demos and documentation
|⏳ Planned|**Bootstrapped IDE**|A development environment for contributors