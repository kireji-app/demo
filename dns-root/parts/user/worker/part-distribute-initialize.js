if (globe.worker && globe.worker !== feature)
 Object.assign(globe.worker, feature)

globe.worker = feature

worker.environments = ["window", "worker"]
super()