const ScrapeDevToService = require('../services/scrapeDevTo');
const Logger = require('../loaders/logger');
const { Container } = require('typedi');

module.exports = class SaveBlogData {
    async handler(job, done) {
        try {
            const { link } = job.attrs.data;
            const scrapeInstance = new ScrapeDevToService();
            const data = await scrapeInstance.scrapeTopWeeklyBlogs(link); // return it
            const blogModel = Container.get('blogModel');

            // save it to db here
            if (data && data.length != 0) {
                await blogModel.deleteMany({}, (err) => {
                    if (err) {
                        console.error("Error Deleting All Blogs", err);
                    }
                }); // clear collection

                // save new blogs
                data.forEach(blog => {
                    let b = new blogModel(blog);
                    b.save((err, _b) => {
                        if (err) {
                            console.error("\nError Saving Blog", err);
                        }
                    });
                });

                Logger.info("Successfully saved new blogs list !!");
            } else {
                throw "(/src/jobs/saveBlogData) - Data Scrape Error";
            }
        } catch (err) {
            Logger.error("(/src/jobs/saveBlogData) - Error");
            Logger.error(err);
        } finally {
            done();
        }
    }
};
