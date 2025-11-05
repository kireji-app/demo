agent.define({
 isMac: { value: nav.userAgent.indexOf("Mac") > -1 },
 isSafari: { value: /^((?!chrome|android).)*safari/i.test(nav.userAgent) }
})