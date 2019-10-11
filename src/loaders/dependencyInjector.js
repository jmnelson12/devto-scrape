const { Container } = require('typedi');
const Logger = require('./logger');
const agenda = require('./agenda');

module.exports = ({ mongoConnection, models }) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        const agendaInstance = agenda({ mongoConnection });

        Container.set('agendaInstance', agendaInstance);
        Container.set('logger', Logger);

        Logger.info('Agenda injected into container');

        return { agenda: agendaInstance };
    } catch (e) {
        Logger.error(' Error on dependency injector loader: %o', e);
        throw e;
    }
}
