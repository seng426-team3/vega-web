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
    Feature: Admin user must be able to perform administrator tasks in Vega Absolute’s Admin panel
*/
describe("Admin must be able to perform administrator tasks", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();    
    })

    /*
    Scenario (US-2-17): Admin should be able to access the admin page after logging in.
        Given I am a registered admin of Vega Absolute
        And I am on the “Login” page
        And I input my username/email address
        And I input my password
        And I click “Submit”
        And I am logged in successfully if my credentials are correct
        And Navigate to the “Admin” page of Vega Absolute
        Then I can view the list of users in the admin panel on the “Admin” page
    */
    it("should be able to access the admin page after logging in", async () => {
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

        // Then
        const admin_panel_table = await getElementByXpath(driver, "//table[@id='admin-panel-table']");
        await expect(admin_panel_table).not.toBeNull();
    });

    /*
    Scenario (US-2-18): Staff should not be able to access the admin page after logging in
        Given I am a registered staff of Vega Absolute
        And I am on the “Login” page
        And I input my username/email address
        And I input my password
        And I click “Submit”
        And I am logged in successfully if my credentials are correct
        And Navigate to the “Admin” page of Vega Absolute by typing in the URL
        Then I am unable to access the account page
        And  I am shown an error alert message saying that I do not have permission to view this page.
    */
    it("staff should not be able to access the admin page after logging in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Try to access admin page
        await driver.get(reactAppURL + "adminpanel");
        
        // Then
        const not_found_alert = await getElementByXpath(driver, "//div[@id='alert-not-authorized-admin-page']");
        const not_found_alert_text = await not_found_alert.getText();
        await expect(not_found_alert_text).toEqual("You do not have permission to view this page.Go to Home");
    });

    /*
    Scenario (US-2-19): Visitors not logged in should not be able to access the admin page
        Given I am a visitor of Vega Absolute
        When I attempt to visit the admin page on Vega Absolute
        Then I am unable to access the account page
        And I am shown an error alert message saying that I do not have permission to view this page.
    */
    it("should not be able to access the admin page when not logged in", async () => {
        // Given & When
        await driver.get(reactAppURL + "adminpanel");

        // Then
        const alert_error = await getElementByXpath(driver, "//div[@id='alert-not-authorized-admin-page']");
        const alert_error_text = await alert_error.getText();
        await expect(alert_error_text).toEqual("You do not have permission to view this page.Go to Home");
    });

    /*
    Scenario (US-2-20): Admin should not be able to change their own role.
        Given I am a registered admin of Vega Absolute
        And I am logged in successfully
        And I am on the “Admin” page
        When I select my own user and select the option to change my role
        Then an alert shows up indicating that I cannot change my own role
        And my role stays as admin in Vega Absolute
    */
    it("should not let admin be able to change their own role", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "adminpanel");

        let admin_panel_table = await getElementByXpath(driver, "//table[@id='admin-panel-table']");

        // Wait until change role button visible for admin user
        let change_role_select = await getElementByXpath(driver, "//select[@id='admin@venus.com-roles-form-select']");
        await change_role_select.sendKeys("STAFF");

        // Then
        const alert_error = await getElementByXpath(driver, "//div[@id='unauthorized-role-change-alert']");
        const alert_error_text = await alert_error.getText();
        await expect(alert_error_text).toEqual("Error: cannot change your own role.\nClose");
    });

    /*
    Scenario (US-2-21): Admin should not be able to disable themselves.
        Given I am a registered admin of Vega Absolute
        And I am logged in successfully
        And I am on the “Admin” page
        When I select my own user and select the option to disable the user
        Then an alert shows up indicating that I cannot disable myself
        And my account stays active in Vega Absolute   
    */
    it("should not let logged in admin be able to disable themselves", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "adminpanel");

        let admin_panel_table = await getElementByXpath(driver, "//table[@id='admin-panel-table']");

        // Wait until disable button visible
        let disable_button = await getElementByXpath(driver, "//a[@id='admin@venus.com-disable-button']");
        await disable_button.click();

        // Then
        const alert_error = await getElementByXpath(driver, "//div[@id='unauthorized-disable-alert']");
        const alert_error_text = await alert_error.getText();
        await expect(alert_error_text).toEqual("Error: you cannot disable yourself from the application.\nClose");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

