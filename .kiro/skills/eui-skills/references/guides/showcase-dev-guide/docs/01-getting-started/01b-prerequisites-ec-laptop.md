# eUI – EC Laptop Setup Guide  
*Tested with Windows 11 · Node 20.17.0 · esbuild 0.25.5 · Yarn 1.22.22*


## STEP 1 - Install NodeJS 20.17.0

1. Open **Software Center** (`⊞ Win` → type *Software Center*).  
2. Search for **`node`** and choose **NodeJS 20.17.0a**.  
3. Click **Install** and wait until the status turns *Installed*.
4. Verify the install

    ```powershell
    node -v   # → v20.19.0
    npm  -v   # → 10.8.2
    ```
---

## STEP 2 - Configure npm’s global folders

Create two folders (replace **`%USERNAME%`** with your Windows login):

```
C:\Users\%USERNAME%\nodejs
C:\Users\%USERNAME%\nodejs\cache
```

Setup npm config (including proxy):
<LDAP-USERNAME> <LDAP-PASSWORD> = internet user and internet password 
<LOCATION> = lux for Luxemburg org bxl for Bruxelles location

```powershell
npm config set prefix "C:\Users\%USERNAME%\nodejs"
npm config set cache  "C:\Users\%USERNAME%\nodejs\cache"
npm config set proxy http://<LDAP-USERNAME>:<LDAP-PASSWORD>@http://<ldap-username>:<ldpad-password>@ps-<LOCATION>-usr.cec.eu.
int:8012
```

Open the environment variables > Path > Edit 
and add a new line with the value "C:\Users\%USERNAME%\nodejs"
Click on OK
Close your terminal and reopen a new one.

---

## STEP 3 - Install esbuild 0.25.5

1. Re‑open **Software Center**.  
2. Search **`esbuild`** and install **esbuild 0.25.5**.

---

## STEP 4 - Add the `ESBUILD_BINARY_PATH` environment variable

1. Press `⊞ Win`, type **Edit environment variables** and open **“Edit environment variables for your account”**.  
2. Click **New…** and add  

| Name | Value |
|------|-------|
| `ESBUILD_BINARY_PATH` | `C:\Program Files\Esbuild.0.25.5\esbuild.exe` |

### STEP 4a - Confirm the variable & version

| Shell | Command |
|-------|---------|
| PowerShell | `$Env:ESBUILD_BINARY_PATH` |
| cmd.exe    | `echo %ESBUILD_BINARY_PATH%` |

Both should print the full path. Then check the version:

```powershell
& "$Env:ESBUILD_BINARY_PATH" --version
```

```cmd
"%ESBUILD_BINARY_PATH%" --version
```

Expected output: **`0.25.5`**

---

## STEP 5 - Install the eUI CLI (v 19)

1. **Open a fresh terminal** (loads the new variable).  
2. Run:
    ```powershell
    npm install -g @eui/cli@latest
    ```
3. Verify:
    ```powershell
    eui-cli -v
    ```

💡 **Tip** Need an older CLI? **`npm install -g @eui/cli@18.2.12`**

---

## STEP 6 - Create a project skeleton

Create a folder, e.g.

```
C:\Users\%USERNAME%\projects\my-first-project
```

```powershell
cd C:\Users\%USERNAME%\projects\my-first-project
eui-cli
```

Follow the prompts:

1. Select **eUI Angular Desktop** → **Enter**  
2. *(Optional)* press **Space** to add **eUI ECL**, then **Enter**  
3. When asked **“Run Yarn install?”** type **`n`**

---

## STEP 7 - Update `package.json`

Edit the _package.json_ file in the root folder of your project:

```diff
   "dependencies": {
     "@eui/deps-base": "19.2.2"
   },
+  "devDependencies": {
+    "esbuild": "0.25.5"
+  },
   "resolutions": {
     "js-yaml": ">=3.13.1",
     "pdfjs-dist": "4.10.38",
     "tar": ">=6.2.1",
     "katex": ">=0.16.10",
     "follow-redirects": ">=1.15.4",
     "word-wrap": ">=1.2.4",
     "postcss": ">=8.4.31",
     "semver": ">=7.5.2",
     "express": "4.21.2",
     "path-to-regexp": "1.9.0",
+    "**/esbuild":    "0.25.5",
+    "**/@esbuild/*": "0.25.5",
+    /* Only on eUI 18 */ "rollup": "^4.17.4"
+    /* On eUI 17 and eUI 18  */ "undici": "6.21.3"
   }
```

On eUI 18, the package __rollup__ has to be updated.
Add __"rollup": "^4.17.4"__ under 
On eUI 17 and 18, the package __undici__ has to be updated.
Add __"undici": "6.21.3"__ under 

Save the file.

---

## STEP 8 - Install project dependencies

```powershell
yarn --ignore-scripts
```

The first run may take several minutes.

---

To run the application
```powershell
yarn start
```

---
---

## Helpdesk & Support

* **Teams:** *eUI* channel  
* **E‑mail:** DIGIT‑EUI‑SUPPORT@ec.europa.eu

Happy coding! 🎉
