import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

/*
    The selenium tests here are described as new user stories in the milestone 3 report.
    Feature: All users and visitors must be able to view the platform page in Vega Absolute
*/
describe("Platform page should function properly for admin, users, and staff", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    /*
    Scenario (US-2-9): The application should return the page with page contents when visiting the platform page as a visitor
        Given I am a site visitor
        And I just landed on the Vega Absolute website
        When I access the Platform page of the application
        Then I am redirected to the Platform page
        And Can view the contents of the Platform page successfully
    */
    it("should return the page with contents when visiting the platform page", async () => {
        // Given & When
        await driver.get(reactAppURL + "platform");

        // Then
        const page_heading = await getElementByXpath(driver, "//h1[text()='Platform']");
        const page_heading_text = await page_heading.getText();
        await expect(page_heading_text).toEqual("Platform");
    });

    /*
    Scenario (US-2-10): The application should return the page with page contents when visiting the platform page as an admin.
        Given I am a an admin
        And I just logged in to vega absolute as an admin
        When I access the Platform page of the application
        Then I am redirected to the Platform page
        And Can view the contents of the Platform page successfully    
    */
    it("should return the page with contents when visiting the platform page logged in as admin", async () => {
        // Given & When
        await driver.get(reactAppURL + "login");

        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();
        
        await driver.get(reactAppURL + "platform");

        // Then
        const page_heading = await getElementByXpath(driver, "//h1[text()='Platform']");
        const page_heading_text = await page_heading.getText();
        await expect(page_heading_text).toEqual("Platform");
    });

    /*
    Scenario (US-2-11): The application should return the page with page contents when visiting the platform page as a staff.
        Given I am a staff member
        And I just logged in to vega absolute as a staff (staff role)
        When I access the Leadership page of the application
        Then I am redirected to the Leadership  page
        And Can view the contents of the Leadership page successfully
    */
    it("should return the page with contents when visiting the platform page logged in as staff", async () => {
        // Given & When
        await driver.get(reactAppURL + "login");

        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('jonoliver@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "platform");

        // Then
        const page_heading = await getElementByXpath(driver, "//h1[text()='Platform']");
        const page_heading_text = await page_heading.getText();
        await expect(page_heading_text).toEqual("Platform");
    });

    /*
    Scenario (US-2-12): The application should return the page with page contents when visiting the platform page as a user.
        Given I am a user
        And I just logged in to vega absolute as a user (user role)
        When I access the Platform page of the application
        Then I am redirected to the Platform page
        And Can view the contents of the Platform page successfully
    */
    it("should return the page with contents when visiting the platform page logged in as user", async () => {
        // Given & When
        await driver.get(reactAppURL + "login");

        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        
        await username_input_textbox.sendKeys('testuser2@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        await driver.get(reactAppURL + "platform");

        // Then
        const page_heading = await getElementByXpath(driver, "//h1[text()='Platform']");
        const page_heading_text = await page_heading.getText();
        await expect(page_heading_text).toEqual("Platform");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});
