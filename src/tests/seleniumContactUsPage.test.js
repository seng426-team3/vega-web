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

/*
    The selenium tests here are described as new user stories in the milestone 3 report.
    Feature: Visitor, Admin, Staff, and User must be able to submit forms in the contact us page
*/
describe('Visitor must be able to submit forms in the Contact-Us Page (user story 10 in RSD, issue #7)', () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    /* This user story covers the several next test cases to test user type difference:
    Scenario (US-2-29): Visitor, Admin, Staff, and User must be able to submit contact us form when all fields are populated properly
        Given I am any visitor or user on Vega Absolute
        And I am on the “Contact Us” page of Vega Absolute
        When I fill in all the fields in the form correctly in the right format
        And I click “Submit”
        Then My request is successfully submitted 
        And I receive an alert informing me that my request has been successfully sent     
    */
    it("should allow visitor to submit contact-us form when all fields are populated properly", async () => {
        // Given
        await driver.get(reactAppURL + "contactus");
        
        // When
        const name_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-name']");
        const email_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-email']");
        const message_input_textbox = await getElementByXpath(driver, "//textarea[@id='contactus-message']");
        const contactus_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        // And
        await email_input_textbox.sendKeys(email);
        await name_input_textbox.sendKeys(name);
        await message_input_textbox.sendKeys(message);

        await contactus_submit_btn.click();
        
        // Then
        const contact_sent_success_alert = await getElementByXpath(driver, "//div[@id='contactus-alert-success']");
        const contact_sent_success_alert_text = await contact_sent_success_alert.getText();
        expect(contact_sent_success_alert_text).toEqual("Successfully Submitted Message to Vega-Absolute\nYour message is being reviewed by our employees. We will reach out once we have an answer.\nClose");
    });

    it("should allow admin to submit contact-us form when all fields are populated properly", async () => {
        // Given
        await driver.get(reactAppURL + "login");
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "contactus");
        
        // When
        const name_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-name']");
        const email_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-email']");
        const message_input_textbox = await getElementByXpath(driver, "//textarea[@id='contactus-message']");
        const contactus_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        // And
        await email_input_textbox.sendKeys(email);
        await name_input_textbox.sendKeys(name);
        await message_input_textbox.sendKeys(message);

        await contactus_submit_btn.click();
        
        // Then
        const contact_sent_success_alert = await getElementByXpath(driver, "//div[@id='contactus-alert-success']");
        const contact_sent_success_alert_text = await contact_sent_success_alert.getText();
        expect(contact_sent_success_alert_text).toEqual("Successfully Submitted Message to Vega-Absolute\nYour message is being reviewed by our employees. We will reach out once we have an answer.\nClose");
    });

    it("should allow staff to submit contact-us form when all fields are populated properly", async () => {
        // Given
        await driver.get(reactAppURL + "login");
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
        
        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "contactus");
        
        // When
        const name_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-name']");
        const email_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-email']");
        const message_input_textbox = await getElementByXpath(driver, "//textarea[@id='contactus-message']");
        const contactus_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        // And
        await email_input_textbox.sendKeys(email);
        await name_input_textbox.sendKeys(name);
        await message_input_textbox.sendKeys(message);

        await contactus_submit_btn.click();
        
        // Then
        const contact_sent_success_alert = await getElementByXpath(driver, "//div[@id='contactus-alert-success']");
        const contact_sent_success_alert_text = await contact_sent_success_alert.getText();
        expect(contact_sent_success_alert_text).toEqual("Successfully Submitted Message to Vega-Absolute\nYour message is being reviewed by our employees. We will reach out once we have an answer.\nClose");
    });

    it("should allow user to submit contact-us form when all fields are populated properly", async () => {
        // Given
        await driver.get(reactAppURL + "login");
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
        
        await username_input_textbox.sendKeys('testuser2@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "contactus");
        
        // When
        const name_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-name']");
        const email_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-email']");
        const message_input_textbox = await getElementByXpath(driver, "//textarea[@id='contactus-message']");
        const contactus_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        // And
        await email_input_textbox.sendKeys(email);
        await name_input_textbox.sendKeys(name);
        await message_input_textbox.sendKeys(message);

        await contactus_submit_btn.click();
        
        // Then
        const contact_sent_success_alert = await getElementByXpath(driver, "//div[@id='contactus-alert-success']");
        const contact_sent_success_alert_text = await contact_sent_success_alert.getText();
        expect(contact_sent_success_alert_text).toEqual("Successfully Submitted Message to Vega-Absolute\nYour message is being reviewed by our employees. We will reach out once we have an answer.\nClose");
    });

    it("should not allow form submission if fields are not populated correctly", async () => {
        // Given
        await driver.get(reactAppURL + "contactus");
        
        // When
        const name_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-name']");
        const email_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-email']");
        const message_input_textbox = await getElementByXpath(driver, "//textarea[@id='contactus-message']");
        const contactus_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        // And (do not add name)
        await email_input_textbox.sendKeys(email);
        await message_input_textbox.sendKeys(message);

        await contactus_submit_btn.click();
        
        // Then (submit button must be present indicating form not submitted)
        expect(contactus_submit_btn).not.toBeNull();
    });

    it("should not allow form submission if invalid email address provided", async () => {
        // Given
        await driver.get(reactAppURL + "contactus");
        
        // When
        const name_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-name']");
        const email_input_textbox = await getElementByXpath(driver, "//input[@id='contactus-email']");
        const message_input_textbox = await getElementByXpath(driver, "//textarea[@id='contactus-message']");
        const contactus_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        // And
        await email_input_textbox.sendKeys("invalid");
        await name_input_textbox.sendKeys(name);
        await message_input_textbox.sendKeys(message);

        await contactus_submit_btn.click();
        
        // Then (expect error in email field)
        const invalid_email_error = await getElementByXpath(driver, "//div[@id='invalid-email']");
        const invalid_email_error_text = await invalid_email_error.getText();
        expect(invalid_email_error_text).toEqual("Please enter a valid email");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});