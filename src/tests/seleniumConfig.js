export const webdriver = require("selenium-webdriver");
export const driverBrowser = "firefox";
//export const reactAppURL = "http://127.0.0.1:3000/";

export const screen = {
    width: 1920,
    height: 1080
};

// Set timeout to 30 seconds to account for startup
jest.setTimeout(30000);

// Use URL below to test production vega web
export const reactAppURL = "https://seng426-team3-vega-web-frontend.azurewebsites.net/";