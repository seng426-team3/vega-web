import { webdriver, 
  driverBrowser, 
  reactAppURL,
  screen,
  getElementByXpath} from "./tests/seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

beforeAll(() => {
  driver = new webdriver.Builder().forBrowser(driverBrowser)
  .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // uncomment this line to run in browser locally
  .build();
});

describe("Test each publicly accessible page is reachable", () => {
  it("should access the contact us page", async () => {
    // Given
    await driver.get(reactAppURL + 'contactus');

    // When
    const contact_form_submit_button = await getElementByXpath(driver, "//button[@class='btn btn-primary']");
    const contact_form_submit_button_text = await contact_form_submit_button.getText()

    // Then
    // Assert contact form submit button exists
    expect(contact_form_submit_button_text).toEqual("Submit");
  })

  it("should access the leadership page", async () => {
    // Given
    await driver.get(reactAppURL + 'leadership');

    // When
    const ceo_title = await getElementByXpath(driver, "//p[text()='CHIEF EXECUTIVE OFFICER']");
    const ceo_title_text = await ceo_title.getText();

    // Then
    expect(ceo_title_text).not.toBeNull();
    expect(ceo_title_text).toEqual('CHIEF EXECUTIVE OFFICER');
  });

  it("should access the news & events page", async () => {
    // Given
    await driver.get(reactAppURL + 'news');

    // When
    const static_news_title = await getElementByXpath(driver, "//h1[@class='news-title']");
    // Then
    expect(static_news_title).not.toBeNull();
  });

  it("should access the platform page", async () => {
    // Given
    await driver.get(reactAppURL + 'platform');

    // When
    const page_title = await getElementByXpath(driver, "//h1[text()='Platform']");
    const page_title_text = await page_title.getText();

    // Then
    expect(page_title_text).toEqual('Platform');
  });

  it("should access the login page", async () => {
    // Given
    await driver.get(reactAppURL + 'login');

    // When
    const username_input = await getElementByXpath(driver, "//label[text()='USERNAME']");
    const username_input_label = await username_input.getText();

    // Then
    expect(username_input_label).toEqual('USERNAME');
  });

  it("should access the sign up page", async () => {
    // Given
    await driver.get(reactAppURL + 'signup');

    // When
    const create_account_title = await getElementByXpath(driver, "//h2[text()='Create an account']");
    const create_account_title_text = await create_account_title.getText();

    // Then
    expect(create_account_title_text).toEqual('Create an account');
  });

  it("should access the about us page", async () => {
    // Given
    await driver.get(reactAppURL + 'aboutus');

    // When
    const username_input_label = await getElementByXpath(driver, "//h1[text()='Vega Absolute']");
    const username_input_label_text = await username_input_label.getText();

    // Then
    expect(username_input_label_text).toEqual('Vega Absolute');
  });
});

afterAll(async () => {
  await driver.quit();
}, 15000);