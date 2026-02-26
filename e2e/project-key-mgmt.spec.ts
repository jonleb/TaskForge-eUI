import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

// eui-dialog renders in CDK overlay — use these selectors for dialog buttons
const DIALOG = '[role="dialog"]';
const ACCEPT_BTN = '.eui-dialog__footer-accept-button';
const DISMISS_BTN = '.eui-dialog__footer-dismiss-button';

/** Clear browser session to avoid stale auth state */
async function clearSession(page: import('@playwright/test').Page) {
    await page.context().clearCookies();
    await page.goto('/');
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
}

test.describe('STORY-001/002: Create Project (backend + service)', () => {

    test.beforeEach(async ({ page }) => { await clearSession(page); });

    test('SUPER_ADMIN can create a project with manual key', async ({ page }) => {
        await login(page, 'superadmin');
        await page.goto('/screen/projects');

        await page.locator('button', { hasText: 'Create Project' }).click();
        await page.waitForSelector(DIALOG);

        await page.locator('#cp-name').fill('E2E Test Project');
        await page.locator('#cp-key').fill('E2ETEST');
        await page.locator('#cp-description').fill('Created by Playwright');

        await page.locator(ACCEPT_BTN).click();
        await page.waitForURL('**/screen/projects/**');

        expect(page.url()).toMatch(/\/screen\/projects\/\d+/);
    });

    test('SUPER_ADMIN can create a project with auto-generated key', async ({ page }) => {
        await login(page, 'superadmin');
        await page.goto('/screen/projects');

        await page.locator('button', { hasText: 'Create Project' }).click();
        await page.waitForSelector(DIALOG);

        await page.locator('#cp-name').fill('Auto Key Project');
        await page.locator(ACCEPT_BTN).click();
        await page.waitForURL('**/screen/projects/**');

        expect(page.url()).toMatch(/\/screen\/projects\/\d+/);
    });

    test('duplicate name shows inline 409 error', async ({ page }) => {
        await login(page, 'superadmin');
        await page.goto('/screen/projects');

        await page.locator('button', { hasText: 'Create Project' }).click();
        await page.waitForSelector(DIALOG);

        await page.locator('#cp-name').fill('Demo Project');
        await page.locator(ACCEPT_BTN).click();

        // Inline error should appear inside the dialog
        const errorMsg = page.locator(`${DIALOG} eui-feedback-message`);
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('already exists');
    });
});

test.describe('STORY-003/004: Create Project Dialog & Portfolio Button', () => {

    test.beforeEach(async ({ page }) => { await clearSession(page); });

    test('"Create Project" button is visible for SUPER_ADMIN', async ({ page }) => {
        await login(page, 'superadmin');
        await page.goto('/screen/projects');

        const createBtn = page.locator('button', { hasText: 'Create Project' });
        await expect(createBtn).toBeVisible();
    });

    test('"Create Project" button is hidden for non-SUPER_ADMIN', async ({ page }) => {
        await login(page, 'developer');
        await page.goto('/screen/projects');

        await page.waitForSelector('table');
        const createBtn = page.locator('button', { hasText: 'Create Project' });
        await expect(createBtn).toHaveCount(0);
    });

    test('form validates required name field', async ({ page }) => {
        await login(page, 'superadmin');
        await page.goto('/screen/projects');

        await page.locator('button', { hasText: 'Create Project' }).click();
        await page.waitForSelector(DIALOG);

        // Submit with empty name
        await page.locator(ACCEPT_BTN).click();

        // Name error should appear
        const nameErr = page.locator('#cp-name-err');
        await expect(nameErr).toBeVisible();
        await expect(nameErr).toContainText('required');
    });

    test('key field auto-uppercases input', async ({ page }) => {
        await login(page, 'superadmin');
        await page.goto('/screen/projects');

        await page.locator('button', { hasText: 'Create Project' }).click();
        await page.waitForSelector(DIALOG);

        const keyInput = page.locator('#cp-key');
        // Type character by character to trigger the input event handler
        await keyInput.pressSequentially('abc');
        await expect(keyInput).toHaveValue('ABC');
    });

    test('dialog dismiss resets form', async ({ page }) => {
        await login(page, 'superadmin');
        await page.goto('/screen/projects');

        await page.locator('button', { hasText: 'Create Project' }).click();
        await page.waitForSelector(DIALOG);

        await page.locator('#cp-name').fill('Some Name');

        // Dismiss
        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });

        // Re-open and check fields are empty
        await page.locator('button', { hasText: 'Create Project' }).click();
        await page.waitForSelector(DIALOG);
        await expect(page.locator('#cp-name')).toHaveValue('');
    });
});

test.describe('STORY-005: Key Immutability on Update (backend)', () => {

    test('PATCH rejects key change with 400', async ({ request }) => {
        const loginRes = await request.post('/api/auth/login', {
            data: { username: 'superadmin', password: 'SecurePassword!123' },
        });
        const { accessToken } = await loginRes.json();

        const res = await request.patch('/api/projects/1', {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { key: 'CHANGED' },
        });

        expect(res.status()).toBe(400);
        const body = await res.json();
        expect(body.message).toBe('Project key cannot be changed');
    });

    test('PATCH allows name and description update', async ({ request }) => {
        const loginRes = await request.post('/api/auth/login', {
            data: { username: 'superadmin', password: 'SecurePassword!123' },
        });
        const { accessToken } = await loginRes.json();

        const res = await request.patch('/api/projects/2', {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { name: 'Demo Project Updated', description: 'Updated via e2e' },
        });

        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.name).toBe('Demo Project Updated');
        expect(body.description).toBe('Updated via e2e');
        expect(body.key).toBe('DEMO');
    });

    test('PATCH accepts same key without error', async ({ request }) => {
        const loginRes = await request.post('/api/auth/login', {
            data: { username: 'superadmin', password: 'SecurePassword!123' },
        });
        const loginBody = await loginRes.json();
        const accessToken = loginBody.accessToken;

        const res = await request.patch('/api/projects/2', {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { key: 'DEMO' },
        });

        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.key).toBe('DEMO');
    });

    test('PATCH returns 403 for non-SUPER_ADMIN', async ({ request }) => {
        const loginRes = await request.post('/api/auth/login', {
            data: { username: 'developer', password: 'SecurePassword!123' },
        });
        const { accessToken } = await loginRes.json();

        const res = await request.patch('/api/projects/1', {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { name: 'Hacked' },
        });

        expect(res.status()).toBe(403);
    });

    test('PATCH returns 404 for non-existent project', async ({ request }) => {
        const loginRes = await request.post('/api/auth/login', {
            data: { username: 'superadmin', password: 'SecurePassword!123' },
        });
        const { accessToken } = await loginRes.json();

        const res = await request.patch('/api/projects/999', {
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { name: 'Ghost' },
        });

        expect(res.status()).toBe(404);
    });
});
