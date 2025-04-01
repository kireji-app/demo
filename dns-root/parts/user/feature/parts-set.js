if (ENVIRONMENT === "desktop") {
 feature.supported = feature.checkSupport()
 if (feature.supported) {
  feature.promise = part.initializeAsync()
  feature.promise.then(() => log(0, feature.framework.niceName + " Good."))
 } else {
  feature.error = "missing"
 }
} else {
 feature.error = "environment"
}