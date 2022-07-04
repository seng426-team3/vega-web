import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

/*
    The selenium tests here are described as new user stories in the milestone 3 report.
    Feature: Admin, staff, and users must be able to login and logout of Vega Absolute
*/
describe("Admin, staff, and users must be able to login and logout of Vega Absolute", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    /*
    Scenario (US-2-22): Admin should login when username and password are correct
        Given I am a registered admin of Vega Absolute
        And I am on the “Login” page
        When I input my username/email address
        And I input my password
        And I click “Submit”
        Then I am logged in successfully if my credentials are correct
    */
    it("should login when admin username and password are correct", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Then
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();
        await expect(logged_in_username_text).toEqual("admin@venus.com");
    });

    /*
    Scenario (US-2-23): Staff should login when username and password are correct
        Given I am a registered staff of Vega Absolute
        And I am on the “Login” page
        When I input my username/email address
        And I input my password
        And I click “Submit”
        Then I am logged in successfully if my credentials are correct   
    */
    it("should login when staff username and password are correct", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
        
        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Then
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();
        await expect(logged_in_username_text).toEqual("jonoliver@venus.com");
    });

    /*
    Scenario (US-2-24): Usershould login when username and password are correct
        Given I am a registered user of Vega Absolute
        And I am on the “Login” page
        When I input my username/email address
        And I input my password
        And I click “Submit”
        Then I am logged in successfully if my credentials are correct
    */
    it("should login when user username and password are correct", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
        
        await username_input_textbox.sendKeys('testuser2@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Then
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();
        await expect(logged_in_username_text).toEqual("testuser2@venus.com");
    });

    /*
    Scenario (US-2-25): Admin should logout successfully after being logged in
        Given I am a registered admin of Vega Absolute
        And I am logged in successfully
        When I go to the “Account” page of Vega Absolute
        And I click “signout”
        Then I am logged out successfully
        And I am presented with the option to sign in again.   
    */
    it("should logout admin properly after being logged in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        const signout_button = await getElementByXpath(driver, "//button[text()='signout']");
        await signout_button.click();

        // Then
        const login_signup_navbar_element = await getElementByXpath(driver, "//a[@href='/login']");
        const login_signup_navbar_element_text = await login_signup_navbar_element.getText();
        await expect(login_signup_navbar_element_text).toEqual('Login/SignUp');
    });

    /*
    Scenario (US-2-26): Staff should logout successfully after being logged in
        Given I am a registered staff of Vega Absolute
        And I am logged in successfully
        When I go to the “Account” page of Vega Absolute
        And I click “signout”
        Then I am logged out successfully
        And I am presented with the option to sign in again.    
    */
    it("should logout staff properly after being logged in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        const signout_button = await getElementByXpath(driver, "//button[text()='signout']");
        await signout_button.click();

        // Then
        const login_signup_navbar_element = await getElementByXpath(driver, "//a[@href='/login']");
        const login_signup_navbar_element_text = await login_signup_navbar_element.getText();
        await expect(login_signup_navbar_element_text).toEqual('Login/SignUp');
    });

    /*
    Scenario (US-2-27): User should logout successfully after being logged in
        Given I am a registered user of Vega Absolute
        And I am logged in successfully
        When I go to the “Account” page of Vega Absolute
        And I click “signout”
        Then I am logged out successfully
    */
    it("should logout user properly after being logged in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('testuser2@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        const signout_button = await getElementByXpath(driver, "//button[text()='signout']");
        await signout_button.click();

        // Then
        const login_signup_navbar_element = await getElementByXpath(driver, "//a[@href='/login']");
        const login_signup_navbar_element_text = await login_signup_navbar_element.getText();
        await expect(login_signup_navbar_element_text).toEqual('Login/SignUp');
    });

    /*
    Scenario (US-2-28): Users should not be logged with invalid credentials
        Given I am a registered admin of Vega Absolute
        And I am on the “Login” page
        When I input my correct username/email address
        And I input an invalid password
        And I click “Submit”
        Then I am presented with an error indicate my login attempt was unsuccessful
        And I am not logged in to my account
    */
    it("should fail when invalid credentials are input", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('invalidpass902nd23');
        await login_form_submit_btn.click();

        // Then
        const failed_login_alert = await getElementByXpath(driver, "//div[@role='alert']");
        await expect(failed_login_alert).not.toBeNull();
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});