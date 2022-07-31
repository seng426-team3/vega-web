import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath
} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

// Use the same email across tests
const crypto = require('crypto');
const buf = crypto.randomBytes(1)
const email = 'tester' + buf[0] +  '@venus.com';

/*
    The selenium tests here are described as new user stories in the milestone 3 report.
    Feature: Visitor must be able to sign up for an account from the login page and have it show up in the admin page
*/
describe("Visitor must be able to sign up for an account from the login page and have it show up in the admin page (user story 14 in RSD)", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    /*
    Scenario (US-2-30) (User story 2 from RSD): User should sign up for an account when all form fields are filled in
        Given I am a user
        And I am on the “Login/Signup” page
        When I click the “Sign Up” button
        And I fill in the form details
        And I click submit
        Then a confirmation message appears stating that the account is now under
        review
        And the new account appears under the Admin page awaiting activation
    */
    it("should allow user to create new account when all form fields filled in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const signup_page_button = await getElementByXpath(driver, "//a[@href='/signup']");
        await signup_page_button.click();
        
        // Wait until create an account header visible to know we are on sign up page
        let create_an_account_page = await getElementByXpath(driver, "//h2[text()='Create an account']");

        const email_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-email']");;
        const first_name_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-first-name']");
        const last_name_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-last-name']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-password']");
        const sign_up_form_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");
        
        await email_input_textbox.sendKeys(email);
        await first_name_input_textbox.sendKeys('Test');
        await last_name_input_textbox.sendKeys('Testing');
        await password_input_textbox.sendKeys('pass');
        await sign_up_form_submit_btn.click();
        
        const account_created_alert = await getElementByXpath(driver, "//div[@id='sign-up-alert-success']");
        const account_created_alert_text = await account_created_alert.getText();
        
        // Then
        await expect(account_created_alert_text).not.toBeNull();
        await expect(account_created_alert_text).toEqual('You\'ve successfully registered for an account\nIt is currently under review. Please check back later to see if it is approved.');
    });

    /*
    Scenario (US-2-43): A user tries to log in with unactivated account
        Given I am a user with an unactivated account
        And I am on the “Login/Signup” page
        When I input my username/email address
        And I input my password
        And I click submit
        Then a message appears stating that the account is still under review
    */
    it("should show warning and fail when invalid user tries to login", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys(email);
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Then
        const failed_login_alert = await getElementByXpath(driver, "//div[@id='invalid-user-alert']");
        await expect(failed_login_alert).not.toBeNull();
    });

    /*
    Scenario (US-2-31) (User story 3 from RSD): Admin activates new user account
        Given I am an admin
        And I am logged into my account
        And I am on the “Admin” page
        When I select a new user waiting for activation
        And I select the role “User”
        And I click “Enable this User”
        Then a confirmation message appears stating the user was activated
        And the user’s account now has access to services
    */
    it("should allow admin to access the admin page and activate the new user", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until admin panel button is visible so we know we are logged in.
        const admin_link = await getElementByXpath(driver, "//a[@href='/adminpanel']");
        await admin_link.click();

        
        const admin_panel_table = await getElementByXpath(driver, "//table[@id='admin-panel-table']");
        await expect(admin_panel_table).not.toBeNull();

        
        const new_user_email = await getElementByXpath(driver, "//td[@id='"+email+"-username']");
        const new_user_email_text = await new_user_email.getText();

        // Then
        await expect(new_user_email_text).not.toBeNull();
        await expect(new_user_email_text).toEqual(email);

        const new_user_enable_button = await getElementByXpath(driver, "//td[@id='"+email+"-enable']");
        await new_user_enable_button.click()

        const new_user_enabled_alert = await getElementByXpath(driver, "//div[@id='enabled-user-alert']");
        await expect(new_user_enabled_alert).not.toBeNull();
    });

    /*
    Scenario (US-2-32): Newly enabled user must be able to log in
        Given I am a registered user
        And I have just been enabled by the admin
        When I go to “Login” page
        And I input my username/email address
        And I input my password
        And I click “Submit”
        Then I am logged in successfully if my credentials are correct
    */
    it("should login new enabled user when username and password are correct", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys(email);
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        const signout_button = await getElementByXpath(driver, "//button[text()='signout']");
        
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();

        // Then
        await expect(logged_in_username_text).toEqual(email);
    });

    /*
    Scenario (US-2-33): User should not be able to create the same account twice
        Given I am a registered user (may or may not be enabled)
        And I already have an account
        When I click the “Sign Up” button
        And I fill in the form details
        And I click submit
        Then a confirmation message appears stating that an error occurred while creating the application
        And no new accounts are created 
     */
    it("should not allow user to create the same account twice", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const signup_page_button = await getElementByXpath(driver, "//a[@href='/signup']");
        await signup_page_button.click();
        
        // Wait until create an account header visible to know we are on sign up page
        const create_an_account_page = await getElementByXpath(driver, "//h2[text()='Create an account']");

        const email_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-email']");;
        const first_name_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-first-name']");
        const last_name_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-last-name']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-password']");
        const sign_up_form_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        await email_input_textbox.sendKeys(email);
        await first_name_input_textbox.sendKeys('TestAgain');
        await last_name_input_textbox.sendKeys('TestingAgain');
        await password_input_textbox.sendKeys('pass');
        await sign_up_form_submit_btn.click();
        
        const account_created_alert = await getElementByXpath(driver, "//div[@id='sign-up-alert-failure']");
        const account_created_alert_text = await account_created_alert.getText();

        // Then
        await expect(account_created_alert_text).not.toBeNull();
        await expect(account_created_alert_text).toEqual('Something went wrong\nWe ran into an error when trying to register your account. Please try again later.');
    
    });

    /*
    Scenario (US-2-34): User should not be able to create the same account with missing fields
        Given I am a user
        And I am on the “Login/Signup” page
        When I click the “Sign Up” button
        And I fill in the form details but with some missing fields
        And I click submit
        Then an error message shows up indicating the missing information required
        And no new accounts are created    
    */
    it("should not allow user to create account with missing fields", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const signup_page_button = await getElementByXpath(driver, "//a[@href='/signup']");
        await signup_page_button.click();
        
        // Wait until create an account header visible to know we are on sign up page
        const create_an_account_page = getElementByXpath(driver, "//h2[text()='Create an account']");

        const email_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-email']");;
        const first_name_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-first-name']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='validation-sign-up-password']");
        const sign_up_form_submit_btn = await getElementByXpath(driver, "//button[text()='Submit']");

        await email_input_textbox.sendKeys("missingfields@venus.com");
        await first_name_input_textbox.sendKeys('MissingName');
        await password_input_textbox.sendKeys('pass');
        await sign_up_form_submit_btn.click();
        
        const missing_field_alert = await getElementByXpath(driver, "//div[@id='invalid-last-name']");
        const missing_field_alert_text = await missing_field_alert.getText();

        // Then
        await expect(missing_field_alert_text).not.toBeNull();
        await expect(missing_field_alert_text).toEqual('Please enter last name');
    
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

