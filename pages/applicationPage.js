const url = 'https://tderprtest.crm.dynamics.com/';
const title = 'Dashboards'

class ApplicationPage {

    get url() { return url; }
    get title() { return title; }
    
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