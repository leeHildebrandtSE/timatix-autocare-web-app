Playwright E2E smoke test

Prerequisites

- Node.js and npm installed
- The dev server running locally: `npm run dev` (the app uses port 5174 if 5173 is busy)

Install and run

```bash
npm install --save-dev @playwright/test
npx playwright install --with-deps
npx playwright test
```

What the test does

- Navigates to `/`
- Checks the initial loading text/spinner is visible
- Waits for the main heading to appear
- Ensures the loading overlay is gone after data load
