const express = require('express');
const next = require('next');
const config = require('./src/config');
const sslRedirect = require("heroku-ssl-redirect");

function startServer() {
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare().then(async () => {
        const server = express();

        await require('./src/loaders')({ app: server });

        if (!dev) { // for heroku -> default to https
            server.use(sslRedirect());
        }

        // for next.js
        server.all('*', (req, res) => handle(req, res));
        server.listen(config.port, err => {
            if (err) {
                console.log(err);
                process.exit(1);
                return;
            }
            console.log(`>> App running on: http://localhost:${config.port} <<`);
        })
    })
}
startServer();
