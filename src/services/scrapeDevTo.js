const puppeteer = require('puppeteer');
const Logger = require('../loaders/logger');
const BASE_DEV_TO_URL = 'https://dev.to';
const BASE_WEEK_URL = `${BASE_DEV_TO_URL}/top/week`;

module.exports = class DevToScrape {
    constructor(grabLimit = 20) {
        this.grabLimit = grabLimit;
    }

    async scrapeTopWeeklyBlogs(link) {
        const href = link || BASE_WEEK_URL;
        Logger.info("!!! Scraping Dev.to Top Weekly Blogs !!!");

        try {
            const browser = await puppeteer.launch(/*{headless: false}*/);
            const page = await browser.newPage();
            await page.goto(href);
            await page.waitForSelector('#articles-list');

            const data = await page.evaluate(({ BASE_DEV_TO_URL, grabLimit }) => {
                let blogArray = [];
                let i = 0;

                // get substories
                const articlesNodeList = document.querySelectorAll('#substories > .single-article:not(.feed-cta)');
                for (i; i < articlesNodeList.length; i++) {
                    let articleNode = articlesNodeList[i];
                    let title = articleNode.querySelector('h3').innerText.trim();
                    let authorAndDate = articleNode.querySelector('h4 a').innerText.trim().split('・');
                    let link = articleNode.querySelector('a.index-article-link').getAttribute('href');
                    let tagsNodeList = [].map.call(articleNode.querySelectorAll('span.tag'), tag => {
                        return tag.innerText.trim();
                    });
                    let likes = Number(articleNode.querySelector('span.engagement-count-number').innerText.trim());
                    let profile_image = articleNode.querySelector('div.small-pic img').getAttribute('src');

                    blogArray[i] = {
                        id: (i + 1),
                        title,
                        author: authorAndDate[0].trim(),
                        date: authorAndDate[1].trim(),
                        link: BASE_DEV_TO_URL + link,
                        likes,
                        tags: tagsNodeList,
                        profile_image
                    }

                    if (i === (grabLimit - 1)) break;
                }

                return blogArray;
            }, { BASE_DEV_TO_URL, grabLimit: this.grabLimit });

            await browser.close();
            return data;
        } catch (err) {
            Logger.error('(~/services/scrapeDevTo.js) - Error');
            Logger.error(err);

            return null;
        }
    }
}
