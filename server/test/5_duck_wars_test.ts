import {Options} from "selenium-webdriver/chrome";
import {ActionTimeout, ActionType} from "./dataType";
import {action, takeScreenshot} from "./fn";
import {BASE_WAVESDUCKS_URL, PASSWORD} from "./env";

require('dotenv').config();
const {Builder, By, until,} = require('selenium-webdriver')
const chai = require('chai');
const assert = chai.assert;

describe('Duck Wars', function () {

    // @ts-ignore
    this.timeout(300000)
    let driver: any
    let vars: any
    let getAllWindowHandles: any
    const password = process.env.PASSWORD
    const headless = process.env.HEADLESS
    const options = new Options()
    // if (headless === "1") {
    options.headless()
    // }
    before(async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build()
        vars = {}

        driver.get(BASE_WAVESDUCKS_URL + "login")
        await driver.manage().window().setRect({width: 1440, height: 900})
        await driver.executeScript("window.open('https://waves.exchange/sign-up/', '_blank');")
        getAllWindowHandles = await driver.getAllWindowHandles()
        await driver.sleep(ActionTimeout.normal)
    })


    it('Registration', async () => {
        await driver.switchTo().window(getAllWindowHandles[1])
        await driver.sleep(ActionTimeout.larges)
        await action(driver, By.css(".css-v28l6"), ActionType.click, ActionTimeout.larges)
        // @ts-ignore
        await action(driver, By.css(".css-roynbj .css-15q5r51:nth-child(1) .css-1o78ni4"), ActionType.sendKeys, ActionTimeout.larges, By.css(".css-roynbj .css-15q5r51:nth-child(1) .css-1o78ni4"), PASSWORD)
        // @ts-ignore
        await action(driver, By.css(".css-roynbj .css-15q5r51:nth-child(2) .css-1o78ni4"), ActionType.sendKeys, ActionTimeout.larges, By.css(".css-roynbj .css-15q5r51:nth-child(1) .css-1o78ni4"), PASSWORD)
        await action(driver, By.css(".css-g013ys"), ActionType.click, ActionTimeout.larges)
        await action(driver, By.css(".css-hw3m92"), ActionType.click, ActionTimeout.larges)
        await driver.wait(until.elementLocated(By.css(".css-13ngssx")));
        const address = await driver.findElement(By.css(".css-13ngssx")).getText()
        await action(driver, By.css(".css-9ctqy3"), ActionType.click, ActionTimeout.larges)
        await action(driver, By.css(".css-1s7zn1r"), ActionType.sendKeys, ActionTimeout.larges, null, address)
        await action(driver, By.css(".css-10j114y"), ActionType.click, ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
    })

    it('Authorization', async function () {
        await driver.switchTo().window(getAllWindowHandles[0])
        await driver.sleep(ActionTimeout.larges)
        await action(driver, By.css(".login-page__authorization_method_first_line"), ActionType.click, ActionTimeout.larges)
        await driver.switchTo().frame(2)
        // @ts-ignore
        await action(driver, By.css(".css-1wyiskf"), ActionType.sendKeys, ActionTimeout.larges, null, PASSWORD)
        await action(driver, By.css(".css-14ilpg8"), ActionType.click, ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
    })

    it('Go to page: Marketplace', async () => {
        await driver.navigate().to(BASE_WAVESDUCKS_URL + "marketplace")
        await driver.sleep(ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
    })

    it('Go to page: Play To Earn', async () => {
        await driver.sleep(ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
        await driver.findElement(By.linkText("Play To Earn")).click()
        await driver.sleep(ActionTimeout.normal)
        await takeScreenshot(driver, "15.png")
    })

    it('Start game', async () => {
        await driver.switchTo().frame(0)
        await driver.sleep(ActionTimeout.larges * 10)
        await takeScreenshot(driver, "16-0.png")
        // const bodyHtml = await driver.findElement(By.css("html")).getAttribute('innerHTML')
        // console.log("bodyHtml", bodyHtml)
        // @ts-ignore
        await action(driver, By.css(".css-1wyiskf"), ActionType.sendKeys, ActionTimeout.short, null, PASSWORD)
        await takeScreenshot(driver, "16-1.png")

        await action(driver, By.css(".css-14ilpg8"), ActionType.click, ActionTimeout.short)
        await takeScreenshot(driver, "16-2.png")

        await driver.sleep(ActionTimeout.larges * 3)
        await action(driver, By.css(".css-1wnx2ve"), ActionType.click, ActionTimeout.short)
        await takeScreenshot(driver, "16-3.png")
        await driver.sleep(ActionTimeout.larges * 3)
        await driver.switchTo().defaultContent()
        await takeScreenshot(driver, "16-4.png")
        await driver.sleep(ActionTimeout.larges * 3)
        await action(driver, By.css(".choose-collective-farm__farms__card > button"), ActionType.click, ActionTimeout.short)
        await takeScreenshot(driver, "16-5.png")
    })

    after(async () => driver.quit());

})