const express = require('express');
const next = require('next');
const config = require('./src/config');
const Logger = require('./src/loaders/logger');

async function startServer() {
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const server = express();
    const handle = app.getRequestHandler();

    await require('./src/loaders')({ expressApp: server });

    app.prepare().then(() => {
        const server = express()

        // for next.js
        server.get('*', (req, res) => {
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
