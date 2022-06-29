import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

describe('Test footer functionality', () => {
  beforeEach(() => {
      driver = new webdriver.Builder().forBrowser(driverBrowser)
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
      .build();
  });

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

      const news_vega_date= await getElementByXpath(driver, "//p[@id='9.8.21']");
      const news_vega_date_text = await news_vega_date.getText();

      // Then
      expect(news_vega_date_text).toEqual("9.8.21");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

