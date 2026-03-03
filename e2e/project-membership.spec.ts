import { test, expect } from '@playwright/test';
import { login } from './helpers/auth';

// eui-dialog renders in CDK overlay — use these selectors
const DIALOG = '[role="dialog"]';
const DISMISS_BTN = '.eui-dialog__footer-dismiss-button';

// Project 1 = "TaskForge Core", members page URL
const MEMBERS_URL = '/screen/projects/1/members';

/** Login via API and return auth headers. Retries on empty response. */
async function apiLogin(request: import('@playwright/test').APIRequestContext, username = 'superadmin') {
    for (let attempt = 0; attempt < 3; attempt++) {
        const res = await request.post('/api/auth/login', {
            data: { username, password: 'SecurePassword!123' },
        });
        if (res.status() === 200) {
            const text = await res.text();
            if (text) {
                const body = JSON.parse(text);
                if (body.accessToken) {
                    return { accessToken: body.accessToken, headers: { Authorization: `Bearer ${body.accessToken}` } };
                }
            }
        }
        // Brief pause before retry
        await new Promise(r => setTimeout(r, 300));
    }
    throw new Error(`API login failed for ${username}`);
}

async function clearSession(page: import('@playwright/test').Page) {
    await page.context().clearCookies();
    await page.goto('/');
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
}

/** Navigate to members page after login */
async function goToMembers(page: import('@playwright/test').Page, username: string) {
    await login(page, username);
    await page.goto(MEMBERS_URL);
    // Wait for either the table data or the noData row to appear
    await page.waitForSelector('td[data-col-label="Name"], td.eui-u-text-center', { timeout: 10000 });
}

// ─── Members Page (STORY-003) ───────────────────────────────────────────────

test.describe('Members page — table and permissions', () => {

    test.beforeEach(async ({ page }) => { await clearSession(page); });

    test('SUPER_ADMIN sees members table with data', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        const rows = page.locator('td[data-col-label="Name"]');
        await expect(rows.first()).toBeVisible();
        const count = await rows.count();
        expect(count).toBeGreaterThanOrEqual(1);
    });

    test('SUPER_ADMIN sees "Add Member" button and action icons', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        const addBtn = page.locator('button', { hasText: 'Add Member' });
        await expect(addBtn).toBeVisible();

        const editBtns = page.locator('eui-icon-button[icon="eui-edit"]');
        await expect(editBtns.first()).toBeVisible();

        const trashBtns = page.locator('eui-icon-button[icon="eui-trash"]');
        await expect(trashBtns.first()).toBeVisible();
    });

    test('non-manager does not see "Add Member" button or action icons', async ({ page }) => {
        // developer (id 4) is DEVELOPER on project 1 — not a manager
        await goToMembers(page, 'developer');

        const addBtn = page.locator('button', { hasText: 'Add Member' });
        await expect(addBtn).toHaveCount(0);

        const editBtns = page.locator('eui-icon-button[icon="eui-edit"]');
        await expect(editBtns).toHaveCount(0);
    });

    test('table has accessible markup', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        const table = page.locator('table[aria-label="Project members"]');
        await expect(table).toBeVisible();

        const scopeCols = page.locator('th[scope="col"]');
        const count = await scopeCols.count();
        expect(count).toBeGreaterThanOrEqual(3);
    });

    test('sidebar shows "Members" link', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        // eui-app-sidebar-menu renders items as anchor tags
        const membersLink = page.locator('eui-app-sidebar a', { hasText: 'Members' });
        await expect(membersLink).toBeVisible();
    });
});

// ─── Change Role Dialog (STORY-005) ─────────────────────────────────────────

