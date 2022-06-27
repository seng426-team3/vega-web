import { webdriver, 
  driverBrowser, 
  reactAppURL,
  screen} from "./tests/seleniumConfig";
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
    const contact_form_submit_button_text = await driver.findElement(webdriver.By.xpath("//button[@class='btn btn-primary']")).getText();

    // Then
    // Assert contact form submit button exists
    expect(contact_form_submit_button_text).toEqual("Submit");
  })

  it("should access the leadership page", async () => {
    // Given
    await driver.get(reactAppURL + 'leadership');

    // When
    const ceo_title = await driver.findElement(webdriver.By.xpath("//p[text()='CHIEF EXECUTIVE OFFICER']")).getText();

    // Then
    expect(ceo_title).not.toBeNull();
    expect(ceo_title).toEqual('CHIEF EXECUTIVE OFFICER');
  });

  it("should access the news & events page", async () => {
    // Given
    await driver.get(reactAppURL + 'news');

    // When
    const static_news_title = await driver.findElement(webdriver.By.xpath("//h1[text()='IG Design Group Selects Vega NextGen for Cybersecurity']")).getText();

    // Then
    expect(static_news_title).toEqual('IG Design Group Selects Vega NextGen for Cybersecurity');
  });

  it("should access the platform page", async () => {
    // Given
    await driver.get(reactAppURL + 'platform');

    // When
    const page_title = await driver.findElement(webdriver.By.xpath("//h1[text()='Platform']")).getText();

    // Then
    expect(page_title).toEqual('Platform');
  });

  it("should access the login page", async () => {
    // Given
    await driver.get(reactAppURL + 'login');

    // When
    const username_input_label = await driver.findElement(webdriver.By.xpath("//label[text()='USERNAME']")).getText();

    // Then
    expect(username_input_label).toEqual('USERNAME');
  });

  it("should access the signup page", async () => {
    // Given
    await driver.get(reactAppURL + 'signup');

    // When
    const create_account_title = await driver.findElement(webdriver.By.xpath("//h2[text()='Create an account']")).getText();

    // Then
    expect(create_account_title).toEqual('Create an account');
  });
});

afterAll(async () => {
  await driver.quit();
}, 15000);