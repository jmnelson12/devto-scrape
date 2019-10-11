const cors = require('cors');
const helmet = require('helmet');
const routes = require('../api');
const config = require('../config');

module.exports = (app) => {
    // Shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    app.use(helmet());

    // load api routes
    // app.routes(config.api.prefix, routes(app));
    routes(app);
}
