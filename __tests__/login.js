/**
 * @jest-environment jest-environment-webdriver
 */
const { UsernamePage, PasswordPage, ConfirmationPage } = require('../pages/authenticationPages');
const { ApplicationPage } = require('../pages/applicationPage');
const env = require('../environmentData');

describe('Login Flow', () => {

  const usernameText = env.username;
  const passwordText = env.password;

  test('enter login flow', async () => {
    const page = new ApplicationPage();
    await browser.get(page.url);
  })

  test('enter username', async () => {
    const page = new UsernamePage();
    await browser.wait(until.urlContains(page.url));
    
    // For some reason using the form submit method on this stage 
    // in the login flow does not work.  Finding the button and 
    // performing the click action seemed to work.
  
    // const usernameForm = await browser.findElement(by.tagName('form'));
    const usernameInput = await page.usernameInput;
    const nextButton = await page.nextButton;
    // expect(usernameForm).toBeDefined();
    expect(usernameInput).toBeDefined();
    expect(nextButton).toBeDefined();

    await usernameInput.sendKeys(usernameText);
    await page.submit();
    // await usernameForm.submit();
  })

  test('enter password', async () => {
    const page = new PasswordPage();
    await browser.wait(until.urlContains(page.url));

    const passwordForm = await page.form;
    const passwordInput = await page.passwordInput;
    expect(passwordForm).toBeDefined();
    expect(passwordInput).toBeDefined();

    await passwordInput.sendKeys(passwordText);
    await passwordForm.submit();
  })

  test('confirm sign-in', async () => {
    const page = new ConfirmationPage();
    await browser.wait(until.urlContains(page.url));

    const confirmationForm = await page.form;
    expect(confirmationForm).toBeDefined();

    await confirmationForm.submit();
  })

  test('confirm landing page', async () => {
    const page = new ApplicationPage();
    await browser.wait(until.urlContains(page.url));
    await browser.wait(until.titleContains(page.title));
    const title = await browser.getTitle();
    expect(title).toContain(page.title);
  })
  
});
