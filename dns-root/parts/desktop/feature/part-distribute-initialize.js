super()

if (!feature.environments)
 throw new PartError("Feature is missing an environments array. " + feature.host)

if (feature.environments.includes(ENVIRONMENT)) {
 feature.supported = feature.checkSupport()
 if (feature.supported) {
  const isAsync = "initializeAsync" in feature
  feature.promise = isAsync ? feature.initializeAsync() : (feature.initialize(), new Promise(x => x()))
  feature.promise.then(() => log(0, feature.framework.niceName + " Good."))
 } else {
  feature.error = "support-check-failed"
 }
} else {
 feature.error = "wrong-environment"
}