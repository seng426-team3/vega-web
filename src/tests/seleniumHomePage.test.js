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

    it("should display the correct carousel page text", async () => {
        // Given & When
        await driver.get(reactAppURL);
        
        // Then
        const carousel_element_1 = await getElementByXpath(driver, "//div[@id='carousel-text-1']");
        const carousel_element_1_text = await carousel_element_1.getText();
        expect(carousel_element_1_text).toEqual("Welcome to Vega Absolute!\nThe nation's leading Cyber Security company");

        const carousel_element_2 = await getElementByXpath(driver, "//div[@id='carousel-text-2']");
        const carousel_element_2_text = await carousel_element_2.getText();
        expect(carousel_element_2_text).toEqual("Unparalleled Security Solutions\nHire us to attend to your most precious assets and resources");

        const carousel_element_3 = await getElementByXpath(driver, "//div[@id='carousel-text-3']");
        const carousel_element_3_text = await carousel_element_3.getText();
        expect(carousel_element_3_text).toEqual("Customer Security Products\nOur flagship product, Vega Vault, will keep your secrets secure and safe.");
    });

    afterEach(async () => {
        await driver.quit();
    }, 15000);
});

