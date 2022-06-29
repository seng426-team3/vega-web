import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

describe("Admin must be able to perform administrator tasks", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();    
    })

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

    it("should not be able to access the admin page when not logged in", async () => {
        // Given & When
        await driver.get(reactAppURL + "adminpanel");

        // Then
        const alert_error = await getElementByXpath(driver, "//div[@id='alert-not-authorized-admin-page']");
        const alert_error_text = await alert_error.getText();
        await expect(alert_error_text).toEqual("You do not have permission to view this page.Go to Home");
    });

    it("should not let logged in user be able to change their own role", async () => {
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

    it("should not let logged in user be able to disable themselves", async () => {
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

