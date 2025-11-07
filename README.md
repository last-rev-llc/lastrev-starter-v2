TransparentDark and TransparentLight
Quick Supplemental Body on Block?
Icons for links?

# TODO

[x] Implement 404 for non generated pages
[x] Deploy to Vercel
[x] Deploy Storybook to Vercel
[x] Implement Sitemap
[x] Implement Robots
[x] Implement CSP policies
[x] Implement GraphQL preview endpoint
[x] Implement Preview
[x] Implement Content Redirect
[ ] Create Grid documentation and working with Block, Collection
[x] Implement Test pipeline
[x] Implement E2E pipeline
[ ] Implement Chromatic pipeline
[] Implement path resolution for href
[] Implement Custom 404
[] Implement theme on Storybook
[] Implement Analytics
[] Implement Contentful Sidekick
[] Implement Live Editor and other UIEs
[] Implement Theme api endpoint
[] Implement \_error page
[] Implement Algolia
[] Implement path v2 resolution
[] Implement Localization

## Components

[] Block
[] Hero
[] Link
[] Text
[] Media
[] Page

# LastRev starter

This is an official Starter by LastRev with multiple meta-frameworks all working in harmony and sharing packages.

This example also shows how to use [Workspace Configurations](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces).

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e kitchen-sink
```

## What's inside?

This repo includes the following packages and apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `ui`: a complete React UI library for displaying content
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This LastRev has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting


<!-- BWS-SECURE-DOCS-START -->
## 🔒 BWS Secure Environmental Variable Integration

This project uses [BWS Secure](https://github.com/last-rev-llc/bws-secure) for managing environment variables across different environments.

### 🔐 Creating an Access Token

📍 **1.** Visit the [Bitwarden Machine Accounts](https://vault.bitwarden.com/#/sm) section within your Vault.
   - If you login directly to https://vault.bitwarden.com, you will need to navigate to the Machine Accounts section, within the Secrets Manager. The Secrets Manager is located in the left sidebar, typically at the bottom of the page.
   - If you don't have access, please refer to the [BWS Secure documentation](https://github.com/last-rev-llc/bws-secure) or contact your team administrator

🖱️ **2.** Navigate to the Machine Accounts section, and follow these steps:
   - Select the appropriate Client/Set of Machine Accounts from the list
   - Click on the "Access Tokens" tab
   - Click "+ New Access Token" button
   - Give the token a meaningful name (e.g., "Your Name - Local Development")
   - Click "Save" to generate the token

📋 **3.** Copy the displayed token (you won't be able to see it again after closing)

💾 **4.** Add it to your .env file in your project root:
   ```
   BWS_ACCESS_TOKEN=your_token_here
   ```

⚠️ **5.** Never commit this token to version control

### 🎯 Token Usage Options:

- **BWS_ACCESS_TOKEN**: Loads ALL projects associated with that token (recommended for multi-project setups)
- **BWS_PROJECT_ID**: Loads only a specific project (use for single-project or testing scenarios)

**Example for single project:**
```
BWS_PROJECT_ID=00000000-0000-0000-0000-000000000001
```

The project ID can be found in the Bitwarden Secrets Manager, within the list of projects.

### 🔧 Common Issues & Troubleshooting:

- **"No projects found"**: Verify your token has project access permissions in Bitwarden
- **"Access denied"**: Check that the Machine Account has read permissions for the target projects  
- **Token not working**: Ensure no extra spaces when copying from Bitwarden
- **Multiple projects loading**: This is normal with BWS_ACCESS_TOKEN - use BWS_PROJECT_ID for single project

### Updating BWS Secure

To update BWS Secure to the latest version, you can use the convenient script that was added to your package.json:

```bash
npm run bws-update  # Or use your project's package manager: yarn bws-update, pnpm bws-update
```

Alternatively, you can run the following command manually from your project root:

```bash
rm -rf scripts/bws-secure && git clone git@github.com:last-rev-llc/bws-secure.git scripts/bws-secure && rm -rf scripts/bws-secure/.git && bash scripts/bws-secure/install.sh
```
<!-- BWS-SECURE-DOCS-END -->
