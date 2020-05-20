/**
 * @jest-environment jest-environment-webdriver
 */
// const { LoginPage, UsernamePage, PasswordPage, ConfirmationPage } = require('../pages/authenticationPages');
const { FOApplicationPage } = require('../pages/foApplicationPage');
const { LoginFlow } = require('../flows/login');
const env = require('../environmentData');

describe('F&O Application Flow', () => {

  test('Login', async () => {    
    const page = new FOApplicationPage();
    await LoginFlow(page.url, env.username, env.password);
  })

  test('Navigate to F&O', async () => {
    const page = new FOApplicationPage();
    await browser.get(page.url);
    await browser.wait(until.titleContains(page.title));
  })

})
