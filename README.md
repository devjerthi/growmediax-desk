# GrowMediaX Desk — setup guide

Your own installable app with the GrowMediaX icon on your phone's home screen.
Login is with your Google account (devjerthi@gmail.com). Data lives in your own Firebase database (Google Cloud). Everything used here is free.

Time needed: about 20 minutes, once. Do it on a laptop.

---

## Step 1 — Create your Firebase database (Google)

1. Go to https://console.firebase.google.com and sign in with **devjerthi@gmail.com**.
2. Click **Create a project** (or Add project). Name: `growmediax-desk`. Turn **off** Google Analytics. Click **Create project**.
3. **Turn on Google login**
   - Left menu: **Build → Authentication → Get started**.
   - Tab **Sign-in method** → click **Google** → switch **Enable** on → choose your email as support email → **Save**.
4. **Create the database**
   - Left menu: **Build → Firestore Database → Create database**.
   - Location: **asia-south1 (Mumbai)**. Mode: **Start in production mode**. Click **Create**.
5. **Lock the database to your email only**
   - In Firestore, open the **Rules** tab.
   - Delete everything there, paste the full contents of `firestore.rules` from this folder, click **Publish**.
6. **Get your app settings**
   - Click the gear icon (top left) → **Project settings**.
   - Under **Your apps**, click the **</>** (Web) icon. Nickname: `growmediax-desk`. Do **not** tick Firebase Hosting. Click **Register app**.
   - You will see a block `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`. Keep this page open; you need these values in Step 2.

## Step 2 — Put the app online (GitHub Pages)

1. Go to https://github.com and sign in (or create a free account).
2. Click **+** (top right) → **New repository**. Name: `growmediax-desk`. Choose **Public**. Click **Create repository**.
3. On the next page click **uploading an existing file**. Drag in **everything inside this folder** (index.html, config.js, manifest.webmanifest, sw.js, firestore.rules, README.md and the **icons** folder). Click **Commit changes**.
4. **Add your settings**: in the repository click `config.js` → pencil icon (Edit). Replace each `PASTE_...` value with the matching value from Firebase Step 1.6. Keep the quotes. Click **Commit changes**.
5. **Turn on the website**: repository **Settings → Pages**. Under **Build and deployment**, Source: **Deploy from a branch**, Branch: **main**, folder **/(root)** → **Save**.
6. After 1–2 minutes the page shows your app address, like:
   `https://YOUR-GITHUB-NAME.github.io/growmediax-desk/`

## Step 3 — Allow login from your app address

Firebase → **Authentication → Settings → Authorized domains → Add domain** →
type `YOUR-GITHUB-NAME.github.io` (without https:// and without /growmediax-desk) → **Add**.

## Step 4 — Install on your phone

**Android (Chrome)**
1. Open your app address in Chrome.
2. Tap **Sign in with Google** and choose devjerthi@gmail.com.
3. Tap **⋮** (top right) → **Install app** (or **Add to Home screen**) → **Install**.

**iPhone (Safari)**
1. Open your app address in **Safari**.
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Open the new GrowMediaX icon and sign in with Google.

The GrowMediaX icon now sits on your home screen and opens full screen, like any app.

## Step 5 — Move your existing data

1. In the old version inside Claude: **Security & backup → Download backup**.
2. In the new app: **Security & backup → Restore from backup** → choose that file → **Restore now**.
3. Then set your PIN in **Security & backup**.

---

## How your data is protected

- **Login:** only a verified Google account with the email **devjerthi@gmail.com** can open the app.
- **Database rules:** the database refuses every other account, even if someone copies the app link or the code. Anyone can see `config.js` in a public repository, and that is expected; those values are not passwords.
- **PIN lock:** a 6-digit PIN locks the app on your phone. It locks by itself when you step away. After 5 wrong tries it locks for 5 minutes, and longer each time. If you forget the PIN, tap **Reset it with your Google account** on the lock screen.
- **Log out:** removes the offline copy of your data from that phone.
- **Backups:** the Dashboard reminds you every 30 days. Keep the backup file in Google Drive.

## Updating the app later

If Claude gives you a new `index.html`, upload it to the same GitHub repository. Choose **Add file → Upload files** and commit. Your data stays in Firebase and is not affected. Close and reopen the app on your phone to get the new version.