test.describe('Change role dialog', () => {

    test('dismiss closes change role dialog without changes', async ({ page }) => {
        await clearSession(page);
        await goToMembers(page, 'superadmin');

        const editBtn = page.locator('eui-icon-button[icon="eui-edit"]').first();
        await editBtn.click();
        await page.waitForSelector(DIALOG);

        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });
    });

    test('SUPER_ADMIN can open change role dialog and see role select', async ({ page }) => {
        await clearSession(page);
        await goToMembers(page, 'superadmin');

        const editBtn = page.locator('eui-icon-button[icon="eui-edit"]').first();
        await editBtn.click();
        await page.waitForSelector(DIALOG);

        const roleSelect = page.locator(`${DIALOG} select`);
        await expect(roleSelect).toBeVisible();

        // Verify all 5 roles are available
        const options = page.locator(`${DIALOG} select option`);
        await expect(options).toHaveCount(5);

        // Dismiss without saving
        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });
    });
});

// ─── Remove Member Dialog (STORY-006) ───────────────────────────────────────

test.describe('Remove member dialog', () => {

    test.beforeEach(async ({ page }) => { await clearSession(page); });

    test('remove dialog shows confirmation message', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        const trashBtn = page.locator('eui-icon-button[icon="eui-trash"]').first();
        await trashBtn.click();
        await page.waitForSelector(DIALOG);

        const dialogContent = page.locator(DIALOG);
        await expect(dialogContent).toContainText('Are you sure you want to remove');
        await expect(dialogContent).toContainText('revoke their access');
    });

    test('dismiss closes remove dialog without action', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        const trashBtn = page.locator('eui-icon-button[icon="eui-trash"]').first();
        await trashBtn.click();
        await page.waitForSelector(DIALOG);

        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });
    });
});

// ─── Add Member Dialog (STORY-004) ──────────────────────────────────────────

test.describe('Add member dialog', () => {

    test.beforeEach(async ({ page }) => { await clearSession(page); });

    test('opens add dialog with search input', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        await page.locator('button', { hasText: 'Add Member' }).click();
        await page.waitForSelector(DIALOG);

        const searchInput = page.locator(`${DIALOG} input[id="candidateSearchInput"]`);
        await expect(searchInput).toBeVisible();
    });

    test('candidate search returns results for valid query', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        await page.locator('button', { hasText: 'Add Member' }).click();
        await page.waitForSelector(DIALOG);

        const searchInput = page.locator(`${DIALOG} input[id="candidateSearchInput"]`);
        await searchInput.fill('leo');

        // Wait for candidate results to appear
        const candidateItem = page.locator(`${DIALOG} li`).first();
        await expect(candidateItem).toBeVisible({ timeout: 5000 });
        await expect(candidateItem).toContainText('Leo');
    });

    test('dismiss closes add dialog', async ({ page }) => {
        await goToMembers(page, 'superadmin');

        await page.locator('button', { hasText: 'Add Member' }).click();
        await page.waitForSelector(DIALOG);

        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });
    });
});

// ─── Scenario 3: PROJECT_ADMIN manager access (BUG-001 regression) ──────────

