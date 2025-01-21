## [This is where I develop my personal project.](https://github.com/EJAugust/EJAugust)<br>[![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/your-username/your-repo) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
This project demonstrates a front-end framework that I have been developing for years.

It is the framework used to build all of my personal projects.

It unites smaller data type definitions into larger ones and gives those instances a common lifecycle where they are injected on creation with a context that includes their mathematical relationship with both the instances that created them (except for the root type) and the instance(s) that they instantiate.

All types are js classes extending from a common base type and all instances are therefore mutable js objects. The framework handles propagation of a change in state of any of these instances to all of the others.

Every instance has an integer value which maximally compresses all of the instance's state information. This integer is the source of truth for the object and can be thought of as the index of that instance in an imaginary array of all valid instances the type can produce.

This makes each web component (and each app as a whole) its own dedicated file type which maximally compresses all of the component's or application's states.

Every type also has a unique name, which must be a valid apex domain or subdomain. This allows each component to store data about itself as DNS records, for example using A-records to point to components which are client applications.

##### Project Roadmap
|Status|Phase|Description
|-|-|-
|✅ Done|**Core framework**|Philosophy, functionality and algorithm
|✅ Done|**CI/CD pipeline**|Automation of content deployment
|🔄 Ongoing|**Example content**|Live demos and documentation
|⏳ Planned|**Bootstrapped IDE**|A development environment for contributors