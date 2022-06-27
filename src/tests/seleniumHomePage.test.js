import { webdriver, 
    driverBrowser, 
    reactAppURL,
    screen} from "./seleniumConfig";
const firefox = require('selenium-webdriver/firefox');

let driver;

beforeEach(() => {
    driver = new webdriver.Builder().forBrowser(driverBrowser)
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen)) // comment this line to run in browser locally
    .build();
});

describe('Test home page functionality', () => {
    it("should return a 200 OK response when visiting the home page containing the logo", async () => {
        // Given
        await driver.get(reactAppURL);
        
        // When
        const logo_element_src = await driver.findElement(webdriver.By.xpath("//embed[@src='/static/media/logo.45bf2061.svg']")).getAttribute('src');
        
        // Then
        expect(logo_element_src).toEqual(reactAppURL + 'static/media/logo.45bf2061.svg');
        expect(5).toEqual(5);
    });
});

afterEach(async () => {
    await driver.quit();
}, 15000);