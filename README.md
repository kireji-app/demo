## [About This Repository](https://github.com/EJAugust/EJAugust) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/your-username/your-repo) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
This repo unites all my personal projects using a frontend framework that I have been developing for years.

Every web app built in this framework offers a permalink to every valid client state, generated automatically. That URL achieves maxmimal compression storing the state of the client application.

This allows offline browsing, editing and sharing.

## Web Components as Nested State Machines
Each web application - and each branch and leaf that makes up the application's model - is a reusable component. Each component is a state machine in it's own right. Each machine maintains it's state as an integer with the maximum possible compression.

### Lifecycle
Every machine is defined by these lifecycle methods:
|Name|Purpose
|-|-
|**`install`**|given arbitrary inputs, instantiate the machine and any dependant machines
|**`open`**|bind the machine to user interface components
|**`close`**|unbind the machine from user interface components
|**`goto`**|change the state of the machine and propagate it both rootward and leafward
|**`emit`**|react to and propagate rootward a state change that happened in the leaf direction
|**`absorb`**|react to and propagate leafward a state change that happened in the root direction

Native javascript events interface with these lifecycle events, and the client application is the type whose name is `location.host`.

### Change Propagation
Using the type lifecycle, a change in any datum propagates to the global state - every datum is an endpoint that drives its dependant data. A polynomial expression gives a hierarchy of types. Every level of the hierarchy is both a single datum and an array of 0 or more data.

## Project Roadmap
|Status|Phase|Description
|-|-|-
|✅ Done|**Core framework**|Philosophy, functionality and algorithm
|✅ Done|**CI/CD pipeline**|Automation of content deployment
|🔄 Ongoing|**Example content**|Live demos and documentation
|⏳ Planned|**Bootstrapped IDE**|A development environment for contributors