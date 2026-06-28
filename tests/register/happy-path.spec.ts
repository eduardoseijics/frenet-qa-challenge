import { test, expect } from '../../fixtures/base-test';
import { generateUserData } from '../../utils/data-generator';

test.describe('New User Registration Flow - Frenet', () => {
  let userData: ReturnType<typeof generateUserData>;

  test.beforeEach(async ({ registerPage }) => {
    userData = generateUserData();
    await registerPage.goto();
  });

  test('Should successfully register a new user @happyPath @smoke', async ({ registerPage, page }) => {
    test.fixme(true, 'reCAPTCHA cannot be resolved automatically in a headless/automated environment.');

    await registerPage.fillForm(userData);

    await registerPage.clickRecaptcha();

    await expect(registerPage.submitButton).toBeEnabled({ timeout: 60000 });

    await registerPage.submit();
    await expect(page).toHaveURL('https://painel.frenet.com.br/Score', { timeout: 20000 });
  });
});
