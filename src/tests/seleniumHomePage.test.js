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

    it("should return a 200 OK response when visiting the home page containing the logo", async () => {
        // Given
        await driver.get(reactAppURL);
        
        // When
        const logo_element = await getElementByXpath(driver, "//embed[@src='/static/media/logo.45bf2061.svg']");
        const logo_element_src = await logo_element.getAttribute('src');
        
        // Then
        expect(logo_element_src).toEqual(reactAppURL + 'static/media/logo.45bf2061.svg');
        expect(5).toEqual(5);
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

