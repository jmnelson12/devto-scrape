const ScrapeDevToService = require('../services/scrapeDevTo');

module.exports = class SaveBlogData {
    async handler(job, done) {
        const { link } = job.attrs.data;
        const scrapeInstance = new ScrapeDevToService();
        await scrapeInstance.scrapeTopWeeklyBlogs(link);
        done();
    }
};
