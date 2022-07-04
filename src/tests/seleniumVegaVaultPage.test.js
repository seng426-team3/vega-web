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
describe("Users must be able to fetch their secrets, use CRUD operations on them, and share them. Admins must be able to fetch all secrets", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    /*
    Scenario: Non-users should not have access to Vega Vault service
        Given I am not logged in
        When I click "Vega Vault" on the navigation bar
        Then I am redirected to a page that says to login to use the service
    */
    it("Users not logged in should be given an error on Vega Vault page", async() => {
        // Given
        // Not signed in

        // When
        await driver.get(reactAppURL + "vega-vault");

        // Then
        const login_button = await getElementByXpath(driver, "//*[@id=\"root\"]/div/div[1]/div[2]/view/button");
        const login_button_text = await login_button.getText();

        await expect(login_button_text).toEqual("Login / Create Account");
    });


    /*
    Scenario: User views all their uploaded secrets
        Given I am a logged in user
        When I click “Vega Vault” on the navigation bar from any page
        Then a list of all the secrets I uploaded should appear
    */
    it("User secrets should display when on Vega Vault page and refresh button is clicked", async() => {
        // Given
        await signIn("testuser2@venus.com");

        // When
        await driver.get(reactAppURL + "vega-vault");

        // Then
        const refresh_button = await getElementByXpath(driver, "//*[@id=\"button-box\"]/button[5]");
        await refresh_button.click();

        const secret_entry = await getElementByXpath(driver, "//*[@id=\"root\"]/div/div[1]/div[2]/div[2]/div/div/div/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[1]");
        const secret_name = await secret_entry.getText();

        await expect(secret_name).toEqual("Super Secret");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

async function signIn(username) {
    await driver.get(reactAppURL + "login");

    const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
    const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
    const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");;
    
    await username_input_textbox.sendKeys(username);
    await password_input_textbox.sendKeys('pass');
    await login_form_submit_btn.click();
}