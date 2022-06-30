import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

/*
    The selenium tests here are described as new user stories in the milestone 3 report.
    Feature: Visitor should navigate to the appropriate location on Vega Absolute by following footer links
*/
describe('Test footer functionality', () => {
  beforeEach(() => {
      driver = new webdriver.Builder().forBrowser(driverBrowser)
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
      .build();
  });

  /* The following user story is covered by the cases below
    Scenario (US-2-35): Visitor should navigate to the appropriate location on Vega Absolute by following footer links
        Given I am a visitor, logged in or not
        And I am on any page of Vega Absolute
        When I click a clickable link in the footer of the application
        Then I am redirected to the specified page of Vega Absolute
  */
  it("should be able to navigate to platform page through the footer", async () => {
    // Given
    await driver.get(reactAppURL);
    
    // When
    const platform_footer_link = await getElementByXpath(driver, "//a[@href='/platform#dpi-header']");
    platform_footer_link.click();

    const platform_header = await getElementByXpath(driver, "//h1[@id='platform-header']");
    const platform_header_text = await platform_header.getText();

    // Then
    expect(platform_header_text).toEqual("Platform");
  });
  
  it("should be able to navigate to about us page through the footer", async () => {
    // Given
    await driver.get(reactAppURL);
    
    // When
    const why_vega_footer_link = await getElementByXpath(driver, "//a[@href='/aboutus#why-vega-header']");
    why_vega_footer_link.click();

    const why_vega_header = await getElementByXpath(driver, "//h2[@id='why-vega-header']");
    const why_vega_header_text = await why_vega_header.getText();

    // Then
    expect(why_vega_header_text).toEqual("Why Vega?");
   });
  
  it("should be able to navigate to news page through the footer", async () => {
      // Given
      await driver.get(reactAppURL);
      
      // When
      const news_footer_link = await getElementByXpath(driver, "//a[@href='/news#9.8.21']");
      news_footer_link.click();

      // When
      const static_news_title = await getElementByXpath(driver, "//h1[text()='This is a news article!']");
      const static_news_title_text = await static_news_title.getText();

      // Then
      await expect(static_news_title_text).toEqual('This is a news article!');
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

