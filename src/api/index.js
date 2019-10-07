const { Router } = require('express');
const blogs = require('./routes/blogs');

module.exports = () => {
    const app = Router();
    blogs(app);

    return app;
}
