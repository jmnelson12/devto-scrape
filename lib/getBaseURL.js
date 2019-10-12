export default function getBaseURL(req) {
    // from ==> https://github.com/wesbos/Syntax/blob/master/lib/getBaseURL.js
    /* eslint-disable no-nested-ternary */
    const protocol =
        req && (req.headers.host.indexOf('jmntesting') > -1 || req.headers.host.indexOf('devto-scrape') > -1)
            ? 'https'
            : req
                ? req.protocol
                : '';
    console.log('\n##########');
    console.log({ protocol, host: req.headers.host });
    console.log('##########\n');
    // const protocol = 'https';

    /* eslint-enable */
    const baseURL = req
        ? `${protocol}://${req.headers.host}`
        : window.location.origin;
    return baseURL;
}
