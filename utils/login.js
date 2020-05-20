const { UsernamePage, PasswordPage, ConfirmationPage } = require('../pages/authenticationPages');

class Login {

  async start(url, username, password) {
    await browser.get(url);
    await this.username(username);
    await this.password(password);
    await this.confirm();
    await browser.wait(until.urlContains(url));
  }

  async username(usernameText) {
    const page = new UsernamePage();
    await browser.wait(until.urlContains(page.url));
    await page.usernameInput.sendKeys(usernameText);
    await page.submit();
  }

  async password(passwordText) {
    const page = new PasswordPage();
    await browser.wait(until.urlContains(page.url));
    await page.passwordInput.sendKeys(passwordText);
    await page.form.submit();

  }

  async confirm() {
    const page = new ConfirmationPage();
    await browser.wait(until.urlContains(page.url));
    await page.form.submit();
  }
}


module.exports = { Login };