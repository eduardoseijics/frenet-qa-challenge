# Contributing & Test Automation Best Practices

This document outlines the contribution guidelines, test automation architecture patterns, and best practices implemented in this Playwright test suite.

---

## 1. Coding Style & Naming Conventions

To maintain consistency and readability across the test suite, we adhere to the following naming conventions:

- **Class Names**: Use `UpperCamelCase` (PascalCase).
  - *Example*: `RegisterPage`, `LoginPage`.
- **File Names**: Use `lower-kebab-case`.
  - *Example*: `happy-path.spec.ts`, `data-generator.ts`, `register.page.ts`.
- **Method, Variable & Locator Properties**: Use `camelCase` (lowerCamelCase) for all methods, variables, and locator property names.
  - *Example*: `fillForm`, `registerPage`, `cellphoneInput`, `nameErrorMsg` (representing `#Name_msg`).
- **File Size**: Keep files small, focused, and cohesive. Avoid bloated files by splitting logic, page objects, or test suites into dedicated files when they grow too large.

---

## 2. Locator Strategy

Locators should follow this priority order:

1. `data-testid` attribute (e.g., `page.getByTestId('submit')`)
2. `id` attribute (e.g., `page.locator('#btnSubmit')`)
3. CSS class or other selectors (last resort)

---

## 3. Page Object Model (POM)
- **Principle**: Separate test logic from page-specific elements and interaction details.
- **Implementation**: 
  - All locators and raw interaction methods (like filling fields, clicking buttons) are encapsulated within page classes (e.g., `RegisterPage`).
  - Spec files only call high-level page methods and perform assertions.
- **Benefit**: If page layout changes (e.g., an input ID changes), you only update the selector in one place (the Page Object class) rather than in dozens of test specs.

---

## 4. Custom Playwright Fixtures
- **Principle**: Centralize and automate Page Object instantiation to keep test files DRY (Don't Repeat Yourself).
- **Implementation**:
  - Defined custom fixtures in `tests/fixtures/base-test.ts` to extend the standard Playwright `test` object.
  - Page objects (like `registerPage`) are passed directly as arguments to test functions.
- **Benefit**: Removes the boilerplate `const registerPage = new RegisterPage(page)` instantiation inside every test block. It also allows scaling to multiple pages easily by nesting/merging fixtures modularly via Playwright's `mergeTests`.

---

## 5. Configuration Over Hardcoding
- **Principle**: Keep configurations separate from code to allow running tests across multiple environments seamlessly.
- **Implementation**:
  - Configured `baseURL: process.env.BASE_URL || 'https://cadastro.frenet.com.br'` in `playwright.config.ts`.
  - Replaced full URLs in Page Object methods with relative path routing: `await this.page.goto('/')`.
- **Benefit**: Ensures tests can be executed on staging, sandbox, or production environments simply by changing the configuration or passing environment variables, without editing code.

---

## 6. Automatic Test Evidence (Screenshots and Traces)
- **Principle**: Avoid cluttering test code with manual reporting/screenshot actions; let the framework handle evidence collection.
- **Implementation**:
  - Configured `screenshot: 'only-on-failure'` and `trace: 'retain-on-failure'` in the global config file.
  - Removed manual `page.screenshot(...)` calls from spec files.
- **Benefit**: Keeps tests clean and readable while ensuring screenshots are captured and traces are preserved automatically whenever a test fails.

---

## 7. Dynamic & Robust Data Generation
- **Principle**: Use randomized, valid mock data rather than static hardcoded inputs to prevent testing collisions and flaky tests.
- **Implementation**:
  - Implemented dynamic generation in `data-generator.ts` using the `faker-br` library.
  - Cellphone numbers are generated using raw digit formats (`faker.phone.phoneNumber('##9########')`) instead of complex manual calculations.
- **Benefit**: Eliminates validation failures caused by using duplicate records in successive test runs. Using clean digit format prevents input mask issues in HTML fields.

---

## 8. Granular Test Separation
- **Principle**: Group test files logically, keeping positive paths separate from validation/negative tests to avoid oversized files.
- **Implementation**:
  - Separated tests into folders: `tests/register/happy-path.spec.ts` and `tests/register/field-validation.spec.ts`.
- **Benefit**: Leads to smaller, highly cohesive test files that are significantly easier to read, debug, and maintain.

---

## 9. Self-Documenting Code
- **Principle**: Code should be readable and clean. Comments should only exist to document non-obvious business/technical logic, not to explain standard syntax.
- **Implementation**:
  - Removed step-by-step explanatory comments (e.g. `// 1. Click button`).
  - Kept only essential context-specific notes (such as the reCAPTCHA bypass skip warning).
- **Benefit**: Avoids code clutter and reduces maintenance overhead when code changes.

---

## 10. Test Tagging

All test cases should include appropriate `@tags` at the end of their title strings to enable selective test execution using Playwright's `--grep` command option.

### Guidelines
- Always use camelCase for tags.
- Combine a category tag (e.g., `@happyPath`, `@validation`) with domain or field-specific tags (e.g., `@email`, `@password`, `@smoke`).

### Standard Tags
- `@happyPath`: Denotes the primary successful workflow.
- `@validation`: Denotes validation checks, error boundaries, or invalid inputs.
- `@smoke`: Denotes highly critical scenarios used to quickly verify system health.
- `@email`: Identifies test scenarios validating the email field.
- `@password`: Identifies test scenarios validating the password and confirm password fields.
- `@name`: Identifies test scenarios validating the name field.
- `@phone`: Identifies test scenarios validating the cellphone field.

### Example
```typescript
test('Should display error for empty password @validation @password', async ({ registerPage }) => {
  // ...
});
```
