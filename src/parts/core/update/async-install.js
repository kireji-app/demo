const registrations = await navigator.serviceWorker.getRegistrations()

update.define({
 registrations: { value: registrations }
})