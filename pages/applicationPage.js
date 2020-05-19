const landingPageUrl = 'tderprtest.crm.dynamics.com/main.aspx';
const landingPageTitle = 'Dashboards'

class ApplicationPage {

    get url() { return landingPageUrl; }
    get title() { return landingPageTitle; }
    
    get salesMenuButton() { return browser.findElement(by.css('a[title=Sales]')); }
    get leadsButtons() { return browser.findElement(by.id('nav_leads')); }
  
    openSalesMenu() {
      return this.salesMenuButton.click();
    }
  
    navigateToLeads() {
      return this.leadsButtons.click();
    }
  
}

module.exports = { ApplicationPage };