export const webdriver = require("selenium-webdriver");
import { until, By } from "selenium-webdriver";
export const driverBrowser = "firefox";
export const reactAppURL = "http://127.0.0.1:3000/";

export const getElementById = async (driver, id, timeout = 10000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
  
export const getElementByName = async (driver, name, timeout = 10000) => {
    const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
  };
  
export const getElementByXpath = async (driver, xpath, timeout = 10000) => {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

export const screen = {
    width: 1920,
    height: 1080
};

// Set timeout to 30 seconds to account for startup
jest.setTimeout(30000);

// Use URL below to test production vega web
//export const reactAppURL = "https://seng426-team3-vega-web-frontend.azurewebsites.net/";