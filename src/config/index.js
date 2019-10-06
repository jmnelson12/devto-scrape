const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();

if (!env) {
    throw new Error("!! Couldn't find .env file !!");
}

module.exports = {
    port: parseInt(process.env.PORT, 10),
    // databaseURL: process.env.MONGODB_URI,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
        key: process.env.API_KEY
    },
    /**
     * Agenda.js stuff

    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
    },*/

    /**
     * Agendash config

    agendash: {
        user: 'agendash',
        password: '123456'
    },*/
}
