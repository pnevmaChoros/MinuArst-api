function getBaseUrl(request) {
    return request.connection && 
    request.connection.encrypted
    ? 'https' : 'http' + `://${request.headers.host}`;
}

module.exports = {getBaseUrl};