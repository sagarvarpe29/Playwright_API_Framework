# Playwright API Framework

A TypeScript-based API test automation framework built with Playwright, following a layered architecture that keeps tests clean, readable, and easy to maintain.

---

## Project Structure

```
Playwright_API_Framework/
├── .env                        # Environment variables (URLs, credentials, API key)
├── playwright.config.ts        # Playwright config — projects, reporter, global headers
├── tsconfig.json               # TypeScript config with path aliases
│
├── src/
│   └── clients/
│       └── baseApiClient.ts    # HTTP layer — wraps Playwright's APIRequestContext
│
├── src/services/
│   ├── authService.ts          # Auth endpoints (login, register)
│   ├── userService.ts          # User CRUD endpoints
│   └── resourceService.ts      # Resource CRUD endpoints
│
├── fixtures/
│   └── apiFixtures.ts          # Injects services into tests via Playwright fixtures
│
├── test-data/
│   ├── authData.ts             # Login / register payloads
│   ├── userData.ts             # User create / update payloads
│   └── resourceData.ts         # Resource create / update payloads
│
└── tests/
    ├── auth.spec.ts            # Auth flow tests
    ├── users.spec.ts           # User API tests
    └── resources.spec.ts       # Resource API tests
```

---

## Architecture & Flow

The framework is split into four layers. Each layer has a single responsibility.

```
tests/*.spec.ts
    ↓  imports services via
fixtures/apiFixtures.ts
    ↓  services extend
src/clients/baseApiClient.ts
    ↓  calls
Playwright APIRequestContext  →  https://reqres.in
```

### Layer 1 — HTTP Client (`baseApiClient.ts`)

The lowest layer. Wraps Playwright's `APIRequestContext` into five reusable methods: `get`, `post`, `put`, `patch`, `delete`. No business logic, no assertions — just raw HTTP calls that return `APIResponse`.

### Layer 2 — Services (`src/services/`)

Each service class extends `BaseApiClient` and adds domain knowledge — the right method, path, and parameters for each API operation. Tests never write a URL directly.

| Service | Base path | Methods |
|---|---|---|
| `AuthService` | `/api/` | `login`, `register` |
| `UserService` | `/api/users` | `getUsers`, `getUserById`, `createUser`, `updateUser`, `patchUser`, `deleteUser` |
| `ResourceService` | `/api/unknown` | `getResources`, `getResourceById`, `createResource`, `updateResource`, `patchResource`, `deleteResource` |

### Layer 3 — Fixtures (`fixtures/apiFixtures.ts`)

Extends Playwright's base `test` to inject instantiated services. Playwright creates a fresh `APIRequestContext` per test (with the `baseURL` and headers from config), wraps it in the service class, and tears it down after the test.

```typescript
export const test = base.extend<ApiFixtures>({
    authService:     async ({ request }, use) => { await use(new AuthService(request)); },
    userService:     async ({ request }, use) => { await use(new UserService(request)); },
    resourceService: async ({ request }, use) => { await use(new ResourceService(request)); },
});
```

### Layer 4 — Tests (`tests/`)

Tests are thin — only assertions and orchestration. They receive services as injected parameters and pull payloads from `test-data/`.

```typescript
test('create user', async ({ userService }) => {
    const response = await userService.createUser(userData.createOrUpdate);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeDefined();
});
```

---

## Configuration

### Environment Variables (`.env`)

| Variable | Purpose |
|---|---|
| `BASE_URL` | Default API base URL |
| `DEV_URL` / `STAGING_URL` / `PROD_URL` | Environment-specific base URLs |
| `API_KEY` | Sent as `x-api-key` header on every request |
| `USERNAME` / `PASSWORD` | Credentials used in auth tests |

### Global Headers (`playwright.config.ts`)

These headers are automatically attached to every API request:

```typescript
extraHTTPHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY || ''
}
```

### Multi-Environment Projects

Three projects are defined in `playwright.config.ts` — each runs the full test suite against a different base URL:

| Project | URL variable |
|---|---|
| `dev` | `DEV_URL` |
| `staging` | `STAGING_URL` |
| `prod` | `PROD_URL` |

---

## Prerequisites

- Node.js >= 18
- npm >= 9

---

## Setup

```bash
# Clone the repo
git clone <repo-url>
cd Playwright_API_Framework

# Install dependencies
npm install
```

---

## Running Tests

```bash
# Run all tests (all projects)
npm test

# Run against a specific environment
npm run test:dev
npm run test:staging
npm run test:prod
```

---

## Allure Reports

Raw results are written to `allure-results/` after every test run.

```bash
# Generate and open the HTML report
npm run allure:report

# Or separately
npm run allure:generate   # builds the report into allure-report/
npm run allure:open       # opens it in the browser
```

---

## Path Aliases

Configured in `tsconfig.json` — avoids long relative imports:

| Alias | Resolves to |
|---|---|
| `@clients/*` | `./src/clients/*` |
| `@services/*` | `./src/services/*` |
| `@fixtures/*` | `./fixtures/*` |
| `@test-data/*` | `./test-data/*` |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | API request context + test runner |
| TypeScript | Type safety across all layers |
| [Allure](https://allurereport.org/) | HTML test reporting |
| dotenv | Environment variable management |
