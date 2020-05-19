/**
 * @jest-environment jest-environment-webdriver
 */
const { LoginPage, UsernamePage, PasswordPage, ConfirmationPage } = require('../pages/authenticationPages');
const { LandingPage } = require('../pages/landingPage');
const { ApplicationPage } = require('../pages/applicationPage');
const { LeadsPage, NewLeadPage } = require('../pages/leadPages');
const env = require('../environmentData');

describe('Login Flow', () => {

  const usernameText = env.username;
  const passwordText = env.password;

  test('enter login flow', async () => {
    const page = new LoginPage();
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
    const page = new LandingPage();
    await browser.wait(until.urlContains(page.url));
  })
  
});

describe('Create a lead', () => {
  const topicText = "Automated Test Lead";
  const firstNameText = "Automated Test First Name";
  const lastNameText = "Automated Test Last Name";
  const responsibilityGroupText = "DAL";
  const profitCenterText = "Dallas Construction";
  const departmentText = "Construction";


  test('enter lead flow', async () => {
    const page = new ApplicationPage();
    await browser.wait(until.titleContains(page.title));
    await page.openSalesMenu();
    await page.navigateToLeads();
  })

  test('create a new lead', async () => {
    
    const page = new LeadsPage();
    await browser.wait(until.titleContains(page.title));
    await page.newLead();
  })

  test('enter lead data', async () => {
    const page = new NewLeadPage();
    await browser.wait(until.titleContains(page.title));
    await page.setIFrameFocus();

    await page.topic(topicText);
    await page.fullName(firstNameText, lastNameText);
    await page.responsibilityGroup(responsibilityGroupText);
    await page.profitCenter(profitCenterText);
    await page.department(departmentText);
    
    await page.setIFrameFocusToParent();
    await page.saveAndClose();
  })

  test('confirm landing page', async () => {
    const page = new LeadsPage();
    await browser.wait(until.titleContains(page.title));
  })

  test('remove new lead', async () => {
    const page = new LeadsPage();
    await page.selectLead(0);
    await page.deleteSelectedLeads();
  })
  
});
