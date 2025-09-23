import { test, expect } from '@playwright/test';

// Simple smoke test: navigate to home and ensure a loading spinner appears during initial load
test('spinner shows on initial data load and then hides', async ({ page }) => {
  await page.goto('/');
  // The app shows a text 'Loading vehicles...' while fetching; check for that text
  await expect(page.locator('text=Loading vehicles')).toBeVisible();
  // Wait for the main vehicle heading to appear after mock API returns
  await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
  // Ensure spinner overlay is not visible after load
  await expect(page.locator('.loading-overlay')).toHaveCount(0);
});
