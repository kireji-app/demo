update.isUpgrading = true

client.promise.then(() => {
 const model = JSON.parse(localStorage.getItem(location.href))
 localStorage.removeItem(location.href)

 // TODO: Collect update data integrity report and present in user-facing modal.
 // TODO: Consider clearing localStorage items older than a certain timestamp?
 // TODO: Make this a user-facing error, as part of the future integrity report.
 if (!model)
  throw new Error('Update Failed: unable to retrieve model from localStorage.')

 _.setRoute(`https://${location.host}${encodeRoute(_.modelToRouteID(model))}`)

 document.body.classList.remove("upgrading")
 update.isUpgrading = false
})