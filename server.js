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

        server.use('/test1', (req, res) => {
            return res.json("test1").status(200);
        });

        server.get('/test2', (req, res) => {
            return res.json("test2").status(200);
        });

        await require('./src/loaders')({ app: server });

        // for next.js
        server.all('*', (req, res) => handle(req, res));
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
