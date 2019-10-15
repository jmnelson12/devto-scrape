const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const jobsLoader = require('../jobs');
const dependencyInjectorLoader = require('./dependencyInjector');

module.exports = async ({ app }) => {
    const mongoConnection = await mongooseLoader();
    console.log('DB loaded and connected... ');

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
    console.log('Dependency Injector loaded... ');

    await jobsLoader({ agenda });
    console.log('Jobs loaded... ');

    await expressLoader(app);
    console.log('Express routes loaded... ');

    // start scrape service
    //agenda.every('30 seconds', 'devto-scrape-weekly-blogs', { link: null }); // for testing
    agenda.every('15 minutes', 'devto-scrape-weekly-blogs', { link: null });

    // this is how we could use it in other files
    // const { Container } = require('typedi');
    // const agendaInstance = Container.get('agendaInstance');
    // agendaInstance.processEvery('one minute', 'devto-scrape-weekly-blogs', { link: null });
}
