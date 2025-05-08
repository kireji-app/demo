if (now - addressBar.throttleStartTime >= addressBar.throttleDuration) {
 if (user.route.pathname !== location.pathname)
  history.replaceState({}, null, user.route.pathname)
}