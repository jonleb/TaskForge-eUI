# Manual Testing — Project Membership

## Prerequisites

- Start the application: `npm start` (frontend + mock server)
- Open the app at `http://localhost:4200`

---

## Scenario 1: SUPER_ADMIN — Create a user and add them to a project as DEVELOPER

**Login:** `superadmin` / `SecurePassword!123`

### Step 1 — Create a new user

1. Navigate to **Admin > Users** (`/screen/admin/users`)
2. Click **Create User** (top-right header button)
3. Fill in the dialog:
   - Username: `manual.tester`
   - First Name: `Manual`
   - Last Name: `Tester`
   - Email: `manual.tester@taskforge.local`
   - Role: `DEVELOPER`
4. Click **Create**
5. A temporary password dialog appears — copy the password

**Expected:**
- [ ] Success growl notification appears
- [ ] The user `manual.tester` appears in the users table
- [ ] Status shows "Active" (green chip)

### Step 2 — Verify the new user can log in

1. Log out (or open an incognito window)
2. Log in with `manual.tester` / (temporary password from Step 1)

**Expected:**
- [ ] Login succeeds, the home page is displayed
- [ ] The username `manual.tester` is visible in the top-right user profile area

### Step 3 — Add the new user to TaskForge Core as DEVELOPER

1. Log out and log back in as `superadmin` / `SecurePassword!123`
2. Navigate to **Projects** (`/screen/projects`)
3. Click on **TaskForge Core** (project TF)
4. Click **Members** in the sidebar
5. Click **Add Member** (top-right header button)
6. In the dialog, type `manual` in the search field
7. Select **Manual Tester — manual.tester@taskforge.local** from the candidate list
8. Select role: `DEVELOPER`
9. Click **Add**

**Expected:**
- [ ] Success growl notification appears
- [ ] The members table now shows **Manual Tester** with role `DEVELOPER`

### Step 4 — Verify the new member can access the project

1. Log out and log back in as `manual.tester` / (temporary password)
2. Navigate to **Projects** (`/screen/projects`)
3. Click on **TaskForge Core**

**Expected:**
- [ ] The project dashboard loads without error
- [ ] The sidebar shows the project name and navigation links
- [ ] Clicking **Members** shows the members list (including themselves)
- [ ] No "Add Member" button is visible (DEVELOPER is not a manager)
- [ ] No edit/remove action icons are visible in the table

### Cleanup

1. Log back in as `superadmin`
2. Go to **TaskForge Core > Members**
3. Click the trash icon next to **Manual Tester** and confirm removal
4. Optionally deactivate the user in **Admin > Users**

---

## Scenario 2: PRODUCT_OWNER — Add an existing user to 2 projects as DEVELOPER

**Login:** `superadmin` / `SecurePassword!123`

> The `productowner` user (id 3) has global role PRODUCT_OWNER but is only a PRODUCT_OWNER member on TaskForge Core (project 1). They cannot manage members on projects where they are not PROJECT_ADMIN or SUPER_ADMIN. This scenario uses `superadmin` to add the member, then verifies access with the added user.

### Step 1 — Identify the target user

- Target user: **Leo Lopez** (`leo.lopez` / `SecurePassword!123`, id 24, active, global role VIEWER)
- Leo is not currently a member of **TaskForge Core** (project 1) or **Demo Project** (project 2)

### Step 2 — Add Leo Lopez to TaskForge Core as DEVELOPER

1. Navigate to **Projects** (`/screen/projects`)
2. Click on **TaskForge Core**
3. Click **Members** in the sidebar
4. Click **Add Member**
5. Type `leo` in the search field
6. Select **Leo Lopez — leo.lopez@taskforge.local**
7. Select role: `DEVELOPER`
8. Click **Add**

**Expected:**
- [ ] Success growl notification appears
- [ ] Leo Lopez appears in the members table with role `DEVELOPER`

### Step 3 — Add Leo Lopez to Demo Project as DEVELOPER

1. Navigate back to **Projects** (`/screen/projects`)
2. Click on **Demo Project**
3. Click **Members** in the sidebar
4. Click **Add Member**
5. Type `leo` in the search field
6. Select **Leo Lopez — leo.lopez@taskforge.local**
7. Select role: `DEVELOPER`
8. Click **Add**

**Expected:**
- [ ] Success growl notification appears
- [ ] Leo Lopez appears in the members table with role `DEVELOPER`

### Step 4 — Verify Leo can access both projects

1. Log out and log in as `leo.lopez` / `SecurePassword!123`
2. Navigate to **Projects** (`/screen/projects`)
3. Click on **TaskForge Core**

**Expected:**
- [ ] Project dashboard loads successfully
- [ ] Members page shows Leo Lopez as DEVELOPER
- [ ] No management actions visible (DEVELOPER is not a manager)

4. Navigate back to **Projects** and click on **Demo Project**

**Expected:**
- [ ] Project dashboard loads successfully
- [ ] Members page shows Leo Lopez as DEVELOPER
- [ ] No management actions visible

### Cleanup

1. Log back in as `superadmin`
2. Go to **TaskForge Core > Members**, remove Leo Lopez (trash icon + confirm)
3. Go to **Demo Project > Members**, remove Leo Lopez (trash icon + confirm)
4. Verify Leo no longer appears in either members list

---

## Scenario 3: PROJECT_ADMIN — Add a member to TaskForge Core

**Login:** `projectadmin` / `SecurePassword!123`

> The user `projectadmin` (id 2) has global role PROJECT_ADMIN and is a PROJECT_ADMIN member on TaskForge Core (project 1). PROJECT_ADMIN can manage members (add, change role, remove) on projects where they hold that role.

### Step 1 — Log in and navigate to TaskForge Core members

1. Log in as `projectadmin` / `SecurePassword!123`
2. Navigate to **Projects** (`/screen/projects`)
3. Click on **TaskForge Core**
4. Click **Members** in the sidebar

**Expected:**
- [ ] The members table loads and displays the current members
- [ ] The **Add Member** button is visible in the page header
- [ ] Edit (pencil) and remove (trash) action icons are visible for each member row
- [ ] The "Actions" column is displayed

### Step 2 — Add Leo Lopez as DEVELOPER

1. Click **Add Member**
2. Type `leo` in the search field
3. Select **Leo Lopez — leo.lopez@taskforge.local** from the candidate list
4. Select role: `DEVELOPER`
5. Click **Add**

**Expected:**
- [ ] Success growl notification appears
- [ ] Leo Lopez appears in the members table with role `DEVELOPER`

### Step 3 — Verify Leo can access the project

1. Log out and log in as `leo.lopez` / `SecurePassword!123`
2. Navigate to **Projects** (`/screen/projects`)
3. Click on **TaskForge Core**
4. Click **Members** in the sidebar

**Expected:**
- [ ] The project dashboard loads without error
- [ ] The members list shows Leo Lopez as DEVELOPER
- [ ] No "Add Member" button is visible (DEVELOPER is not a manager)
- [ ] No edit/remove action icons are visible

### Cleanup

1. Log back in as `projectadmin`
2. Go to **TaskForge Core > Members**
3. Click the trash icon next to **Leo Lopez** and confirm removal
4. Verify Leo Lopez no longer appears in the members list
