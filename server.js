const express = require('express');
const next = require('next');
const config = require('./src/config');
const Logger = require('./src/loaders/logger');

function startServer() {
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare().then(async () => {
        const server = express();

        await require('./src/loaders')({ expressApp: server });

        // for next.js
        server.all('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(config.port, err => {
            if (err) {
                Logger.error(err);
                process.exit(1);
                return;
            }
            Logger.info(`>> App running on: http://localhost:${config.port} <<`);
        })
    })
}
startServer();
