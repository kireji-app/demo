const registrations = await navigator.serviceWorker.getRegistrations()
Object.defineProperty(update, "registrations", { value: registrations })