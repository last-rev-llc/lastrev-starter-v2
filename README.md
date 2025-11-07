# LastRev Next.js Starter

A production-ready monorepo starter for building enterprise web applications with headless CMS integration. Built with Next.js 14, TypeScript, Material-UI, and supports both **Sanity** and **Contentful** CMS (or file system for local development).

## 🚀 Features

- **Dual CMS Support**: Works seamlessly with Sanity or Contentful (or neither for local dev)
- **Next.js 14**: Latest Next.js with App Router and React Server Components
- **TypeScript**: Full type safety across the entire monorepo
- **Material-UI**: Pre-built component library with theming
- **GraphQL Layer**: Unified GraphQL API that works with any CMS
- **Monorepo**: Turbo-powered workspace for efficient development
- **Storybook**: Component development and documentation
- **Cypress**: E2E and component testing
- **BWS Secure**: Secure environment variable management via Bitwarden

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** 22.x ([Download](https://nodejs.org/))
- **pnpm** 9.x ([Installation Guide](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/))

### Recommended Tools

- [VS Code](https://code.visualstudio.com/) with TypeScript extensions
- [nvm](https://github.com/nvm-sh/nvm) for Node version management

## 🏗️ Project Structure

This is a [Turborepo](https://turbo.build/repo) monorepo containing:

### Apps

- **`apps/web`** - Main Next.js application
  - API routes for GraphQL, preview, and webhooks
  - Middleware for CSP headers and security
  - Server and client components

- **`apps/sanity-studio`** - Sanity CMS Studio
  - Custom schemas and document types
  - Internationalization support
  - Preview integration

### Packages

- **`packages/ui`** - React component library
  - 40+ reusable components
  - Material-UI integration
  - Storybook stories
  - Cypress component tests

- **`packages/graphql-sdk`** - GraphQL client and schema
  - Auto-generated TypeScript types
  - GraphQL queries and mutations
  - CMS-agnostic data layer

- **`packages/graphql-extensions`** - Custom GraphQL resolvers
  - Field-level transformations
  - CMS-specific logic
  - Content type extensions

- **`packages/eslint-config-custom`** - Shared ESLint configuration
- **`packages/tsconfig`** - Shared TypeScript configurations
- **`packages/jest-presets`** - Shared Jest configurations

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/last-rev-llc/lastrev-starter-v2.git your-project-name
cd your-project-name
```

### 2. Install Dependencies

Ensure you're using the correct Node.js version:

```bash
nvm use  # Uses .nvmrc file
```

Then install dependencies:

```bash
pnpm install
```

### 3. Set Up Environment Variables

This project uses [BWS Secure](https://github.com/last-rev-llc/bws-secure) (Bitwarden Secrets Manager) for environment variable management. See the BWS Secure documentation section (managed by `bws-update`) for detailed setup instructions.

### 4. Configure Your CMS

The starter supports both **Sanity** and **Contentful** (or neither for local development). The build process automatically detects which CMS you're using based on environment variables.

#### Option A: Using Sanity

Set these environment variables (via BWS Secure or `.env`):

```env
SANITY_STUDIO_SANITY_PROJECT_ID=your_project_id
SANITY_STUDIO_SANITY_DATASET=production
SANITY_STUDIO_SANITY_API_VERSION=2024-01-01
SANITY_TOKEN=your_sanity_token
USE_PREVIEW=false  # Set to 'true' for preview mode
```

#### Option B: Using Contentful

Set these environment variables:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENV=master
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_USE_PREVIEW=false  # Set to 'true' for preview mode
```

#### Option C: File System (No CMS)

If no CMS environment variables are set, the starter will use file system strategy for local development. This is useful for:
- Initial setup and development
- Testing without CMS access
- CI/CD environments without CMS credentials

### 5. Sync CMS Content

If using a CMS, sync content from your CMS:

```bash
pnpm sync:cms
```

This command:
- Detects which CMS you're using automatically
- Syncs content to `.cms-sync` directory
- Works with both Sanity and Contentful
- Gracefully handles missing CMS credentials

### 6. Start Development

Start the development server:

```bash
pnpm dev
```

This will:
- Start the Next.js app on `http://localhost:3000`
- Start the GraphQL server on `http://localhost:8888`
- Sync CMS content automatically
- Watch for changes and hot reload

For GraphQL development with auto-reload:

```bash
pnpm gql:dev
```

## 📚 Common Commands

### Development

```bash
pnpm dev              # Start all services (Next.js + GraphQL)
pnpm gql:dev          # Start GraphQL server with CMS sync and watch mode
pnpm gql:start        # Start GraphQL server only
pnpm gql:logs         # View GraphQL server logs
pnpm sync:cms         # Sync content from CMS
```

### Build & Quality

```bash
pnpm build            # Production build all packages
pnpm lint             # Lint all packages
pnpm test             # Run all tests
pnpm format           # Format code with Prettier
pnpm clean            # Clean all build artifacts
```

### Component Development

```bash
pnpm storybook        # Start Storybook dev server (port 6006)
pnpm build-storybook  # Build Storybook for deployment
pnpm cypress:open:ui  # Open Cypress for UI component tests
pnpm cypress:open:web # Open Cypress for web E2E tests
```

### CMS Operations (Sanity)

```bash
pnpm sanity-studio-deploy      # Deploy Sanity studio
pnpm sanity-contentful-export  # Export from Contentful to Sanity
pnpm sanity-create-schema      # Generate Sanity schemas
pnpm sanity-create-dataset     # Create Sanity dataset
pnpm sanity-dataset-import     # Import data into Sanity
```

## 🏢 Monorepo Architecture

### Workspace Dependencies

Packages are linked using pnpm workspaces:

- `web` depends on `ui`, `graphql-sdk`, `graphql-extensions`
- `graphql-sdk` depends on `graphql-extensions`
- All packages share `eslint-config-custom` and `tsconfig`

### Build Pipeline

The build process uses Turborepo for efficient caching:

1. **Dependencies**: Builds packages in dependency order
2. **CMS Sync**: Syncs content from CMS (if configured)
3. **GraphQL SDK**: Generates TypeScript types from GraphQL schema
4. **Web App**: Builds Next.js application

### GraphQL Layer

- **Schema**: Auto-generated from CMS schemas
- **Client**: Type-safe GraphQL client with generated hooks
- **Resolvers**: Custom field-level resolvers in `graphql-extensions`
- **Server**: Runs on `localhost:8888` during development

## 🌐 Deployment

### Netlify

The starter is configured for Netlify deployment:

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `pnpm build`
   - Publish directory: `apps/web/.next`
3. **Environment Variables**: Configure environment variables in Netlify (BWS Secure can sync these automatically)
4. **Build Hooks**: Configure webhooks in your CMS to trigger builds

### Environment Variables for Deployment

Required environment variables:

#### Core Variables

| Variable          | Description                     | Required |
| ----------------- | ------------------------------- | -------- |
| `SITE`            | Site identifier for the project | Yes      |
| `DOMAIN`          | Base URL for the environment    | Yes      |
| `DEFAULT_SITE_ID` | Default site ID                 | Yes      |
| `SITE_SETTINGS`   | Site settings ID                | Yes      |

#### CMS Variables (Sanity)

| Variable                           | Description                          | Required        |
| ---------------------------------- | ------------------------------------ | --------------- |
| `SANITY_STUDIO_SANITY_PROJECT_ID`  | Sanity project ID                    | If using Sanity |
| `SANITY_STUDIO_SANITY_DATASET`     | Sanity dataset name                  | If using Sanity |
| `SANITY_STUDIO_SANITY_API_VERSION` | Sanity API version                   | If using Sanity |
| `SANITY_TOKEN`                     | Sanity API token                     | If using Sanity |
| `USE_PREVIEW`                      | Enable preview mode (`true`/`false`) | Optional        |

#### CMS Variables (Contentful)

| Variable                    | Description                          | Required            |
| --------------------------- | ------------------------------------ | ------------------- |
| `CONTENTFUL_SPACE_ID`       | Contentful space ID                  | If using Contentful |
| `CONTENTFUL_ENV`            | Contentful environment               | If using Contentful |
| `CONTENTFUL_DELIVERY_TOKEN` | Contentful delivery token            | If using Contentful |
| `CONTENTFUL_PREVIEW_TOKEN`  | Contentful preview token             | If using Contentful |
| `CONTENTFUL_USE_PREVIEW`    | Enable preview mode (`true`/`false`) | Optional            |

#### Optional Variables

| Variable                  | Description                             |
| ------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_GTM_ID`      | Google Tag Manager ID                   |
| `NEXT_PUBLIC_SENTRY_DSN`  | Sentry DSN for error tracking           |
| `REDIS_HOST`              | Redis host for caching                  |
| `REDIS_PASSWORD`          | Redis password                          |
| `REDIS_PORT`              | Redis port                              |
| `GRAPHQL_RUNNER_STRATEGY` | GraphQL runner strategy (`fs` or `cms`) |
| `GRAPHQL_SERVER_TIMEOUT`  | GraphQL server timeout                  |

## 🧪 Testing

### Running Tests

```bash
pnpm test              # Run all tests
pnpm test:watch       # Run tests in watch mode
```

### E2E Testing

```bash
pnpm cypress:open:web # Open Cypress for E2E tests
pnpm cypress:regenerate-pages  # Regenerate test page fixtures
```

### Component Testing

```bash
pnpm cypress:open:ui  # Open Cypress for component tests
```

## 🛠️ Development Workflow

### Adding a New Component

1. Create component in `packages/ui/src/`
2. Add Storybook story in `packages/ui/stories/`
3. Export from `packages/ui/src/index.ts`
4. Use in `apps/web` via `@repo/ui` import

### Modifying GraphQL Schema

1. Update CMS schema (Sanity or Contentful)
2. Run `pnpm sync:cms` to sync changes
3. GraphQL schema auto-regenerates
4. TypeScript types auto-update

### Working with CMS Content

- **Preview Mode**: Set `USE_PREVIEW=true` or `CONTENTFUL_USE_PREVIEW=true`
- **Content Sync**: Run `pnpm sync:cms` after content changes
- **GraphQL Queries**: Use generated hooks from `@repo/graphql-sdk`

## 📖 Additional Resources

- [CLAUDE.md](./CLAUDE.md) - AI assistant context for this repository
- [SANITY_NOTES.md](./SANITY_NOTES.md) - Sanity-specific setup notes
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm lint` and `pnpm test`
4. Submit a pull request

## 📝 License

See [LICENSE](./LICENSE) file for details.

## 🆘 Troubleshooting

### Build Failures

**Issue**: Build fails with "Environment variable X is required"

**Solution**: 
- Check that required CMS variables are set
- The starter will use file system strategy if no CMS vars are present

**Issue**: GraphQL server connection errors during build

**Solution**: 
- This is normal - builds don't require a running GraphQL server
- The build process uses serverless config automatically

### CMS Sync Issues

**Issue**: `sync:cms` fails with missing variables

**Solution**:
- Check that your CMS environment variables are set correctly
- The sync will use file system strategy if no CMS vars are present
- Verify your CMS credentials are valid

### Development Server Issues

**Issue**: Port already in use

**Solution**:
- Next.js: Change port with `PORT=3001 pnpm dev`
- GraphQL: Port is configured in `packages/graphql-sdk/config.js`

**Issue**: Environment variables not loading

**Solution**:
- Check that environment variables are set correctly
- Verify BWS Secure configuration (see BWS Secure documentation section)

## 💡 Tips

- Use `pnpm` instead of `npm` or `yarn` for consistency
- Run `pnpm format` before committing
- Check Storybook for component examples and props
- Use TypeScript for type safety - the entire codebase is typed
- GraphQL queries are auto-generated - don't edit `packages/graphql-sdk/src/generated/` manually

---

**Need help?** Check the [CLAUDE.md](./CLAUDE.md) file for AI assistant context, or open an issue on GitHub.

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
