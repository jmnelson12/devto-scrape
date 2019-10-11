const agendash = require('./routes/agendash');

module.exports = (app) => {
    agendash(app);

    return app;
}