test.describe('PROJECT_ADMIN manager access (BUG-001)', () => {

    test('PROJECT_ADMIN sees Add Member button and action icons', async ({ page }) => {
        // projectadmin (id 2) is PROJECT_ADMIN on project 1
        await clearSession(page);
        await goToMembers(page, 'projectadmin');

        const addBtn = page.locator('button', { hasText: 'Add Member' });
        await expect(addBtn).toBeVisible();

        const editBtns = page.locator('eui-icon-button[icon="eui-edit"]');
        await expect(editBtns.first()).toBeVisible();

        const trashBtns = page.locator('eui-icon-button[icon="eui-trash"]');
        await expect(trashBtns.first()).toBeVisible();
    });

    test('PROJECT_ADMIN can open add member dialog and search candidates', async ({ page }) => {
        await clearSession(page);
        await goToMembers(page, 'projectadmin');

        await page.locator('button', { hasText: 'Add Member' }).click();
        await page.waitForSelector(DIALOG);

        const searchInput = page.locator(`${DIALOG} input[id="candidateSearchInput"]`);
        await expect(searchInput).toBeVisible();

        await searchInput.fill('leo');
        const candidateItem = page.locator(`${DIALOG} li`).first();
        await expect(candidateItem).toBeVisible({ timeout: 5000 });
        await expect(candidateItem).toContainText('Leo');

        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });
    });

    test('PROJECT_ADMIN can open change role dialog', async ({ page }) => {
        await clearSession(page);
        await goToMembers(page, 'projectadmin');

        const editBtn = page.locator('eui-icon-button[icon="eui-edit"]').first();
        await editBtn.click();
        await page.waitForSelector(DIALOG);

        const roleSelect = page.locator(`${DIALOG} select`);
        await expect(roleSelect).toBeVisible();

        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });
    });

    test('PROJECT_ADMIN can open remove member dialog', async ({ page }) => {
        await clearSession(page);
        await goToMembers(page, 'projectadmin');

        const trashBtn = page.locator('eui-icon-button[icon="eui-trash"]').first();
        await trashBtn.click();
        await page.waitForSelector(DIALOG);

        const dialogContent = page.locator(DIALOG);
        await expect(dialogContent).toContainText('Are you sure you want to remove');

        await page.locator(DISMISS_BTN).click();
        await page.waitForSelector(DIALOG, { state: 'hidden' });
    });
});

// ─── Scenario 2: DEVELOPER sees no management UI (uses page + request) ──────

test.describe('DEVELOPER member access after being added', () => {

    test('DEVELOPER member sees no management UI after being added', async ({ page, request }) => {
        // Setup: add Leo as DEVELOPER via API
        const { headers } = await apiLogin(request);

        await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '24', role: 'DEVELOPER' },
        });

        // Wait for json-server to finish writing DB before browser login
        await page.waitForTimeout(1000);

        // Log in as Leo via UI — retry once if mock server is still busy
        await clearSession(page);
        for (let attempt = 0; attempt < 2; attempt++) {
            await page.goto('/login');
            await page.locator('#login-username').fill('leo.lopez');
            await page.locator('#login-password').fill('SecurePassword!123');
            await page.locator('button[type="submit"]').click();
            try {
                await page.waitForURL('**/screen/**', { timeout: 10000 });
                break;
            } catch {
                if (attempt === 1) throw new Error('leo.lopez login failed after retry');
                await page.waitForTimeout(500);
            }
        }

        await page.goto(MEMBERS_URL);
        await page.waitForSelector('td[data-col-label="Name"], td.eui-u-text-center', { timeout: 10000 });

        const addBtn = page.locator('button', { hasText: 'Add Member' });
        await expect(addBtn).toHaveCount(0);

        const editBtns = page.locator('eui-icon-button[icon="eui-edit"]');
        await expect(editBtns).toHaveCount(0);

        // Cleanup
        await request.delete('/api/projects/1/members/24', { headers });
    });
});

// ─── Backend API tests (STORY-001) ──────────────────────────────────────────
// NOTE: API-only tests are placed LAST because the `request` fixture
// does not use the browser page, which can leave the page context stale
// for subsequent UI tests.

