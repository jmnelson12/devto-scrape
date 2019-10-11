const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const jobsLoader = require('../jobs');
const dependencyInjectorLoader = require('./dependencyInjector');
const Logger = require('./logger');

module.exports = async ({ app }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('DB loaded and connected... ');

    const blogModel = {
        name: 'blogModel',
        model: require('../models/Blog')
    };

    const { agenda } = await dependencyInjectorLoader({
        mongoConnection,
        models: [
            blogModel
        ],
    });
    Logger.info('Dependency Injector loaded... ');

    await jobsLoader({ agenda });
    Logger.info('Jobs loaded... ');

    await expressLoader(app);
    Logger.info('Express routes loaded... ');

    // start scrape service
    //agenda.every('one minute', 'devto-scrape-weekly-blogs', { link: null });

    // this is how we could use it in other files
    // const { Container } = require('typedi');
    // const agendaInstance = Container.get('agendaInstance');
    // agendaInstance.processEvery('one minute', 'devto-scrape-weekly-blogs', { link: null });
}
