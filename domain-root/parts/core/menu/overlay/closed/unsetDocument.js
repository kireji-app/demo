if (document.activeElement === this.overlay) this.overlay.blur()

this.menuButton.onclick = undefined
delete this.menuButton

this.overlay.removeAttribute("style")
delete this.overlay