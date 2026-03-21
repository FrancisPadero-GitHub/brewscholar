# PNPM COMMANDS

If you’re coming from npm, you’ll find that pnpm commands are very similar, but often faster and more concise. Since you're working with Next.js, these are the daily drivers you'll need.

---

### 1. The Basics (Project Management)

These replace your standard npm workflow.

- **Install all dependencies:**
  `pnpm install` (or just `pnpm i`)
- **Add a new package:**
  `pnpm add <package-name>`
- **Add a Dev Dependency (e.g., Tailwind, Typescript, ESLint):**
  `pnpm add -D <package-name>`
- **Remove a package:**
  `pnpm remove <package-name>`
- **Update packages:**
  `pnpm update` (or `pnpm up`)

---

### 2. Running Next.js Scripts

One of the best parts of pnpm is that you don't need to type `run` for custom scripts.

- **Start development server:**
  `pnpm dev` (instead of `npm run dev`)
- **Build for production:**
  `pnpm build`
- **Start production server:**
  `pnpm start`
- **Run linting:**
  `pnpm lint`

---

### 3. Execution (The `npx` Equivalent)

If you want to run a package without installing it globally (like `npx` or `create-next-app`), use `dlx`:

- **Execute a package:**
  `pnpm dlx <package-name>`
  _Example: `pnpm dlx create-next-app@latest`_

---

### 4. Housekeeping & Utility

pnpm handles storage differently, so these commands help manage your disk space.

- **List installed packages:**
  `pnpm list`
- **Check for unused dependencies:**
  `pnpm prune`
- **Clean the content-addressable store:**
  `pnpm store prune`
  _(This removes unreferenced packages from your global pnpm cache, freeing up actual GBs of disk space across all your projects.)_

---

### 5. Quick Comparison Table

| Action          | npm                    | pnpm                |
| :-------------- | :--------------------- | :------------------ |
| **Install**     | `npm install`          | `pnpm i`            |
| **Add Prod**    | `npm install <pkg>`    | `pnpm add <pkg>`    |
| **Add Dev**     | `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| **Run Script**  | `npm run dev`          | `pnpm dev`          |
| **Execute CLI** | `npx <pkg>`            | `pnpm dlx <pkg>`    |
| **Uninstall**   | `npm uninstall <pkg>`  | `pnpm remove <pkg>` |

---

### One Pro-Tip for Next.js

If you run into issues where a Next.js plugin can't find a dependency it expects to be "flat" in `node_modules`, you can create a file named `.npmrc` in your project root and add this line:

```text
public-hoist-pattern[]=*
```

_Note: Only do this if you run into "Module not found" errors that worked fine in npm._

**Would you like me to generate a `.npmrc` file for you that optimizes pnpm specifically for a Next.js environment?**

In the world of pnpm, "auditing" your project involves two main things: checking for **security vulnerabilities** in your dependencies and checking for **outdated versions**.

Here is how you handle both:

---

### 1. Security Audit

To check your `pnpm-lock.yaml` against known security vulnerabilities (the equivalent of `npm audit`), use:

```bash
pnpm audit
```

**Common Flags:**

- **`pnpm audit --prod`**: Only checks dependencies used in your production build (ignores `devDependencies`).
- **`pnpm audit --audit-level high`**: Only shows you vulnerabilities that are "high" or "critical."

> [!NOTE]
> Unlike npm, pnpm does not currently have a built-in `audit fix` command that automatically changes your `package.json`. You usually have to update the package manually or use the override feature.

---

### 2. Checking for Outdated Packages

To see which of your Next.js dependencies have newer versions available, run:

```bash
pnpm outdated
```

This will print a table showing your **Current**, **Wanted** (based on your semver ranges), and **Latest** versions.

---

### 3. The Interactive Upgrade (The "Secret Weapon")

This is arguably the best "audit" tool in pnpm. It gives you an interactive UI in your terminal to choose exactly which packages to update.

```bash
pnpm update --interactive --latest
```

_(You can also use the shorthand: `pnpm up -iL`)_

- **Spacebar**: Select/Deselect a package.
- **Enter**: Perform the update.

---

### 4. License Auditing

If you are working on a commercial Next.js project and need to make sure you aren't using packages with restrictive licenses (like GPL), pnpm has a built-in way to check:

```bash
pnpm licenses list
```

This will group all your dependencies by their license type (MIT, Apache, etc.), which is great for legal compliance audits.

---

### Summary of Audit Commands

| Goal                   | Command               |
| :--------------------- | :-------------------- |
| **Security Check**     | `pnpm audit`          |
| **Check Outdated**     | `pnpm outdated`       |
| **Interactive Update** | `pnpm up -i --latest` |
| **License Check**      | `pnpm licenses list`  |

**Would you like me to explain how to use "Overrides" in your `package.json` to force-fix a security vulnerability found by the audit?**
