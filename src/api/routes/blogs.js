const middlewares = require('../middlewares');

module.exports = (app) => {
    app.get('/blogs', middlewares.isAuth, (req, res) => {
        return res.json("oi").status(200);
    });
}
