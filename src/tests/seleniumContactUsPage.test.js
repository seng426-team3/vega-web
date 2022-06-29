import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath
} from "./seleniumConfig";
import { until } from "selenium-webdriver";
const firefox = require('selenium-webdriver/firefox');

let driver;

// Use the same email across tests
const email = 'tester'+ Math.random()+  '@venus.com';
const name = 'Test User';
const message = 'Testing Contact-Us Submission';

describe('User must be able to submit forms in the Contact-Us Page (user story 10 in RSD, issue #7)', () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });


    it("should allow user to submit contact-us form when all fields are populated properly", async () => {
        // Given
        await driver.get(reactAppURL + "contactus");
        
        // When
        const name_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='contactus-name']"));
        const email_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='contactus-email']"));
        const message_input_textbox = await driver.findElement(webdriver.By.xpath("//textarea[@id='contactus-message']"));
        const contactus_submit_btn = await driver.findElement(webdriver.By.xpath("//button[text()='Submit']"));

        // And
        await email_input_textbox.sendKeys(email);
        await name_input_textbox.sendKeys(name);
        await message_input_textbox.sendKeys(message);

        await contactus_submit_btn.click();
        
        // Then
        const account_created_alert_text = await driver.findElement(webdriver.By.xpath("//div[@id='contactus-alert-success']")).getText();
        
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});