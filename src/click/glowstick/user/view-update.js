glowstick.handleElement?.style.setProperty("--arrow", `"${user.arrow}"`)
user.element.classList.remove("left", "right", "front", "back", "front-left", "front-right", "back-left", "back-right")
user.element.classList.add(user.direction)