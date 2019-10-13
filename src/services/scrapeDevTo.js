const puppeteer = require('puppeteer');
const Logger = require('../loaders/logger');
const BASE_DEV_TO_URL = 'https://dev.to';
const BASE_WEEK_URL = `${BASE_DEV_TO_URL}/top/week`;
const grabLimit = 20;

module.exports = class DevToScrape {
    constructor() { }

    async scrapeTopWeeklyBlogs(link) {
        const href = link || BASE_WEEK_URL;

        try {
            const browser = await puppeteer.launch(/*{headless: false}*/);
            const page = await browser.newPage();
            await page.goto(href);
            await page.waitForSelector('#articles-list');

            const data = await page.evaluate(({ BASE_DEV_TO_URL, grabLimit }) => {
                let blogArray = [];
                // TODO: Get Main Story - need to subtract substring grab limit to accomidate the additional main story

                // get substories
                const baseSubstoryArticleQuery = '#substories .single-article';
                const titleNodeList = document.querySelectorAll(`${baseSubstoryArticleQuery} h3`);
                const authorAndDateNodeList = document.querySelectorAll(`${baseSubstoryArticleQuery} h4 a`);
                const linkNodeList = document.querySelectorAll(`${baseSubstoryArticleQuery} > a.index-article-link`);
                const likesNodeList = document.querySelectorAll(`${baseSubstoryArticleQuery} span.engagement-count-number`);
                const tagsNodeList = document.querySelectorAll(`${baseSubstoryArticleQuery} div.tags`);
                const imageNodeList = document.querySelectorAll(`${baseSubstoryArticleQuery} div.small-pic img`);

                for (let i = 1; i <= grabLimit; i++) {
                    let authorAndDate = authorAndDateNodeList[i].innerText.trim().split('・');
                    let individualTagsList = [].map.call(tagsNodeList[i].querySelectorAll('.tag'), tag => {
                        return tag.innerText.trim();
                    });

                    blogArray[i] = {
                        id: i,
                        title: titleNodeList[i].innerText.trim() || "title not found",
                        author: authorAndDate[0].trim() || "author not found",
                        date: authorAndDate[1].trim() || "date not found",
                        link: BASE_DEV_TO_URL + linkNodeList[i].getAttribute('href') || "link not found",
                        likes: likesNodeList[i].innerText.trim() || 0,
                        tags: individualTagsList,
                        profile_image: BASE_DEV_TO_URL + imageNodeList[i].getAttribute('src') || ""
                    };
                }

                return blogArray;
            }, { BASE_DEV_TO_URL, grabLimit });

            await browser.close();

            return data;
        } catch (err) {
            Logger.error('(~/services/scrapeDevTo.js) - Error');
            Logger.error(err);

            return null;
        }
    }
}
