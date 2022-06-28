import { until } from "selenium-webdriver";
import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

describe("Resources page should function properly for admin and users", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    it("should access the resources page when logged in as admin", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When 
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until resources button is visible to know we are logged in.
        const resources_link = await getElementByXpath(driver, "//a[@href='/resources']");
        await resources_link.click()

        // Then
        const file_upload_select = await getElementByXpath(driver, "//input[@id='formFile']");
        await expect(file_upload_select).not.toBeNull();
    });

    it("should access the resources page when logged in as staff", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When 
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until resources button is visible to know we are logged in.
        const resources_link = await getElementByXpath(driver, "//a[@href='/resources']");
        await resources_link.click()

        // Then
        const file_upload_select = await getElementByXpath(driver, "//input[@id='formFile']");
        await expect(file_upload_select).not.toBeNull();
    });

    it("should not be able to access page when logged out.", async () => {
        // Given & When
        await driver.get(reactAppURL + "resources");

        // Then
        const error_alert = await getElementByXpath(driver, "//div[@id='alert-not-authorized-resources-page']");
        const error_alert_text = await error_alert.getText()
        await expect(error_alert_text).toEqual('You do not have permission to view this page.Go to Home');
    });

    it("should not be able to access page when logged in as user.", async () => {
        // Given
        await driver.get(reactAppURL + "login");

        // When 
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('testuser2@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "resources");

        // Then
        const error_alert = await getElementByXpath(driver, "//div[@id='alert-not-authorized-resources-page']");
        const error_alert_text = await error_alert.getText()
        await expect(error_alert_text).toEqual('You do not have permission to view this page.Go to Home');
    });

    it("should upload filed successfully as admin.", async() => {
        // Given
        await driver.get(reactAppURL + "login");

        // When
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until resources button is visible to know we are logged in.
        const resources_link = await getElementByXpath(driver, "//a[@href='/resources']");
        await resources_link.click()

        // Select and upload test file
        const file_upload_select = await getElementByXpath(driver, "//input[@id='formFile']");
        await file_upload_select.sendKeys(process.cwd() + '/src/tests/testfile.txt');

        const file_upload_submit = await getElementByXpath(driver, "//button[@type='submit']");
        await file_upload_submit.click();

        // Then
        // Check for successful upload confirmation
        const upload_confirmation = await getElementByXpath(driver, "//div[@id='file-upload-successful-alert']");
        const upload_confirmation_text = await upload_confirmation.getText()
        await expect(upload_confirmation_text).toEqual('File has been uploaded successfully! Refresh the page to see the files.'); 
    });

    it("should not be able to view upload file component when logged in as staff role", async() => {
        // Given
        await driver.get(reactAppURL + "login");

        // When 
        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until resources button is visible to know we are logged in.
        const resources_link = await getElementByXpath(driver, "//a[@href='/resources']");
        await resources_link.click()

        // Then
        const cannot_upload_notice = await getElementByXpath(driver, "//p[@id='cannot-upload-notice']");
        const cannot_upload_notice_text = await cannot_upload_notice.getText();
        await expect(cannot_upload_notice_text).toEqual('You are not allowed to upload files as staff.');
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

