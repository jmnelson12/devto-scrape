const puppeteer = require('puppeteer');
const Logger = require('../loaders/logger');
const { Container } = require('typedi');
const BASE_WEEK_URL = 'https://dev.to/top/week';

module.exports = class DevToScrape {
    constructor() { }

    async scrapeTopWeeklyBlogs(link) {
        Logger.info('>> Running Scrape for Devto Weekly Blogs!!');
        const href = link || BASE_WEEK_URL;

        try {
            const blogModel = Container.get('blogModel');
            const browser = await puppeteer.launch(/*{headless: false}*/);
            const page = await browser.newPage();
            await page.goto(href);

            const dimensions = await page.evaluate(() => {
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight,
                    deviceScaleFactor: window.devicePixelRatio
                };
            });

            console.log('Dimensions:', dimensions);

            await browser.close();
        } catch (err) {
            Logger.error('(~/services/scrapeDevTo.js) - Error');
            Logger.error(err);
        }
    }
}
