## [About This Repository](https://github.com/EJAugust/EJAugust#about-this-repository---) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/your-username/your-repo) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
This repo unites all my personal projects using a frontend framework that I have been developing for years.

Every web app built in this framework offers a permalink to every valid client state, generated automatically. That URL achieves maxmimal compression storing the state of the client application.

This allows offline browsing, editing and sharing.

## [Components](https://github.com/EJAugust/EJAugust#components)
Each web application - and, separately, each datum that makes up the application's state - is a reusable component. Each component is defined as a type. Types and their instances follow the *type lifecycle* and type instances store their state in a maximally compressed way.

## [Type lifecycle](https://github.com/EJAugust/EJAugust#type-lifecycle)
A type is defined by three pairs of lifecycle callbacks:
|Event name|Event trigger
|-|-
|**`install`** and **`uninstall`** (*static*)|called when adding or removing a type
|**`create`** and **`destroy`**|called when adding or removing an instance
|**`emit`** and **`absorb`**|called when propagating changes across instances

Native javascript events interface with these lifecycle events, and the client application is the type whose name is `location.host`.

## [Change propagation](https://github.com/EJAugust/EJAugust#change-propagation)
Using the type lifecycle, a change in any datum propagates to the global state - every datum is an endpoint that drives its dependant data. A polynomial expression gives  hierarchy of types. Every level of the hierarchy is both a single datum and an array of 0 or more data.

## [Project Roadmap](https://github.com/EJAugust/EJAugust#project-roadmap)
|Status|Phase|Description
|-|-|-
|✅ Done|**Core framework**|Philosophy, functionality and algorithm
|✅ Done|**CI/CD pipeline**|Automation of content deployment
|🔄 Ongoing|**Example content**|Live demos and documentation
|⏳ Planned|**Bootstrapped IDE**|A development environment for contributors