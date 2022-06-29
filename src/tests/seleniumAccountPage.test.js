import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');
const {until} = require('selenium-webdriver');

let driver;

/*
    The selenium tests here are described as new user stories in the milestone 3 report.
    Feature: All admin, staff, and users must be able to view their account details when logged in
*/
describe("All admin, staff, and users must be able to view their account details when logged in", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();    
    })

    /*
    Scenario (US-2-13): User should be able to access the account page after logging in as admin
        Given I am a registered admin of Vega Absolute
        And I am on the “Login” page
        When I input my username/email address
        And I input my password
        And I click “Submit”
        Then I am logged in successfully if my credentials are correct.
        And I can view my account details in the Account page
    */
    it("should be able to access the account page after logging in as admin", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until account button is visible to know we are logged in.
        const account_link = await getElementByXpath(driver, "//a[@href='/account']");
        await account_link.click()

        // Then
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();
        await expect(logged_in_username_text).toEqual("admin@venus.com");
    });

    /*
    Scenario (US-2-14): User should be able to access the account page after logging in as staff
        Given I am a registered staff of Vega Absolute
        And I am on the “Login” page
        When I input my username/email address
        And I input my password
        And I click “Submit”
        Then I am logged in successfully if my credentials are correct.
        And I can view my account details in the Account page    
    */
    it("should be able to access the account page after logging in as staff", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until account button is visible to know we are logged in.
        const account_link = await getElementByXpath(driver, "//a[@href='/account']");
        await account_link.click()

        // Then
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();
        await expect(logged_in_username_text).toEqual("jonoliver@venus.com");
    });

    /*
    Scenario (US-2-15): User should be able to access the account page after logging in as user
        Given I am a registered user of Vega Absolute
        And I am on the “Login” page
        When I input my username/email address
        And I input my password
        And I click “Submit”
        Then I am logged in successfully if my credentials are correct.
        And I can view my account details in the Account page
    */
    it("should be able to access the account page after logging in as user", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('testuser2@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until account button is visible to know we are logged in.
        const account_link = await getElementByXpath(driver, "//a[@href='/account']");
        await account_link.click()

        // Then
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();
        await expect(logged_in_username_text).toEqual("testuser2@venus.com");
    });

    /*
    Scenario (US-2-16): Visitor should not be able to access the account page if not logged in.
        Given I am a visitor of Vega Absolute
        When I attempt to visit the account page on Vega Absolute
        Then I am unable to access the account page
        And I am shown an error alert message saying that I do not have permission to view this page.
    */
    it("should not be able to access the account page if not logged in", async () => {
        // Given & When
        await driver.get(reactAppURL + "account");

        // Then
        const alert_error = await getElementByXpath(driver, "//div[@id='alert-not-authorized-account-page']");
        const alert_error_text = await alert_error.getText();
        await expect(alert_error_text).toEqual("You do not have permission to view this page.Go to Home");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

