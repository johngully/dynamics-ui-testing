/**
 * @jest-environment jest-environment-webdriver
 */
const { ApplicationPage } = require('../pages/ApplicationPage');
const { LeadsPage, NewLeadPage } = require('../pages/leadPages');
const { LoginFlow } = require('../flows/login');
const env = require('../environmentData');

describe('Create a lead', () => {
  const topicText = "Automated Test Lead";
  const firstNameText = "Automated Test First Name";
  const lastNameText = "Automated Test Last Name";
  const responsibilityGroupText = "DAL";
  const profitCenterText = "Dallas Construction";
  const departmentText = "Construction";

  test('Login', async () => {    
    const page = new ApplicationPage();
    await LoginFlow(page.url, env.username, env.password);
  })

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
