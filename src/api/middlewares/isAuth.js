const config = require('../../config');
const Logger = require('../../loaders/logger');

module.exports = async function (req, res, next) {
    const token = req.body.token || req.params.token || req.query.token || null;

    next();
}
