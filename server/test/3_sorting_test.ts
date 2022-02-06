import {Options} from "selenium-webdriver/chrome";
import {ActionTimeout, ActionType} from "./dataType";
import {action, takeScreenshot} from "./fn";
import {BASE_WAVESDUCKS_URL, PASSWORD} from "./env";

require('dotenv').config();
const {Builder, By, until,} = require('selenium-webdriver')
const chai = require('chai');
const assert = chai.assert;

describe('Sort by price', function () {

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
        await takeScreenshot(driver, "9.png")
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
        await takeScreenshot(driver, "10.png")
        await driver.navigate().to(BASE_WAVESDUCKS_URL + "marketplace")
        await driver.sleep(ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
        await takeScreenshot(driver, "8.png")
    })

    it('Sort by price', async () => {
        await driver.sleep(ActionTimeout.larges)
        await action(driver, By.css(".filters__sort-by .btn-secondary"), ActionType.click, ActionTimeout.short)
        await driver.sleep(ActionTimeout.larges)
        await action(driver, By.css(".filters__sort-by .animated .dropdown-item:nth-child(3)"), ActionType.click, ActionTimeout.larges)
        await driver.sleep(ActionTimeout.larges)
        const bodyDetailsEls = await driver.findElements(By.css(".duck-item__body-details"));
        await driver.sleep(ActionTimeout.larges)
        let last = null
        for (let i = 0; i < bodyDetailsEls.length; i++) {
            let isEGG = await driver.executeScript(`return document.querySelectorAll(".duck-item__body-details")[${i}].innerText.split("\\n")[1].split(" ")[3]\n`) === "EGG"
            let res = parseFloat(await driver.executeScript(`return document.querySelectorAll(".duck-item__body-details")[${i}].innerText.split("\\n")[1].split(" ")[2]\n`))
            if (isEGG) {
                if (last && res) {
                    assert.equal(res <= last, true)
                }
                last = res
            }
        }
        await takeScreenshot(driver, "11.png")

    })

    after(async () => driver.quit());

})