import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

/*
    Selenium tests for Vega Vault
*/
describe("Users should be able to fetch their secrets, use CRUD operations on them, and share them. Admins should be able to fetch all secrets", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});