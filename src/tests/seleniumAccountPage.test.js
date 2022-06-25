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

describe("User must be able to view their account details", () => {
    it("should be able to access the account page after logging in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.findElement(webdriver.By.xpath("//a[@href='/account']")).click();

        // Then
        const logged_in_username = await driver.findElement(webdriver.By.xpath("//p[@id='username-text']")).getText();
        await expect(logged_in_username).toEqual("admin@venus.com");
    });

    it("should not be able to access the account page if not logged in", async () => {
        // Given & When
        await driver.get(reactAppURL + "account");

        // Then
        const alert_error_text = await driver.findElement(webdriver.By.xpath("//div[@id='alert-not-authorized-account-page']")).getText();
        await expect(alert_error_text).toEqual("You do not have permission to view this page.Go to Home");
    });
});

afterAll(async () => {
    await driver.quit();
}, 15000);