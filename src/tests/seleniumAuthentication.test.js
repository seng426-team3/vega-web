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
});

describe("User must be able to login into their account if one exists (user story 8 in RSD)", () => {
    it("should login when username and password are correct", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        let signout_button = driver.findElement(webdriver.By.xpath("//button[text()='signout']"));
        await driver.wait(until.elementIsVisible(signout_button), 15000);
        
        const logged_in_username = await driver.findElement(webdriver.By.xpath("//p[@id='username-text']")).getText();

        // Then
        await expect(logged_in_username).toEqual("admin@venus.com");
    });

    it("should logout properly after being logged in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "account");

        // Wait until signout button visible to know we are logged in
        let signout_button = driver.findElement(webdriver.By.xpath("//button[text()='signout']"));
        await driver.wait(until.elementIsVisible(signout_button), 15000);
        await signout_button.click();

        // Then
        const login_signup_navbar_element_text = await driver.findElement(webdriver.By.xpath("//a[@href='/login']")).getText();

        await expect(login_signup_navbar_element_text).toEqual('Login/SignUp');
    });

    it("should fail when invalid credentials are input", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));

        await username_input_textbox.sendKeys('invalid298223987@venuc.com');
        await password_input_textbox.sendKeys('invalidpass902nd23');
        await login_form_submit_btn.click();

        // Then
        const failed_login_alert = await driver.findElement(webdriver.By.xpath("//div[@role='alert']"));
        await expect(failed_login_alert).not.toBeNull();
    });
});

afterEach(async () => {
    await driver.quit();
}, 15000);