glowstick.handleElement?.style.setProperty("--arrow", `"${user.arrow}"`)
user.element.classList.remove("left", "right", "front", "back")
user.element.classList.add(user.direction)