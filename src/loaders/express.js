const cors = require('cors');
const helmet = require('helmet');
const routes = require('../api');

module.exports = (app) => {
    // Shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    app.use(helmet());

    // load api routes
    routes(app);
}
