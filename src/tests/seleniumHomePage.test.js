import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen,
    getElementByXpath} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

describe('Test home page functionality', () => {
    beforeEach(() => {
        driver = new webdriver.Builder().forBrowser(driverBrowser)
        .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
        .build();
    });

    /* This test is related to user story 1 in RSD, referred to being able to access public pages of Vega Absolute */
    it("should return a 200 OK response when visiting the home page containing the logo", async () => {
        // Given
        await driver.get(reactAppURL);
        
        // When
        const logo_element = await getElementByXpath(driver, "//embed[@src='/static/media/logo.738272f3.png']");
        const logo_element_src = await logo_element.getAttribute('src');
        
        // Then
        expect(logo_element_src).toEqual(reactAppURL + 'static/media/logo.738272f3.png');
    });

     it("should redirect to the home page when clicking on the logo", async () => {
        // Given
        await driver.get(reactAppURL + "platform");
        
        // When
        const logo_element = await getElementByXpath(driver, "//embed[@src='/static/media/logo.738272f3.png']");
        logo_element.click()
        
        const home_page_carousel = await getElementByXpath(driver, "//div[@class='carousel-inner']");

        // Then
        expect(home_page_carousel).not.toBeNull();
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

