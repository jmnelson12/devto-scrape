export default function getBaseURL(req) {
    // from ==> https://github.com/wesbos/Syntax/blob/master/lib/getBaseURL.js
    /* eslint-disable no-nested-ternary */
    const protocol =
        req && req.headers.host.indexOf('jmntesting') > -1
            ? 'https'
            : req
                ? req.protocol
                : '';

    /* eslint-enable */
    const baseURL = req
        ? `${protocol}://${req.headers.host}`
        : window.location.origin;
    return baseURL;
}
