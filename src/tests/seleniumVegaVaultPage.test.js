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

        /*
    Scenario: Admin views all secrets
        Given I am an admin
        When I click “Manage Secrets”
        Then a list of all secrets from all users is displayed with options to manage them
    */
    it("Admin should be able to fetch all secrets", async() => {
        // Given
        await signIn("admin@venus.com");

        // When
        await driver.get(reactAppURL + "vega-vault");

        // Then
        // TO-DO write creation test
    });

    /*
    Scenario: User successfully creates a new secret
        Given I am a logged in user
        And I am on the “Manage Secrets” page
        And I have selected a file I wish to upload as a secret
        When I click upload
        Then a confirmation message should appear that the file was uploaded as a secret
        And the new secret should be added to my list of secrets
    */
    it("User should be able to create a secret and have it appear in their secret list", async() => {
        // Given
        await signIn("testuser2@venus.com");

        // When
        await driver.get(reactAppURL + "vega-vault");

        // Then
        // TO-DO write creation test
    });

    /*
    Scenario: User reads a secret
        Given I am a logged in user
        And I am on the “Manage Secrets” page
        And I have selected a secret I wish to read
        When I click “Read”
        Then the secret’s data is shown to me
    */
        it("User should be able to read a secret from their secret list", async() => {
            // Given
            await signIn("testuser2@venus.com");
    
            // When
            await driver.get(reactAppURL + "vega-vault");
    
            // Then
            // TO-DO write reading test
        });

    /*
    Scenario: User updates a secret
        Given I am a logged in user 
        And I am on the “Manage Secrets” page
        And I have selected a secret I wish to update
        When I fill in info I wish to update
        And click “Update”
        Then the secret I selected is updated with the info I filled in
        And a confirmation message will display confirming it was successfully updated
    */
    it("User should be able to update a secret from their secret list", async() => {
        // Given
        await signIn("testuser2@venus.com");

        // When
        await driver.get(reactAppURL + "vega-vault");

        // Then
        // TO-DO write updating test
    });

    /* 
    Scenario: User deletes a secret
	    Given I am a logged in user 
        And I am on the “Manage Secrets” page
        And I have selected a secret I wish to delete
        When I click “Delete”
        And confirm I wish to delete it
        Then the secret I selected is deleted
        And a confirmation message will display that it was deleted
    */
    it("User should be able to delete a secret from their secret list", async() => {
        // Given
        await signIn("testuser2@venus.com");

        // When
        await driver.get(reactAppURL + "vega-vault");

        // Then
        // TO-DO write deletion test
    });

    /* 
    Scenario: User shares secret with another user
        Given I am a logged in user
        And I am on the “Manage Secrets” page
        And I have selected a secret I wish to share
        When I select a user to share it with
        And click “Share”
        Then the secret is sent to the user I selected
        And a confirmation message is displayed to show it was sent
    */
    it("User should be able to share a secret from their secret list with another user", async() => {
        // Given
        await signIn("testuser2@venus.com");

        // When
        await driver.get(reactAppURL + "vega-vault");

        // Then
        // TO-DO write sharing test
    });

    /*
    Scenario: User filters secrets by date
        Given I am a logged in user 
        And I am on the “Manage Secrets” page
        When I click “Filter By Date”
        And enter a date from/date to entry
        Then my list of secrets will update to only display secrets between those dates
    */
        it("User should be able to share a secret from their secret list with another user", async() => {
            // Given
            await signIn("testuser2@venus.com");
    
            // When
            await driver.get(reactAppURL + "vega-vault");
    
            // Then
            // TO-DO write filtering test
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