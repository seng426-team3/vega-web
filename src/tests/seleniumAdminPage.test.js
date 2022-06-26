import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

beforeEach(() => {
    driver = new webdriver.Builder().forBrowser(driverBrowser)
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
    .build();    
})

describe("Admin must be able to perform administrator tasks", () => {
    it("should be able to access the admin page after logging in", async () => {
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
        await expect(admin_panel_table).not.toBeNull();
    });

    it("should not be able to access the admin page when not logged in", async () => {
        // Given & When
        await driver.get(reactAppURL + "adminpanel");

        // Then
        const alert_error_text = await driver.findElement(webdriver.By.xpath("//div[@id='alert-not-authorized-admin-page']")).getText();
        await expect(alert_error_text).toEqual("You do not have permission to view this page.Go to Home");
    });

    // TODO: Debug failing test
    /*it("should not let logged in user be able to change their own role", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "adminpanel");

        let admin_panel_table = await driver.findElement(webdriver.By.xpath("//table[@id='admin-panel-table']"));
        await driver.wait(until.elementIsVisible(admin_panel_table), 15000);

        // Wait until change role button visible for admin user
        let change_role_select = await driver.findElement(webdriver.By.xpath("//select[@id='admin@venus.com-roles-form-select']"));
        await driver.wait(until.elementIsVisible(change_role_select), 15000);
        await change_role_select.sendKeys("ROLE_STAFF");

        // Then
    });*/
});

afterEach(async () => {
    await driver.quit();
}, 15000);