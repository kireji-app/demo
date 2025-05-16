openLog(1, feature.key)
if (feature.supported) {
 feature.promise = feature.installAsync().then(() => { log(2, `Feature "${feature.instancePath}" installed asynchronously.`), log(3, `Feature install callback.`) })
 log(2, `Feature enqueued.`)
} else log(1, `Feature skipped: ${feature.error}`)
closeLog(1)