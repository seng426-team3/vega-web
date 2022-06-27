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

describe("Resources page should function properly for admin and users", () => {
    it("should access the reosurces page when logged in", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until resources button is visible to know we are logged in.
        let resources_link = await driver.findElement(webdriver.By.xpath("//a[@href='/resources']"));
        await driver.wait(until.elementIsVisible(resources_link), 15000);
        await resources_link.click()

        // Then
        const file_upload_select = await driver.findElement(webdriver.By.xpath("//input[@id='formFile']"));
        await expect(file_upload_select).not.toBeNull();
    });

    it("should not be able to access page when logged out.", async () => {
        // Given & When
        await driver.get(reactAppURL + "resources");

        // Then
        const error_alert_text = await driver.findElement(webdriver.By.xpath("//div[@id='alert-not-authorized-resources-page']")).getText();
        await expect(error_alert_text).toEqual('You do not have permission to view this page.Go to Home');
    });

    it("should upload filed successfully as admin.", async() => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-username']"));
        const password_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='login-form-password']"));
        const login_form_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='login-form-submit-button']"));
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until resources button is visible to know we are logged in.
        let resources_link = await driver.findElement(webdriver.By.xpath("//a[@href='/resources']"));
        await driver.wait(until.elementIsVisible(resources_link), 15000);
        await resources_link.click()

        // Select and upload test file
        let file_upload_select = await driver.findElement(webdriver.By.xpath("//input[@id='formFile']"));
        await file_upload_select.sendKeys(process.cwd() + '/src/tests/testfile.txt');

        let file_upload_submit = await driver.findElement(webdriver.By.xpath("//button[@type='submit']"));
        await file_upload_submit.click();

        // Then
        // Check for successful upload confirmation
        let upload_confirmation_text = await driver.findElement(webdriver.By.xpath("//div[@id='file-upload-successful-alert']")).getText();
        await expect(upload_confirmation_text).toEqual('File has been uploaded successfully! Refresh the page to see the files.'); 
    });
});

afterEach(async () => {
    await driver.quit();
}, 15000);