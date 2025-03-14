const {
 host: HOST,
 pathname: PATH,
 searchParams: PARAMS,
 hash: HASH
} = REQUEST
const FILENAME = PATH.split('/').pop()
const [TYPE, ENCODED] = Framework.headerOf(FILENAME)