import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen
} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

// Use the same email across tests
const email = 'tester'+ Math.random()+  '@venus.com';

beforeEach(() => {
    driver = new webdriver.Builder().forBrowser(driverBrowser)
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
    .build();
});

describe("User must be able to sign up for an account from the login page and it show up in the admin page (user story 14 in RSD)", () => {
    it("should allow user to create new account when all fields the form are filled in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const signup_page_button = await driver.findElement(webdriver.By.xpath("//a[@href='/signup']"))

        await signup_page_button.click();
        
        // Wait until create an account header visible to know we are on sign up page
        let create_an_account_page = driver.findElement(webdriver.By.xpath("//h2[text()='Create an account']"));
        await driver.wait(until.elementIsVisible(create_an_account_page), 15000);

        const email_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-email']"));
        const first_name_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-first-name']"));
        const last_name_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-last-name']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-password']"));
        const sign_up_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[text()='Submit']"));
        
        await email_input_textbox.sendKeys(email);
        await first_name_input_textbox.sendKeys('Test');
        await last_name_input_textbox.sendKeys('Testing');
        await password_input_textbox.sendKeys('pass');

        await sign_up_form_submit_btn.click();
        
        const account_created_alert_text = await driver.findElement(webdriver.By.xpath("//div[@id='sign-up-alert-success']")).getText();

        // Then
        await expect(account_created_alert_text).not.toBeNull();
        await expect(account_created_alert_text).toEqual('You\'ve successfully registered for an account\nIt is currently under review. Please check back later to see if it is approved.');
    });

    it("should allow admin to access the admin page and activate the new user", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until admin panel button is visible so we know we are logged in.
        let admin_link = await driver.findElement(webdriver.By.xpath("//a[@href='/adminpanel']"));
        await driver.wait(until.elementIsVisible(admin_link), 15000);
        await admin_link.click();

        // Then
        const admin_panel_table = await driver.findElement(webdriver.By.xpath("//table[@id='admin-panel-table']"));
        await driver.wait(until.elementIsVisible(admin_panel_table), 15000);
        await expect(admin_panel_table).not.toBeNull();

        const new_user_email_xpath = webdriver.By.xpath("//td[@id='"+email+"-username']");
        await driver.wait(until.elementLocated(new_user_email_xpath), 15000);
        const new_user_email = await driver.findElement(new_user_email_xpath).getText();

        await expect(new_user_email).not.toBeNull();
        await expect(new_user_email).toEqual(email);

        const new_user_enable_button = await driver.findElement(webdriver.By.xpath("//td[@id='"+email+"-enable']"));
        await new_user_enable_button.click()

        const new_user_enabled_alert = await driver.findElement(webdriver.By.xpath("//div[@id='enabled-user-alert']"));
        await expect(new_user_enabled_alert).not.toBeNull();
    });

    it("should login new enabled user when username and password are correct", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));
        
        await username_input_textbox.sendKeys(email);
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        let signout_button = driver.findElement(webdriver.By.xpath("//button[text()='signout']"));
        await driver.wait(until.elementIsVisible(signout_button), 15000);
        
        const logged_in_username = await driver.findElement(webdriver.By.xpath("//p[@id='username-text']")).getText();

        // Then
        await expect(logged_in_username).toEqual(email);
    });

    it("should not allow user to create the same account twice", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const signup_page_button = await driver.findElement(webdriver.By.xpath("//a[@href='/signup']"))

        await signup_page_button.click();
        
        // Wait until create an account header visible to know we are on sign up page
        let create_an_account_page = driver.findElement(webdriver.By.xpath("//h2[text()='Create an account']"));
        await driver.wait(until.elementIsVisible(create_an_account_page), 15000);

        const email_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-email']"));
        const first_name_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-first-name']"));
        const last_name_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-last-name']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-password']"));
        const sign_up_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[text()='Submit']"));

        await email_input_textbox.sendKeys(email);
        await first_name_input_textbox.sendKeys('TestAgain');
        await last_name_input_textbox.sendKeys('TestingAgain');
        await password_input_textbox.sendKeys('pass');
        await sign_up_form_submit_btn.click();
        
        let account_created_alert_text = await driver.findElement(webdriver.By.xpath("//div[@id='sign-up-alert-failure']")).getText();

        // Then
        await expect(account_created_alert_text).not.toBeNull();
        await expect(account_created_alert_text).toEqual('Something went wrong\nWe ran into an error when trying to register your account. Please try again later.');
    
    });

    it("should not allow user to create account with missing fields", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const signup_page_button = await driver.findElement(webdriver.By.xpath("//a[@href='/signup']"))

        await signup_page_button.click();
        
        // Wait until create an account header visible to know we are on sign up page
        let create_an_account_page = driver.findElement(webdriver.By.xpath("//h2[text()='Create an account']"));
        await driver.wait(until.elementIsVisible(create_an_account_page), 15000);

        const email_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-email']"));
        const first_name_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-first-name']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='validation-sign-up-password']"));
        const sign_up_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[text()='Submit']"));

        await email_input_textbox.sendKeys("missingfields@venus.com");
        await first_name_input_textbox.sendKeys('MissingName');
        await password_input_textbox.sendKeys('pass');
        await sign_up_form_submit_btn.click();
        
        let missing_field_alert_text = await driver.findElement(webdriver.By.xpath("//div[@id='invalid-last-name']")).getText();

        // Then
        await expect(missing_field_alert_text).not.toBeNull();
        await expect(missing_field_alert_text).toEqual('Please enter last name');
    
    });
});

afterEach(async () => {
    await driver.quit();
}, 15000);