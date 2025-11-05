try {
 _.setRoute(location.href)
} catch (e) {
 error(e)
 _.setRoute(`https://${location.host}/${_.version}/${_.landingHash}/`)
}