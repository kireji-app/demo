if (minosModal.arm === minosModal.none)
 minos.container.removeAttribute("data-modal")
else
 minos.container.setAttribute("data-modal", minosModal.arm.key)

Q("#modal").innerHTML = minosModal["part.html"]
