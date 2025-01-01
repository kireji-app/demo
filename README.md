# Kireji: Offline, Secure Content Creation for the Web

Kireji is a new approach to data privacy and content safety on the web. Instead of creating content, you find it. Whatever you find, there's already a link to it. As a result, you don't need to be connected to the internet to find and share content.

## Key Features

- **Offline First:** After you visit kireji the first time, everything you do is local.
- **Secure by Design:** Kireji is read-only. Malicious users have no opportunity to upload content.
- **Easy Sharing:** Whatever you can find in kireji, you can share a link to it.
- **Infinite Possibilities:** There are more permalinks on Kireji than particles in the known universe.

## Examples and Demos

- [kireji.io](https://kireji.io) - Permalinks to all valid English expressions within a given grammar (currently supports a few simple models), allowing them to be shared as messages.
- [glowstick.click](https://glowstick.click) - Streaming platform providing permalinks to every subset (clip) of every video in the library. 2D and 3D animations play in real time rather than as prerendered video.
- More coming soon.

## Under the Hood

- **Bijection:** There is a 1:1 correspondance between URL and application state in kireji, giving every state a permalink.
- **Configuration Space:** Kireji is one big configuration space wherein each point is a model describing an application state.
- **Parts:** Kireji has parts. A part is a mathematical entity that turns simple math into a working application. A part is the meeting point of many different notions - the variable, the operation, the function call, the state machine, the vertex in graph theory, the reusable UI component, and more. The root part is called "boot" and is both the global configuration space and the defined point in that space which renders the current application state. There are many intuitive ways to think about parts.
- **Cardinality:** Taking parts as state machines, the number of states (cardinality) of each part is known. This is critical for quickly mapping entities across the bijection. The cardinality of an application can be unfathomably large and the greater it is, the longer the length of it's permalinks are. Because some older browsers and databases will truncate a URL greater than 2000 characters and because we store 6 bits of state information per URL character, there is a soft limit of around 2^12000 states per kireji app. For many applications, this is far more than you need. However, for creative applications, the cardinality often becomes quite large. There is no limit on the total number of apps that can be included in the global space.
- **Security by Additive Design:** Malicious actors love to share offensive content online. By slowly adding content customization dimensions to Kireji one-by-one, users are given more and more creative control over what content they share. However, malicious actors will never be able to share content which the designer didn't add.

## About the Team

- **Eric Augustinowicz:** I am a self-taught software engineer, 3D artist and mathemitican. I am consolidating everything I want into one platform - this platform.

## Contributing

- At this time, only I can contribute to kireji. This is because the application is pre-alpha and I am still answering questions about how the platform needs to work. However, I am hopeful that the platform will become community-run.

## License

- This project and the techniques used to make it work were discovered and are owned by me. For inquiries, please contact me.
