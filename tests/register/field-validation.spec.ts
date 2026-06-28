import { test, expect } from '../../fixtures/base-test';
import { generateUserData } from '../../utils/data-generator';

test.describe('Registration Field Validations - Frenet', () => {
  let userData: ReturnType<typeof generateUserData>;

  test.beforeEach(async ({ registerPage }) => {
    userData = generateUserData();
    await registerPage.goto();
  });

  test('Should keep submit button disabled and display error for invalid email', async ({ registerPage }) => {
    await expect(registerPage.submitButton).toBeDisabled();

    await registerPage.fillForm({
      ...userData,
      email: 'invalid_email'
    });

    await expect(registerPage.emailErrorMsg).toBeVisible();
    await expect(registerPage.emailErrorMsg).toHaveText('Digite um e-mail válido.');
    await expect(registerPage.submitButton).toBeDisabled();
  });

  test('Should display error if passwords do not match', async ({ registerPage }) => {
    await registerPage.fillName(userData.name);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillCellphone(userData.cellphone);
    await registerPage.fillPassword('Frenet@123');
    await registerPage.fillConfirmPassword('Frenet@456');

    await expect(registerPage.confirmPasswordErrorMsg).toBeVisible();
    await expect(registerPage.confirmPasswordErrorMsg).toHaveText('Senhas não conferem');
    await expect(registerPage.submitButton).toBeDisabled();
  });

  test('Should display error for incomplete name', async ({ registerPage }) => {
    await registerPage.fillName('John');
    await registerPage.fillEmail(userData.email);
    await registerPage.fillCellphone(userData.cellphone);
    await registerPage.fillPassword(userData.password);
    await registerPage.fillConfirmPassword(userData.password);

    await expect(registerPage.nameErrorMsg).toBeVisible();
    await expect(registerPage.nameErrorMsg).toHaveText('Digite seu nome completo.');
    await expect(registerPage.submitButton).toBeDisabled();
  });

  test('Should display error for empty password', async ({ registerPage }) => {
    await registerPage.fillName(userData.name);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillCellphone(userData.cellphone);
    
    await registerPage.passwordInput.click();
    await registerPage.passwordInput.press('a');
    await registerPage.passwordInput.press('Backspace');
    await registerPage.passwordInput.press('Tab');

    await expect(registerPage.passwordErrorMsg).toBeVisible();
    await expect(registerPage.passwordErrorMsg).toHaveText('Campo obrigatório.');
    await expect(registerPage.submitButton).toBeDisabled();
  });

  test('Should display error for empty confirm password', async ({ registerPage }) => {
    await registerPage.fillName(userData.name);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillCellphone(userData.cellphone);
    await registerPage.fillPassword(userData.password);

    await registerPage.confirmPasswordInput.click();
    await registerPage.confirmPasswordInput.press('a');
    await registerPage.confirmPasswordInput.press('Backspace');
    await registerPage.confirmPasswordInput.press('Tab');

    await expect(registerPage.confirmPasswordErrorMsg).toBeVisible();
    await expect(registerPage.confirmPasswordErrorMsg).toHaveText('Campo Obrigatório.');
    await expect(registerPage.submitButton).toBeDisabled();
  });
});
