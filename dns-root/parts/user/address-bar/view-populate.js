if (now - addressBar.throttleStartTime >= addressBar.throttleDuration && serverless.route.href !== location.href)
 history.replaceState({}, null, serverless.route.href)