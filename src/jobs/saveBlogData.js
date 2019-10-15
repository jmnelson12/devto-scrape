const ScrapeDevToService = require('../services/scrapeDevTo');
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
                        console.log("### Error Deleting All Blogs ###", err);
                        throw err;
                    }
                }); // clear collection
                console.log('Deleted blogs from db');

                // save new blogs
                data.forEach(blog => {
                    new blogModel(blog).save((err, _b) => {
                        if (err) {
                            console.log("### Error Saving Blog ###", err);
                            throw err;
                        }
                        console.log(`Blog ${_b.id} saved`);
                    });
                });

                setTimeout(function () {
                    // adding timemout so we can see when running in /admin dash
                    done();
                }, 5000);
            } else {
                throw "(/src/jobs/saveBlogData) - Data Scrape Error";
            }
        } catch (err) {
            console.log("(/src/jobs/saveBlogData) - Error");
            console.log(err);
            done();
        }
    }
};
