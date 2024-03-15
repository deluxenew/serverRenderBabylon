var express = require('express');
var router = express.Router();
const puppeteer = require("puppeteer");
/* GET users listing. */
router.get('/', async function(req, res, next) {

    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    // page.setViewport({ width: 2048, height: 1024, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3000");
    await new Promise((r) => setTimeout(r, 4000))
    page.evaluate("document.getElementsByTagName('canvas')[0].style.zIndex=500");
    page.evaluate("document.getElementsByTagName('canvas')[0].style.width='2048'");
    // page.evaluate("document.getElementsByTagName('canvas')[0].style.height='900'");
    page.evaluate("document.getElementsByTagName('canvas')[0].style.position='absolute'");
    page.evaluate("BABYLON.Engine.LastCreatedScene.activeCamera.alpha = 1.4;");

    await new Promise((r) => setTimeout(r, 4000))
    let contents = await page.screenshot({ encoding: 'base64' });


    res.send(`${contents}`)
});

module.exports = router;
