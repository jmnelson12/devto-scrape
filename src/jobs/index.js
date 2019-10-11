const SaveBlogData = require('./saveBlogData');
const config = require('../config');

module.exports = ({ agenda }) => {
    agenda.define('devto-scrape-weekly-blogs',
        { priority: 'high', concurrency: config.agenda.concurrency },
        new SaveBlogData().handler,
    );

    agenda.start();
}
