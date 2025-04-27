module.exports = {
 GET: request => serverless.fetchSync(request.url)
}