const usernamePageUrl = 'login.microsoftonline.com';
const passwordPageUrl = 'adfs.tdindustries.com/adfs/ls';
const confirmationPageUrl = 'login.microsoftonline.com';

class UsernamePage {

  get url() { return usernamePageUrl; }

  get usernameInput() { return browser.findElement(by.name('loginfmt')); }
  
  get nextButton() { return browser.findElement(by.css('input[type=submit]')); }
  
  submit () {
    return this.nextButton.click();
  } 
}

class PasswordPage {

  get url() { return passwordPageUrl; }

  get form() { return browser.findElement(by.tagName('form')); }
  
  get passwordInput() { return browser.findElement(by.name('Password')); }
  
  submit () {
    return this.form.submit();
  } 
}

class ConfirmationPage {

  get url() { return confirmationPageUrl; }

  get form() { return browser.findElement(by.tagName('form')); }
  
  submit () {
    return this.form.submit();
  } 
}

module.exports = { 
  UsernamePage,
  PasswordPage,
  ConfirmationPage
};