if (!feature.environments)
 throw new PartError("Feature is missing an environments array. " + feature.host)

super()

feature.isAsync = "installAsync" in feature

if (feature.environments.includes(environment)) {

 feature.supported = feature.checkSupport()

 if (!feature.supported)
  feature.error = "support-check-failed"

} else {

 feature.error = "wrong-environment"

}