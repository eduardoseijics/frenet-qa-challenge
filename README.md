# Automated Testing Project - Frenet Registration

This project contains an end-to-end (E2E) automated testing suite for the registration flow of the [Frenet](https://cadastro.frenet.com.br/) platform. It was built using **Playwright** with **TypeScript**. It covers multiple browsers and both desktop and mobile viewports.

---

## 🛠️ Technologies Used

- **Playwright Test**: Core E2E testing framework.
- **TypeScript**: Typed programming language for enhanced safety and developer experience.
- **faker-br**: Dependency used to dynamically generate valid Brazilian names, cellphones, and document mock formats.

---

## 📂 Project Structure

The codebase is organized as follows to ensure clean code, reusability, and maintainability:

```text
├── fixtures/
│   └── base-test.ts            # Playwright custom fixtures (automatic Page Object injection)
├── pages/
│   └── register.page.ts        # Page Object encapsulating elements and actions of the registration form
├── tests/
│   └── register/
│       ├── field-validation.spec.ts # Negative test cases verifying validation errors
│       └── happy-path.spec.ts       # Positive path test (successful registration)
├── types/
│   └── faker-br.d.ts           # Global TypeScript type declarations for faker-br
├── utils/
│   └── data-generator.ts       # Helper utility to generate mock Brazilian user data
├── playwright.config.ts        # Global Playwright configurations (browsers, viewports, etc.)
├── tsconfig.json               # TypeScript compiler configurations
├── package.json                # Project dependencies and scripts
└── CONTRIBUTING.md             # Contribution guidelines and test automation best practices
```

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** (version 20 or higher) installed.
- If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project root to automatically switch to the correct Node.js version.


### 1. Install dependencies
Run the command below in the project root directory to install the required packages:
```bash
npm install
```

### 2. Run the tests
To execute all test cases across all configured environments (Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari):
```bash
npx playwright test
```

### 3. Run a specific test file
If you want to run only the field validation checks:
```bash
npx playwright test tests/register/field-validation.spec.ts
```

### 4. Run in UI Mode
To launch Playwright's interactive visual runner:
```bash
npx playwright test --ui
```

---

## 📝 Important QA Observations

### 🔹 Google reCAPTCHA Bypass
The happy path test (`happy-path.spec.ts`) is marked as `test.fixme()` (skipped during automated runs) because the flow requires solving Google's reCAPTCHA, which cannot be solved automatically in headless/automated test environments.

### 🔹 Error Message Capitalization Inconsistency
During the verification of empty input fields, a minor inconsistency in the capitalization of error messages was identified on the registration form:
* The **Senha** (Password) field displays: `Campo obrigatório.` (lowercase "o")
* The **Confirmar Senha** (Confirm Password) field displays: `Campo Obrigatório.` (uppercase "O")

The automated assertions in `field-validation.spec.ts` are intentionally configured to match this production behavior.

---

## 📖 Test Scenarios (Gherkin/BDD)

Although Cucumber is not used directly in the test suite runner, the test scenarios are documented in BDD Gherkin format below to describe the expected system behaviors:

### Happy Path

#### Scenario: Successful user registration
* **Given** the user is on the registration page
* **When** they fill in all fields with valid data
* **And** solve the reCAPTCHA
* **And** click the "Criar Conta" button
* **Then** they should be redirected to the panel score page ("https://painel.frenet.com.br/Score")

---

### Field Validations

#### Scenario: Invalid email validation
* **Given** the user is on the registration page
* **When** they fill the email field with "invalid_email"
* **And** fill all other fields correctly
* **Then** the error message "Digite um e-mail válido." should be displayed below the email field
* **And** the "Criar Conta" button should remain disabled

#### Scenario: Mismatched passwords
* **Given** the user is on the registration page
* **When** they fill in the form data
* **But** type different passwords in the "Senha" and "Confirmar Senha" fields
* **Then** the error message "Senhas não conferem" should be displayed below the confirm password field
* **And** the "Criar Conta" button should remain disabled

#### Scenario: Incomplete name validation
* **Given** the user is on the registration page
* **When** they fill only the first name "John" in the "Nome Completo" field
* **And** fill all other fields correctly
* **Then** the error message "Digite seu nome completo." should be displayed below the name field
* **And** the "Criar Conta" button should remain disabled

#### Scenario: Empty password validation
* **Given** the user is on the registration page
* **When** they fill all fields except the password field
* **And** focus, type and delete a character on the password field
* **And** blur the password field
* **Then** the error message "Campo obrigatório." should be displayed below the password field
* **And** the "Criar Conta" button should remain disabled

#### Scenario: Empty confirm password validation
* **Given** the user is on the registration page
* **When** they fill all fields except the confirm password field
* **And** focus, type and delete a character on the confirm password field
* **And** blur the confirm password field
* **Then** the error message "Campo Obrigatório." should be displayed below the confirm password field
* **And** the "Criar Conta" button should remain disabled

---

## 🤝 Contribution Guidelines
For architectural guidelines, coding style standard naming conventions, and best practices on writing tests in this repository, please refer to the [Contributing & Best Practices Guide](./CONTRIBUTING.md)

