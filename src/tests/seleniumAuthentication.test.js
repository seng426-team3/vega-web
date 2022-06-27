import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

describe("User must be able to login into their account if one exists (user story 8 in RSD)", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

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

        // Wait until signout button visible to know we are logged in
        const signout_button = await getElementByXpath(driver, "//button[text()='signout']");
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();

        // Then
        await expect(logged_in_username_text).toEqual("admin@venus.com");
    });

    it("should login when staff username and password are correct", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
        
        await username_input_textbox.sendKeys('angelinacosta@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        const signout_button = await getElementByXpath(driver, "//button[text()='signout']");
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();

        // Then
        await expect(logged_in_username_text).toEqual("angelinacosta@venus.com");
    });

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

        // Wait until signout button visible to know we are logged in
        const signout_button = await getElementByXpath(driver, "//button[text()='signout']");
        const logged_in_username = await getElementByXpath(driver, "//p[@id='username-text']");
        const logged_in_username_text = await logged_in_username.getText();

        // Then
        await expect(logged_in_username_text).toEqual("testuser2@venus.com");
    });

    it("should logout properly after being logged in", async () => {
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

    it("should fail when invalid credentials are input", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('invalid298223987@venuc.com');
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