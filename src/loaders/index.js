const expressLoader = require('./express');
const Logger = require('./logger');

module.exports = async ({ expressApp, nextHandler }) => {
    await expressLoader({ app: expressApp, nextHandler });
    Logger.info('Express loaded');
}
