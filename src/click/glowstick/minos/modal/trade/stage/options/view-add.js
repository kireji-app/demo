if (hydrated) {
 minos.container.setAttribute("data-modal", "trade.options")
 Q("#modal").innerHTML = minosTradeOptions["part.html"]

 if (minosTradeModal.wasEnabled) {
  // We pressed cancel on the confirmation.
  minosTradeModal.scroller.addView()
 } // else { we just opened it for the first time }
}