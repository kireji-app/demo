if (Framework.environment === "desktop") {
 feature.supported = feature.checkSupport()
 if (feature.supported) {
  feature.promise = part.initializeAsync()
  feature.promise.then(() => Framework.log(0, feature.framework.niceName + " Good."))
 } else {
  feature.error = "missing"
 }
} else {
 feature.error = "environment"
}