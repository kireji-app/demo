if (feature.environments.includes(ENVIRONMENT)) {
 feature.supported = feature.checkSupport()
 if (feature.supported) {
  feature.promise = part.initializeAsync()
  feature.promise.then(() => log(0, feature.framework.niceName + " Good."))
 } else {
  feature.error = "support-check-failed"
 }
} else {
 feature.error = "wrong-environment"
}