desktop.menuElement.setAttribute("style", "--menu-tween: 1")
document.body.classList.add("menu-open")
desktop.menuElement.onclick = () => part.parent.set(1n, true)
