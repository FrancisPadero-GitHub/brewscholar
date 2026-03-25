# VS Code CPU Usage Fix for Next.js Projects

This is a classic headache, especially on a quad-core setup like your **Ryzen 3 3200G**. Even if you've ignored `.next` and `node_modules` in your `.gitignore`, VS Code's internal file watcher and Git extension sometimes "look" at them anyway, or the Git index itself might be bloated.

Here is a targeted checklist to get that CPU usage back down so you can focus on **Salarium** or your **AI Hiring app**.

### 1. Update VS Code's Internal File Watcher

The `.gitignore` tells Git what to ignore, but VS Code has its own "eye" (the file watcher) that needs to be told separately to look away. If this isn't set, VS Code still monitors thousands of files in `.next` for changes.

1.  Open **Settings** (`Ctrl + ,`).
2.  Search for `watcherExclude`.
3.  Add these patterns to **Files: Watcher Exclude**:
    - `**/.next/**`
    - `**/node_modules/**`
    - `**/dist/**`
4.  Do the same for `files.exclude` and `search.exclude` just to be safe.

### 2. Purge the Git Cache

If you ever accidentally committed a file from `.next` or `node_modules` before adding them to `.gitignore`, Git will continue to track them even if they are now in the ignore file. This causes the "Source Control" tab to constantly calculate diffs for thousands of build artifacts.

Run these commands in your project terminal:

```bash
# This removes everything from the Git index (not your files!)
git rm -r --cached .

# This re-adds everything, respecting your current .gitignore
git add .

# Commit the 'cleaning'
git commit -m "chore: refresh git index and apply ignores"
```

### 3. Tweak Git Extension Settings

VS Code’s built-in Git extension might be over-eager. Turn off "Auto Refresh" to stop it from scanning your entire directory tree every few seconds.

1.  In Settings, search for `git.autorefresh`.
2.  **Uncheck** it. (You'll just need to hit the "Refresh" icon in the Source Control tab manually when you want to see changes).
3.  Search for `git.fetchOnPull` and disable that as well if it's on.

### 4. Enable Git FSMonitor (Windows Optimization)

Since you're likely on Windows, Git has a built-in feature to speed up `git status` by using a background daemon to track file changes instead of scanning the whole disk.

Run this in your terminal:

```bash
git config --global core.fsmonitor true
```

---

### How to verify which process is "Haywire"

To be 100% sure it's the Git extension and not a rogue Next.js Turbopack process:

1.  In VS Code, go to **Help > Open Process Explorer**.
2.  Look for the process with the highest CPU.
3.  If it says **`extensionHost`** or **`git`**, the steps above will fix it.
4.  If it's **`next-dev`**, try running your dev server with `next dev --webpack` (to disable Turbopack) or check for infinite loops in your `useEffect` hooks.

**Would you like me to help you check your `.gitignore` file for any syntax errors that might be letting files slip through?**