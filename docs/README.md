# Kireji Live Demos

This project is devoted to testing and demonstrating the [kireji](https://github.com/kireji-app/kireji#readme) framework and to the persuit of lofty goals.

It is a connected cross-origin app ecosystem that unites multiple web apps with a single data model. The look-and-feel is designed to reflect the familiar notions of a desktop operating system. Its seamless cross-origin navigation feels like in-app navigation.

All of the blow apps offer a permalink to every state they can be in and share their state with eachother seemlessly. This enables robust debugging and lets users save their place, using the URL as a single save-game file for the entire platform.

It demonstrates kireji's powerful local state sharing. The whole project works without cookies, javascript storage APIs, user authentication, shared workers, CORS, user tracking or uploading state information to a server.

* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/app/kireji/www/part.png" style="width:1em;vertical-align:middle"/> www.kireji.app](https://www.kireji.app) – **Kireji Viewer**<br>Explores the parts that make up the platform
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/com/ejaugust/www/part.png" style="width:1em;vertical-align:middle"/> www.ejaugust.com](https://www.ejaugust.com) – **EJ's Notebook**<br>A blog that runs on and talks about the platform
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/com/orenjinari/www/part.png" style="width:1em;vertical-align:middle"/> www.orenjinari.com](https://www.orenjinari.com) - orenjinari**<br>Our resident artist's portfolio
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/desktop/www/part.png" style="width:1em;vertical-align:middle"/> www.desktop.parts](https://www.desktop.parts) – **Desktop Parts**<br>A familiar desktop O/S experience
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/core/www/part.png" style="width:1em;vertical-align:middle"/> www.core.parts](https://www.core.parts) - **Core Parts**<br>Future home of the kireji core component library
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/core/part/part.png" style="width:1em;vertical-align:middle"/> www.user.parts](https://www.user.parts) - **User Parts**<br>Future home of community-curated part prototype
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/core/part/part.png" style="width:1em;vertical-align:middle"/> www.kireji.io](https://www.kireji.io) - **kireji.io**<br>Future home of a Gamified Universal IDE
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/parts/core/part/part.png" style="width:1em;vertical-align:middle"/> www.glowstick.click](https://www.glowstick.click) - **Glowstick**<br>Future home of ... something.

What to know what's coming next for kireji Demos? Check out these articles from EJ's Notebook that hint at the bold ideas driving development.

* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/com/ejaugust/note/part.png" style="width:1em;vertical-align:middle"/> The Multiverse and the Universal IDE](https://www.ejaugust.com/0.126.10/4lbeO3z_cmrXOKxrM/)
* [<img src="https://raw.githubusercontent.com/kireji-app/demo/refs/heads/main/src/com/ejaugust/note/part.png" style="width:1em;vertical-align:middle"/> The Gamified Universal IDE](https://www.ejaugust.com/0.126.10/4lbofySVBqVXOKxrM/)

---

#### Stack
![](https://img.shields.io/badge/Debian-A81D33?&style=for-the-badge&logo=Debian&logoColor=white)
<br>![NGINX](https://img.shields.io/badge/nginx-009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
<br>![CERTBOT](https://img.shields.io/badge/Let's_Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)
<br>![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
<br>![kireji](https://img.shields.io/badge/kireji-222334?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0zMCAtMzAgNTYwIDU2MCI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9Im1hc2siPgogICA8ZWxsaXBzZSBjeD0iMjUwIiBjeT0iMjUwIiByeD0iMjUwIiByeT0iMjUwIj48L2VsbGlwc2U+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxjaXJjbGUgY2xpcC1wYXRoPSJ1cmwoI21hc2spIiBzdHlsZT0iZmlsbDogbm9uZTsgc3Ryb2tlOiAjZmZmNDsgc3Ryb2tlLXdpZHRoOiA4NDsiIGN4PSIyNTAiIGN5PSIyNTAiIHI9IjI1MCI+PC9jaXJjbGU+CiA8Y2lyY2xlIGNsaXAtcGF0aD0idXJsKCNtYXNrKSIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogICNmZmY0OyBzdHJva2Utd2lkdGg6IDQyOyIgY3g9IjI1MCIgY3k9IjczLjIyMzMwNDcwMzQiIHI9IjE3Ni43NzY2OTUyOTciPjwvY2lyY2xlPgogPGNpcmNsZSBjbGlwLXBhdGg9InVybCgjbWFzaykiIHN0eWxlPSJmaWxsOiBub25lOyBzdHJva2U6ICNmZmY0OyBzdHJva2Utd2lkdGg6IDQyOyIgY3g9IjczLjIyMzMwNDcwMzQiIGN5PSI0MjYuNzc2Njk1Mjk3IiByPSIzNTMuNTUzMzkwNTkzIj48L2NpcmNsZT4KIDxwYXRoIGNsaXAtcGF0aD0idXJsKCNtYXNrKSIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA0MjsiIGQ9Ik0gNDI2Ljc3NjY5NTI5NyA1MDAgQSAzNTMuNTUzMzkwNTkzIDM1My41NTMzOTA1OTMgMCAwIDAgMzU2LjA3IDIxNC42NCBBIDE3Ni43NzY2OTUyOTcgMTc2Ljc3NjY5NTI5NyAwIDAgMCAyNTAgLTEwMy41NTMzOTA1OTQiIC8+CiA8Y2lyY2xlIGNsaXAtcGF0aD0idXJsKCNtYXNrKSIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogI2ZmZjsgc3Ryb2tlLXdpZHRoOiA0MjsiIGN4PSI3My4yMjMzMDQ3MDM0IiBjeT0iMjUwIiByPSIxNzYuNzc2Njk1Mjk3Ij48L2NpcmNsZT4KPC9zdmc+&logoColor=white)
<br>![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
<br>![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white)
<br>![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

#### Status
[![Project Status: Alpha](https://img.shields.io/badge/Status-Alpha-222334?style=flat-square)](https://www.repostatus.org/#alpha)<br>
[![Commits](https://img.shields.io/github/commit-activity/t/kireji-app/demo?style=flat-square&color=222334)](https://github.com/kireji-app/demo)<br>
[![GitHub Last Commit](https://img.shields.io/github/last-commit/kireji-app/demo?style=flat-square&color=222334)](https://github.com/kireji-app/demo)

#### Notice

This is a research project. It is not a production library, tool or framework.

All content is prior art.

#### License

© 2013-2025 <a href="https://www.ejaugust.com">Eric Augustinowicz</a> and <a href="https://www.orenjinari.com">Kristina Soriano</a>

Licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="width:1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="width:1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="width:1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg" alt="" style="width:1em;max-height:1em;margin-left: .2em;">