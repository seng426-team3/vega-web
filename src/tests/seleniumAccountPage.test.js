import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');
const {until} = require('selenium-webdriver');

let driver;

describe("User must be able to view their account details", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();    
    })

    it("should be able to access the account page after logging in", async () => {
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

