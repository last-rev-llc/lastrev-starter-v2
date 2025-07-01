# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LastRev Next.js Starter - A monorepo-based content management starter for enterprise web applications with headless CMS integration (Contentful and Sanity).

**Tech Stack**: Next.js 14 + TypeScript + Material-UI + Styled Components + Apollo GraphQL + Turbo monorepo

## Common Development Commands

```bash
# Development
pnpm dev                    # Start all services with hot reload
pnpm gql:dev               # Start GraphQL server with CMS sync
pnpm sync:cms              # Sync content from CMS

# Build & Quality Checks
pnpm build                 # Production build all packages
pnpm lint                  # Lint all packages
pnpm test                  # Run all tests
pnpm format                # Format code with Prettier

# Component Development
pnpm storybook             # Start Storybook dev server
pnpm build-storybook       # Build Storybook

# CMS Operations
pnpm sanity-studio-deploy  # Deploy Sanity studio
pnpm sanity-contentful-export # Export from Contentful to Sanity
```

## Architecture

### Monorepo Structure
- **apps/web** - Main Next.js application with API routes, middleware, preview mode
- **apps/sanity-studio** - Sanity CMS studio with custom schemas and i18n
- **packages/ui** - React component library (40+ components) with Storybook
- **packages/graphql-sdk** - GraphQL client with code generation and schema sync
- **packages/graphql-extensions** - Custom resolvers and CMS field extensions

### Content Management Architecture
- Dual CMS support (Contentful/Sanity) with unified GraphQL layer
- Real-time preview mode for content editors
- Content modeling with structured types and internationalization
- Automatic GraphQL schema generation from CMS schemas

### Development Workflow
- Turbo-powered monorepo with workspace dependencies
- Automatic GraphQL SDK regeneration when schemas change
- Component isolation and testing via Storybook
- Environment management via BWS Secure (Bitwarden)

## Key Integration Points

### GraphQL Layer
- **Schema Location**: `packages/graphql-sdk/schema.graphql` (auto-generated)
- **Client Config**: `packages/graphql-sdk/config.js`
- **Custom Resolvers**: `packages/graphql-extensions/src/`
- Run `pnpm gql:dev` to sync schema changes and regenerate SDK

### Component Development
- **Component Library**: `packages/ui/src/` with Material-UI theming
- **Testing**: Cypress component tests in `packages/ui/cypress/`
- **Documentation**: Auto-generated Storybook stories
- Import components via `@repo/ui` workspace alias

### CMS Integration
- **Sanity Schema**: `apps/sanity-studio/schema.ts`
- **Content Types**: Defined in `apps/sanity-studio/schemas/`
- **Preview Webhooks**: `apps/web/src/app/api/webhooks/`
- **Environment Setup**: Use BWS Secure for CMS API keys

## Testing Strategy

- **Unit Tests**: Jest with custom presets in `packages/jest-presets/`
- **Component Tests**: Cypress in `packages/ui/cypress/`
- **E2E Tests**: Cypress in `apps/web/cypress/`
- **Visual Testing**: Storybook for component regression testing

## Environment Management

Project uses BWS Secure (Bitwarden) for environment variable management:
- Run `bws secret list` to view available secrets
- Environment variables are synced automatically during development
- See README.md for BWS setup instructions