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
## BWS Secure Environmental Variable Integration

This project uses [BWS Secure](https://github.com/last-rev-llc/bws-secure) for managing environment variables across different environments.

### Creating an Access Token

1. Visit the [Last Rev Bitwarden Machine Accounts](https://vault.bitwarden.com/#/sm/22479128-f194-460a-884b-b24a015686c6/machine-accounts) section
   - **Note:** This link requires you to be a member of the Last Rev Bitwarden organization
   - If you don't have access, please refer to the [BWS Secure documentation](https://github.com/last-rev-llc/bws-secure) or contact your team administrator
2. After clicking the link, follow these steps:
   - Select the appropriate Client/Set of Machine Accounts from the list
   - Click on the "Access Tokens" tab
   - Click "+ New Access Token" button
   - Give the token a meaningful name (e.g., "Your Name - Local Development")
   - Click "Save" to generate the token
3. Copy the displayed token (you won't be able to see it again after closing)
4. Add it to your .env file in your project root:
   ```
   BWS_ACCESS_TOKEN=your_token_here
   ```
5. Never commit this token to version control

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
