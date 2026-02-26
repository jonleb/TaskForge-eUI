import { Page } from '@playwright/test';

/**
 * Logs in via the UI login form.
 * Navigates to /login first, fills credentials, and waits for redirect.
 */
export async function login(page: Page, username: string, password = 'SecurePassword!123') {
    await page.goto('/login');
    await page.locator('#login-username').fill(username);
    await page.locator('#login-password').fill(password);
    await page.locator('button[type="submit"]').click();
    // Wait for navigation away from login
    await page.waitForURL('**/screen/**');
}