test.describe('Membership API endpoints', () => {

    // json-server can return 500 when requests arrive while DB is being written.
    // A brief pause between tests prevents write contention.
    test.beforeEach(async () => {
        await new Promise(r => setTimeout(r, 200));
    });

    test('PUT upsert adds a new member (201)', async ({ request }) => {
        const { headers } = await apiLogin(request);

        const res = await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '24', role: 'REPORTER' },
        });

        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.role).toBe('REPORTER');
        expect(body.firstName).toBe('Leo');

        // Cleanup: remove the member we just added
        await request.delete('/api/projects/1/members/24', { headers });
    });

    test('PUT upsert updates existing member role (200)', async ({ request }) => {
        const { headers } = await apiLogin(request);

        // developer (id 4) is DEVELOPER on project 1 — change to REPORTER
        const res = await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '4', role: 'REPORTER' },
        });

        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.role).toBe('REPORTER');

        // Restore original role
        await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '4', role: 'DEVELOPER' },
        });
    });

    test('PUT returns 403 for non-manager', async ({ request }) => {
        const { headers } = await apiLogin(request, 'developer');

        const res = await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '24', role: 'DEVELOPER' },
        });

        expect(res.status()).toBe(403);
    });

    test('DELETE removes a member (204)', async ({ request }) => {
        const { headers } = await apiLogin(request);

        // First add a member to remove
        await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '24', role: 'VIEWER' },
        });

        const res = await request.delete('/api/projects/1/members/24', { headers });

        expect(res.status()).toBe(204);
    });

    test('DELETE returns 404 for non-existent membership', async ({ request }) => {
        const { headers } = await apiLogin(request);

        const res = await request.delete('/api/projects/1/members/999', { headers });

        expect(res.status()).toBe(404);
    });

    test('GET candidates returns non-member users matching query', async ({ request }) => {
        const { headers } = await apiLogin(request);

        const res = await request.get('/api/projects/1/members/candidates?q=leo', { headers });

        expect(res.status()).toBe(200);
        const body = await res.json();
        expect(body.length).toBeGreaterThanOrEqual(1);
        expect(body.some((c: { firstName: string }) => c.firstName === 'Leo')).toBe(true);
    });

    test('GET candidates returns 403 for non-manager', async ({ request }) => {
        const { headers } = await apiLogin(request, 'developer');

        const res = await request.get('/api/projects/1/members/candidates?q=leo', { headers });

        expect(res.status()).toBe(403);
    });
});

// ─── Scenario 2: Add member to multiple projects via API ────────────────────

test.describe('Add member to multiple projects (Scenario 2)', () => {

    test.beforeEach(async () => {
        await new Promise(r => setTimeout(r, 200));
    });

    test('SUPER_ADMIN can add same user to two projects as DEVELOPER', async ({ request }) => {
        const { headers } = await apiLogin(request);

        // Add Leo Lopez (id 24) to project 1 (TaskForge Core)
        const res1 = await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '24', role: 'DEVELOPER' },
        });
        expect(res1.status()).toBe(201);
        const body1 = await res1.json();
        expect(body1.role).toBe('DEVELOPER');
        expect(body1.firstName).toBe('Leo');

        // Add Leo Lopez (id 24) to project 2 (Demo Project)
        const res2 = await request.put('/api/projects/2/members', {
            headers,
            data: { userId: '24', role: 'DEVELOPER' },
        });
        expect(res2.status()).toBe(201);
        const body2 = await res2.json();
        expect(body2.role).toBe('DEVELOPER');
        expect(body2.firstName).toBe('Leo');

        // Verify Leo appears in both member lists
        const members1 = await request.get('/api/projects/1/members', { headers });
        const list1 = await members1.json();
        expect(list1.some((m: { userId: string }) => m.userId === '24')).toBe(true);

        const members2 = await request.get('/api/projects/2/members', { headers });
        const list2 = await members2.json();
        expect(list2.some((m: { userId: string }) => m.userId === '24')).toBe(true);

        // Cleanup
        await request.delete('/api/projects/1/members/24', { headers });
        await request.delete('/api/projects/2/members/24', { headers });
    });

    test('PROJECT_ADMIN can add member via API', async ({ request }) => {
        const { headers } = await apiLogin(request, 'projectadmin');

        const res = await request.put('/api/projects/1/members', {
            headers,
            data: { userId: '24', role: 'DEVELOPER' },
        });
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.role).toBe('DEVELOPER');
        expect(body.firstName).toBe('Leo');

        // Cleanup
        await request.delete('/api/projects/1/members/24', { headers });
    });
});
