const leadsPageUrl = 'tderprtest.crm.dynamics.com/main.aspx';
const leadsPageTitle = 'Leads My Open Leads'
const newLeadPageUrl = 'tderprtest.crm.dynamics.com/main.aspx';
const newLeadPageTitle = 'Lead: New Lead'

class LeadsPage {

    get url() { return leadsPageUrl; }
    get title() {return leadsPageTitle; }
  
    // get newLeadButton() { return browser.findElement(by.id('lead|NoRelationship|HomePageGrid|Mscrm.HomepageGrid.lead.NewRecord')); }
    get newLeadButton() { return browser.findElement(by.css('*[id="lead\|NoRelationship\|HomePageGrid\|Mscrm\.HomepageGrid\.lead\.NewRecord"] a')); }
    get deleteSelectedLeadsButton() { return browser.findElement(by.css('*[id="lead\|NoRelationship\|HomePageGrid\|Mscrm\.HomepageGrid\.lead\.DeleteMenu"] a')); }
    get deleteConfirmationButton() { return browser.findElement(by.id('butBegin')); }
    
    get navBarOverlay() { return browser.findElement(by.id('navBarOverlay')); }
  
    async disableNavBarOverlay() {
      const overlay = await this.navBarOverlay;
      return await browser.executeScript("arguments[0].setAttribute('style', 'display: none')", overlay);
    }
  
    async newLead() {
      await this.disableNavBarOverlay();
      return this.newLeadButton.click();
    }
  
    async deleteSelectedLeads() {
      await this.disableNavBarOverlay();
      await this.deleteSelectedLeadsButton.click();
  
      const dialogLoading = await browser.findElement(by.id('DialogLoadingDiv'));
      await browser.wait(until.elementIsNotVisible(dialogLoading));
  
      await browser.switchTo().frame('InlineDialog_Iframe');
      await this.deleteConfirmationButton.click();
      return browser.switchTo().parentFrame();
    }
  
    async selectLead(index) {
      await browser.sleep(6000);
  
      await this.disableNavBarOverlay();
      await browser.switchTo().frame('contentIFrame0');
  
      // TODO: Enhance so that row can be specified
      const firstRowCell = await browser.findElement(by.xpath("//table[@id='gridBodyTable']//tr[1]/td[3]"));
      await firstRowCell.click();
      
      return browser.switchTo().parentFrame();
    }
  
} 
  
class NewLeadPage {

    get url() { return newLeadPageUrl; }
    get title() { return newLeadPageTitle; }

    get topicInput() { return browser.findElement(by.id('subject_i')); }
    async topic(value) { 
        const input = await this.topicInput
        return input.sendKeys(value); 
    }

    get firstNameInput() { return browser.findElement(by.id('fullname_compositionLinkControl_firstname_i')); }
    get lastNameInput() { return browser.findElement(by.id('fullname_compositionLinkControl_lastname_i')); }

    async fullName(firstName, lastName) {

        // Open the full name composite dialog
        await browser.findElement(by.id('fullname_d')).click();
        
        if (firstName) {
        await browser.findElement(by.id('fullname_compositionLinkControl_firstname_d')).click();
        await this.firstNameInput.sendKeys(firstName);   
        }

        if (lastName) {
        await browser.findElement(by.id('fullname_compositionLinkControl_lastname_d')).click();
        await this.lastNameInput.sendKeys(lastName);   
        }

        // Close the dialog
        await browser.findElement(by.id('fullname_compositionLinkControl_flyoutLoadingArea-confirm')).click();
        await browser.findElement(by.id('fullname_compositionLinkControl_flyoutLoadingArea-confirm')).click();
    }

    get responsibilityGroupInput() { return browser.findElement(by.id('td_resourcegroup_ledit')); }
    async responsibilityGroup(value) { 
        await browser.findElement(by.xpath("//div[@id='td_resourcegroup']/div[1]")).click();
        const input = await this.responsibilityGroupInput;
        return input.sendKeys(value);
    }

    get profitCenterInput() { return browser.findElement(by.id('td_profitcenter_ledit')); }
    async profitCenter(value) { 
        await browser.findElement(by.xpath("//div[@id='td_profitcenter']/div[1]")).click();
        const input = await this.profitCenterInput;
        return input.sendKeys(value);
    }

    get departmentInput() { return browser.findElement(by.id('td_department_ledit')); }
    async department(value) { 
        await browser.findElement(by.xpath("//div[@id='td_department']/div[1]")).click();
        const input = await this.departmentInput;
        return input.sendKeys(value); 
    }

    get saveAndCloseButton() { return browser.findElement(by.css('*[id="lead\|NoRelationship\|Form\|Mscrm.Form.lead.SaveAndClose"] a')); }

    setIFrameFocus() {
        return browser.switchTo().frame('contentIFrame1');
    }

    setIFrameFocusToParent() {
        return browser.switchTo().parentFrame();
    }

    async saveAndClose() {
        await this.saveAndCloseButton.click();
        return this.saveAndCloseButton.click();
    }

}

module.exports = {
    LeadsPage,
    NewLeadPage
};