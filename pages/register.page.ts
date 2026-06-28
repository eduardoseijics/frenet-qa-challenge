import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the registration page (https://cadastro.frenet.com.br/)
 * Encapsulates all elements and actions of the registration form.
 * @author Eduardo Seiji
 */
export class RegisterPage {
  readonly page                   : Page;
  readonly nameInput              : Locator;
  readonly emailInput             : Locator;
  readonly cellphoneInput         : Locator;
  readonly passwordInput          : Locator;
  readonly confirmPasswordInput   : Locator;
  readonly submitButton           : Locator;
  readonly nameErrorMsg           : Locator;
  readonly emailErrorMsg          : Locator;
  readonly passwordErrorMsg       : Locator;
  readonly confirmPasswordErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput            = page.locator('#Name');
    this.emailInput           = page.locator('#Email');
    this.cellphoneInput       = page.locator('#Cellphone');
    this.passwordInput        = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.submitButton         = page.locator('#btnSubmit');

    this.nameErrorMsg            = page.locator('#Name_msg');
    this.emailErrorMsg           = page.locator('#Email_msg');
    this.passwordErrorMsg        = page.locator('#Password_msg');
    this.confirmPasswordErrorMsg = page.locator('#ConfirmPassword_msg');
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillName(name: string) {
    await this.nameInput.click();
    await this.nameInput.pressSequentially(name, { delay: 10 });
  }

  async fillEmail(email: string) {
    await this.emailInput.click();
    await this.emailInput.pressSequentially(email, { delay: 10 });
  }

  async fillCellphone(cellphone: string) {
    await this.cellphoneInput.click();
    await this.cellphoneInput.pressSequentially(cellphone, { delay: 10 });
  }

  async fillPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.pressSequentially(password, { delay: 10 });
  }

  async fillConfirmPassword(password: string) {
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.pressSequentially(password, { delay: 10 });
    await this.confirmPasswordInput.press('Tab');
  }

  async fillForm(data: { name: string; email: string; cellphone: string; password: string }) {
    await this.fillName(data.name);
    await this.fillEmail(data.email);
    await this.fillCellphone(data.cellphone);
    await this.fillPassword(data.password);
    await this.fillConfirmPassword(data.password);
  }

  async clickRecaptcha() {
    const recaptchaIframe = this.page.frameLocator('iframe[title="reCAPTCHA"]').first();
    await recaptchaIframe.locator('#recaptcha-anchor').click();
  }

  async submit() {
    await this.submitButton.click();
  }
}
