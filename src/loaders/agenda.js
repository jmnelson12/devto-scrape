const Agenda = require('agenda');
const config = require('../config');

module.exports = ({ mongoConnection }) => {
    return new Agenda({
        mongo: mongoConnection,
        db: { address: config.agenda.dbCollection },
        processEvery: config.agenda.pooltime,
        maxConcurrency: config.agenda.maxConcurrency
    });
}
