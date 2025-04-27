if (now - addressBar.throttleStartTime >= addressBar.throttleDuration && service.route.href !== location.href)
 history.replaceState({}, null, service.route.href)