# Demo - *App Ecosystem*
> **<sub>Part of the Kireji Project</sub>**<br><sup><i>omnia ex una linea</i></sup>

The Demo App Ecosystem serves as the unified host for all applications demonstrating the Kireji Project. It represents a multi-origin app ecosystem that uses the Kireji Web Framework so that all apps share a **single, unified state** encoded in a URL, enabling cross-origin task-switching and a portable save-state system.
## The Kireji Project
The Kireji Project poses a question: **What if we could treat every web page as a point in a unified, mathematically mapped space?**

| Repo | Purpose
| ---- | -------
| [MPHF](https://github.com/kireji-app/mphf#readme) | [Coordinate System<br><sup>A bijective coordinate system for hashing structured data</sup>](https://github.com/kireji-app/mphf#readme)
| [Kireji](https://github.com/kireji-app/kireji#readme) | [Web Framework<br><sup>A reactive web framework with MPHF routing</sup>](https://github.com/kireji-app/kireji#readme)
| **Demo**| **App Ecosystem - ★ You are here<br><sup>An example app ecosystem demonstrating the project</sup>**

## Demo Applications
These applications are in *alpha* and still undergoing research and development.

<h3><a href="https://ejaugust.com"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/com/ejaugust/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>EJ's Notebook</sup></a></h3>

- Essays and notes about the concepts that drive the project.

<h3><a href="https://kireji.app"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/app/kireji/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>Part Viewer</sup></a></h3>

- Explore the demo app ecosystem and its component parts using an IDE-style application.

<h3><a href="https://orenjinari.com"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/com/orenjinari/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>orenjinari</sup></a></h3>

- The portfolio of the project's resident artist, showcasing the unique aesthetic she brings to the project.

<h3><a href="https://glowstick.click"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/click/glowstick/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>Glowstick</sup></a></h3>

- Explore the app ecosystem through the lens of an open-world pixel art game.

<h3><a href="https://desktop.parts"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/desktop/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>desktop.parts</sup></a></h3>

- Experience the app ecosystem with a familiar operating system look-and-feel.

### Coming Soon
These applications coming soon!
<h3><a href="https://kireji.io"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/io/kireji/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>kireji.io</sup></a></h3>
<h3><a href="https://core.parts"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/abstract/part/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>core.parts</sup></a></h3>
<h3><a href="https://abstract.parts"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/abstract/part/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>abstract.parts</sup></a></h3>
<h3><a href="https://user.parts"><img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/abstract/part/part.png" style="width:1.25em"/>&nbsp;&nbsp;<sup>user.parts</sup></a></h3>

### Tech Stack
The ecosystem is built on a minimal dependency stack. It is powered by the **Kireji Web Framework** and uses **Vanilla JavaScript** with no third-party dependencies to ensure a fully self-contained, auditable runtime environment.

[![Debian](https://img.shields.io/badge/Debian-Operating_System-212121?&labelColor=A81D33&style=for-the-badge&logo=Debian&logoColor=white)](https://www.debian.org/)
<br>[![nginx](https://img.shields.io/badge/nginx-Reverse_Proxy-212121.svg?labelColor=009639&style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
<br>[![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-SSL_Provider-212121?labelColor=003A70&style=for-the-badge&logo=letsencrypt&logoColor=white)](https://letsencrypt.org/)
<br>[![Node.js](https://img.shields.io/badge/Node.js-Server_Runtime-212121?labelColor=5FA04E&style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
<br>[![kireji](https://img.shields.io/badge/kireji-App_Framework-212121?labelColor=222334&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zMCAtMzAgNTYwIDU2MCI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9Im1hc2siPgogICA8ZWxsaXBzZSBjeD0iMjUwIiBjeT0iMjUwIiByeD0iMjUwIiByeT0iMjUwIj48L2VsbGlwc2U+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxjaXJjbGUgY2xpcC1wYXRoPSJ1cmwoI21hc2spIiBzdHlsZT0iZmlsbDogbm9uZTsgc3Ryb2tlOiAjZmZmNDsgc3Ryb2tlLXdpZHRoOiA4NDsiIGN4PSIyNTAiIGN5PSIyNTAiIHI9IjI1MCI+PC9jaXJjbGU+CiA8Y2lyY2xlIGNsaXAtcGF0aD0idXJsKCNtYXNrKSIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogICNmZmY0OyBzdHJva2Utd2lkdGg6IDQyOyIgY3g9IjI1MCIgY3k9IjczLjIyMzMwNDcwMzQiIHI9IjE3Ni43NzY2OTUyOTciPjwvY2lyY2xlPgogPGNpcmNsZSBjbGlwLXBhdGg9InVybCgjbWFzaykiIHN0eWxlPSJmaWxsOiBub25lOyBzdHJva2U6ICNmZmY0OyBzdHJva2Utd2lkdGg6IDQyOyIgY3g9IjczLjIyMzMwNDcwMzQiIGN5PSI0MjYuNzc2Njk1Mjk3IiByPSIzNTMuNTUzMzkwNTkzIj48L2NpcmNsZT4KIDxwYXRoIGNsaXAtcGF0aD0idXJsKCNtYXNrKSIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA0MjsiIGQ9Ik0gNDI2Ljc3NjY5NTI5NyA1MDAgQSAzNTMuNTUzMzkwNTkzIDM1My41NTMzOTA1OTMgMCAwIDAgMzU2LjA3IDIxNC42NCBBIDE3Ni43NzY2OTUyOTcgMTc2Ljc3NjY5NTI5NyAwIDAgMCAyNTAgLTEwMy41NTMzOTA1OTQiIC8+CiA8Y2lyY2xlIGNsaXAtcGF0aD0idXJsKCNtYXNrKSIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA0MjsiIGN4PSI3My4yMjMzMDQ3MDM0IiBjeT0iMjUwIiByPSIxNzYuNzc2Njk1Mjk3Ij48L2NpcmNsZT4KPC9zdmc+&logoColor=white)](https://github.com/kireji-app/kireji)
<br>[![HTML5](https://img.shields.io/badge/HTML5-Document_Structure-212121?labelColor=E34F26&style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
<br>[![CSS](https://img.shields.io/badge/CSS-Document_Style-212121?labelColor=1572B6&style=for-the-badge&logo=css&logoColor=white)](https://www.w3.org/Style/CSS/)
<br>[![JavaScript](https://img.shields.io/badge/JavaScript-Logic-212121?labelColor=F7DF1E&style=for-the-badge&logo=javascript&logoColor=black)](https://262.ecma-international.org/)

### Status and License
The Demo App Ecosystem is in **Alpha**

The Kireji Project is in **early research and development**.

[![Project Status: Alpha](https://img.shields.io/badge/status-alpha-212121?style=for-the-badge&labelColor=181717&logo=github&logoColor=white)](https://www.repostatus.org/#alpha)
<br>[![Commits](https://img.shields.io/github/commit-activity/t/kireji-app/demo?style=for-the-badge&labelColor=181717&color=212121&logo=github&logoColor=white)](https://github.com/kireji-app/demo/commits/)
<br>[![GitHub Last Commit](https://img.shields.io/github/last-commit/kireji-app/demo?style=for-the-badge&labelColor=181717&color=212121&logo=github&logoColor=white)](https://github.com/kireji-app/demo)
<br>[![Copyright © 2013-2025 <a href="https://ejaugust.com">Eric Augustinowicz</a> and <a href="https://orenjinari.com">Kristina Soriano</a>](https://img.shields.io/badge/2013%20--%202025-Eric_Augustinowicz%20&%20Kristina_Soriano-212121?labelColor=007ec6&style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk3cHgiIGhlaWdodD0iMTk3cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj4KIDxkZWZzPgogIDxtYXNrIGlkPSJtYXNrIj4KICAgPGNpcmNsZSBjeD0iOTgiIGN5PSI5OCIgcj0iOTgiIGZpbGw9IndoaXRlIiAvPgogICA8Y2lyY2xlIGN4PSI5OCIgY3k9Ijk4IiByPSI3OCIgZmlsbD0iYmxhY2siIC8+CiAgIDxjaXJjbGUgY3g9Ijk4IiBjeT0iOTgiIHI9IjU1IiBmaWxsPSJ3aGl0ZSIgLz4KICAgPGNpcmNsZSBjeD0iOTgiIGN5PSI5OCIgcj0iMzAiIGZpbGw9ImJsYWNrIiAvPgogICA8cmVjdCB4PSIxMTUiIHk9Ijg1IiB3aWR0aD0iNDUiIGhlaWdodD0iMjUiIGZpbGw9ImJsYWNrIiAvPgogIDwvbWFzaz4KIDwvZGVmcz4KIDxwYXRoIGQ9Ik0gOTgsMCBBIDk4LDk4IDAgMSAxIDk4LDE5NiBBIDk4LDk4IDAgMSAxIDk4LDAgWiIgZmlsbD0id2hpdGUiIG1hc2s9InVybCgjbWFzaykiIC8+Cjwvc3ZnPg==)](http://ejaugust.com/)
<br>[![Released under CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-212121?labelColor=ED592F&style=for-the-badge&logo=creativecommons&logoColor=white)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
<br>[![Sponsor the Project](https://img.shields.io/badge/Sponsor-212121?labelColor=red&style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OTciIGhlaWdodD0iNDcwIj48cGF0aCBkPSJNMTQwIDIwQzczIDIwIDIwIDc0IDIwIDE0MGMwIDEzNSAxMzYgMTcwIDIyOCAzMDMgODgtMTMyIDIyOS0xNzMgMjI5LTMwMyAwLTY2LTU0LTEyMC0xMjAtMTIwLTQ4IDAtOTAgMjgtMTA5IDY5LTE5LTQxLTYwLTY5LTEwOC02OXoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNDAiIGZpbGw9Im5vbmUiLz48L3N2Zz4=&logoColor=white)](https://github.com/sponsors/EJAugust)