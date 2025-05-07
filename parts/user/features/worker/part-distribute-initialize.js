if (globe.worker && globe.worker !== feature)
 Object.assign(feature, globe.worker)

globe.worker = feature

worker.environments = ["window", "worker"]
super()