const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('../api');
const config = require('../config');

module.exports = ({ app }) => {
    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    app.use(helmet());
    app.disable("x-powered-by");

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/zest', (req, res, next) => {
        console.log('used /api');
        next();
    });
    app.get('/zest/bb', (req, res) => {
        return res.json('bbbb').status(200);
    });

    // Load API routes
    app.use(config.api.prefix, routes());

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
}
