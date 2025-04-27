super()

if (!feature.environments)
 throw new PartError("Feature is missing an environments array. " + feature.host)

if (feature.environments.includes(environment)) {
 feature.supported = feature.checkSupport()
 if (feature.supported) {
  const isAsync = "installAsync" in feature
  feature.promise = isAsync ? feature.installAsync() : (feature.install?.(), new Promise(x => x()))
  feature.promise.then(() => log(1, `${feature.instancePath} ready.`))
 } else {
  feature.error = "support-check-failed"
 }
} else {
 feature.error = "wrong-environment"
}