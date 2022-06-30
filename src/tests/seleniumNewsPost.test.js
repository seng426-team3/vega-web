import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath
} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

const title = 'This is a test news article!';
const author = 'Test User';
const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('Admin or Staff user should be able to add news postings in the News & Events (user story 1 in RSD, issue #1)', () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });


    it("should allow user to submit new stories on the news page", async () => {
        // Given user is logged in
        await driver.get(reactAppURL + "login");

        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until the news page and adding a post is visible to the logged in admin or staff.
        await getElementByXpath(driver, "//a[@href='/adminpanel']");

        const news_link = await getElementByXpath(driver, "//a[@href='/news']");
        await news_link.click();

        // When
        const news_add_post_btn = await getElementByXpath(driver, "//button[@id='add-post-btn']");
        await news_add_post_btn.click();
        
        // And User Inputs the News Article
        const title_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='title']"));
        const author_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='author']"));
        const message_input_textbox = await driver.findElement(webdriver.By.xpath("//textarea[@id='content-body']"));
        const add_post_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='add-post-submit-button']"));

        // And
        await title_input_textbox.sendKeys(title);
        await author_input_textbox.sendKeys(author);
        await message_input_textbox.sendKeys(message);

        await add_post_submit_btn.click();
        
        // Then
        await getElementByXpath(driver, "//div[@id='add-post-alert-success']");
        
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

describe('An admin or staff user should be able to remove news or an event from the News & Events page (user story 2 in RSD, issue #2)', () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });


    it("should allow user to delete new stories on the news page", async () => {
        // Given user is logged in
        await driver.get(reactAppURL + "login");

        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until the news page and deleting post is visible to the logged in admin or staff.
        await getElementByXpath(driver, "//a[@href='/adminpanel']");

        const news_link = await getElementByXpath(driver, "//a[@href='/news']");
        await news_link.click();

        // When
        const news_delete_post_btn = await getElementByXpath(driver, "//*[@id='delete-post-btn']");
        await news_delete_post_btn.click();
        
        // Then
        await getElementByXpath(driver, "//div[@id='delete-post-alert-success']");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

describe('An admin or staff user should be able to edit news or an event on the News & Events page (user story 3 in RSD, issue #3)', () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });


    it("should allow user to edit new stories on the news page", async () => {
        // Given user is logged in
        await driver.get(reactAppURL + "login");

        const username_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-username']");
        const password_input_textbox = await getElementByXpath(driver, "//input[@id='login-form-password']");
        const login_form_submit_btn = await getElementByXpath(driver, "//button[@id='login-form-submit-button']");

        await username_input_textbox.sendKeys('admin@venus.com');
        await password_input_textbox.sendKeys('pass');
        await login_form_submit_btn.click();

        // Wait until the news page and edit post is visible to the logged in admin or staff.
        await getElementByXpath(driver, "//a[@href='/adminpanel']");

        const news_link = await getElementByXpath(driver, "//a[@href='/news']");
        await news_link.click();

        // When
        const news_delete_post_btn = await getElementByXpath(driver, "//*[@id='edit-post-btn']");
        await news_delete_post_btn.click();

        // And User Edits the News Article
        const title_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='title']"));
        const author_input_textbox = await driver.findElement(webdriver.By.xpath("//input[@id='author']"));
        const message_input_textbox = await driver.findElement(webdriver.By.xpath("//textarea[@id='content-body']"));
        const edit_post_submit_btn = await driver.findElement(webdriver.By.xpath("//button[@id='edit-post-submit-button']"));

        // And
        await title_input_textbox.sendKeys(title);
        await author_input_textbox.sendKeys(author);
        await message_input_textbox.sendKeys(message);

        await edit_post_submit_btn.click();
        
        // Then
        await getElementByXpath(driver, "//div[@id='edit-post-alert-success']");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});