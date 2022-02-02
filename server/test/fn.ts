import {ActionTimeout, ActionType} from "./dataType";
import {By} from "selenium-webdriver";
import {PASSWORD} from "./env";
const {until} = require('selenium-webdriver')
export const util = require('util')
const fsp = require('fs').promises

export const action = async (driver: { wait: (arg0: any) => any; sleep: (arg0: number) => any; findElement: (arg0: any) => { (): any; new(): any; click: { (): any; new(): any; }; sendKeys: { (arg0: null): any; new(): any; }; }; }, target: any, type: ActionType, timeout: ActionTimeout, waitTarget = null, sendValue = null) => {
    if (timeout === ActionTimeout.wait && waitTarget) {
        await driver.wait(until.elementLocated(waitTarget));
    } else {
        await driver.sleep(+timeout)
    }
    if (type === ActionType.click) {
        await driver.findElement(target).click()
    } else if (type === ActionType.sendKeys) {
        await driver.findElement(target).sendKeys(sendValue)
    }
}


export async function takeScreenshot(driver: any, file: any){
    return driver.takeScreenshot()
        .then((image: any) => fsp.writeFile(file, image, 'base64'))
}
