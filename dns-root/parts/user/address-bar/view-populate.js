if (now - addressBar.throttleStartTime >= addressBar.throttleDuration) {
 const href = desktop.stringifyRoute()

 if (href !== location.href)
  history.replaceState({}, null, href)
}