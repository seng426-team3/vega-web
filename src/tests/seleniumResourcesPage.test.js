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
    Feature: Admin and staff should be able to view and interact with Resources in Vega Absolute
*/
describe("Resources page should function properly for admin and staff", () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    /*
    Scenario (US-2-36): Admin should access the resources page when logged in
        Given I am a registered admin
        And I am logged in
        When I navigate to the “Resources” page of Vega Absolute
        Then I can view the page, including the upload file option
    */
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

    /*
    Scenario (US-2-37): Staff should access the resources page when logged in
        Given I am a registered staff
        And I am logged in
        When I navigate to the “Resources” page of Vega Absolute
        Then I can view the page, not including the upload file option
     */
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
        const resources_table = await getElementByXpath(driver, "//table[@id='resources-file-table']");
        await expect(resources_table).not.toBeNull();
    });

    /*
    Scenario (US-2-38): Visitor cannot access the admin page when logged out
        Given I am a visitor on Vega Absolute
        And I am not logged in
        When I attempt to access the Admin page via the URL
        Then I receive an error indicating I do not have permission to view this page
        And I have no access to the admin panel
    */
    it("should not be able to access page when logged out.", async () => {
        // Given & When
        await driver.get(reactAppURL + "resources");

        // Then
        const error_alert = await getElementByXpath(driver, "//div[@id='alert-not-authorized-resources-page']");
        const error_alert_text = await error_alert.getText()
        await expect(error_alert_text).toEqual('You do not have permission to view this page.Go to Home');
    });

    /*
    Scenario (US-2-39): User cannot access the admin page when logged in
        Given I am a registered user on Vega Absolute
        And I am logged in
        When I attempt to access the Admin page via the URL
        Then I receive an error indicating I do not have permission to view this page
        And I have no access to the admin panel    
    */
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

    /*
    Scenario (US-2-40) (User story 6 from RSD): Admin should be able to upload file successfully to Resources
        Given I am an admin
        And I am logged into my account
        And I am on the “Resources” page
        When I click “Select a File”
        And I select a file to upload
        And I click “Upload”
        Then a confirmation message appears that the file was uploaded
        And staff can access the new file on the “Resources” page
    */
    it("should upload file successfully as admin.", async() => {
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
        await expect(upload_confirmation_text).toEqual('File has been uploaded successfully! Refresh the page to see the files.\nClose'); 
    });

    /* User story US2-37 above covered by this test case */
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

    /*
    Scenario (US-2-42): Admin must be able to check the resources tab to view uploaded files by Admin
        Given I am an admin of Vega Absolute
        And I have an account with admin role with Vega Absolute
        And I am logged into my account with admin role
        When I navigate to the “Resources” page of the application
        Then I will see a list of all files uploaded by Admin
        And I will have the option of viewing details of the file
    */
    it("should upload file successfully as admin and admin should be able to view file", async() => {
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

        // Check for successful upload confirmation
        const upload_confirmation = await getElementByXpath(driver, "//div[@id='file-upload-successful-alert']");
        const upload_confirmation_text = await upload_confirmation.getText()
        await expect(upload_confirmation_text).toEqual('File has been uploaded successfully! Refresh the page to see the files.\nClose'); 

        // Reload page
        await driver.get(reactAppURL + "resources");

        const uploaded_file = await getElementByXpath(driver, "//a[@id='filename-link-testfile.txt']");
        await uploaded_file.click();

        // Then
        const uploaded_file_contents = await getElementByXpath(driver, "//div[@id='file-content']");
        const uploaded_file_contents_text = await uploaded_file_contents.getText();
        await expect(uploaded_file_contents_text).toEqual("This file is used to test file upload to server.");
    });

    /*
    Scenario (US-2-41) (User story 11 from RSD): Employees must be able to check the resources tab to view uploaded files by Admin
        Given I am an employee of Vega Absolute
        And I have an account with employee role with Vega Absolute
        And I am logged into my account
        When I navigate to the “Resources” page of the application
        Then I will see a list of all files uploaded by Admin
        And I will have the option of viewing details of the file   
    */
    it("should upload file successfully as admin and staff should be able to view file", async() => {
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

        // Check for successful upload confirmation
        const upload_confirmation = await getElementByXpath(driver, "//div[@id='file-upload-successful-alert']");
        const upload_confirmation_text = await upload_confirmation.getText()
        await expect(upload_confirmation_text).toEqual('File has been uploaded successfully! Refresh the page to see the files.\nClose'); 
        // Sign out and sign-back in as staff
        const account_link = await getElementByXpath(driver, "//a[@href='/account']");
        await account_link.click();

        const signout_button = await getElementByXpath(driver, "//button[@id='signout-button']");
        await signout_button.click();

        // Login as staff
        await driver.get(reactAppURL + "login");
        const username_staff_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_staff_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_staff_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");
        await username_staff_input_textbox.sendKeys('jonoliver@venus.com');
        await password_staff_input_textbox.sendKeys('pass');
        await login_staff_form_submit_btn.click();

        // Reload page
        await driver.get(reactAppURL + "resources");

        const uploaded_file = await getElementByXpath(driver, "//a[@id='filename-link-testfile.txt']");
        await uploaded_file.click();

        // Then
        const uploaded_file_contents = await getElementByXpath(driver, "//div[@id='file-content']");
        const uploaded_file_contents_text = await uploaded_file_contents.getText();
        await expect(uploaded_file_contents_text).toEqual("This file is used to test file upload to server.");
    });


    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

