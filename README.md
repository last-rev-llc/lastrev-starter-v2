# Last Rev Starter Framework - Project Setup Guide

## Introduction

This guide provides a detailed walkthrough on how to set up a new project using the Last Rev starter framework. The instructions cover using the Last Rev CLI, Contentful, Netlify, and the necessary environment configurations to get your project up and running.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [PNPM](https://pnpm.io/)
- [Git](https://git-scm.com/)
- [ENVKey](https://www.envkey.com/)

### Utilities

This Last Rev setup includes:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for JavaScript
- [Prettier](https://prettier.io) for code formatting

## Fork the Repository

1. Navigate to the [Last Rev Starter Framework Repository](https://github.com/last-rev-llc/lastrev-starter-v2/).
2. Click on the "Fork" button to create a fork of the repository under your GitHub account.

## Setup the Project

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/<YOUR_GITHUB_USERNAME>/starter.git your-project-name
    cd your-project-name
    ```

2. **Install Dependencies:**

    First, ensure you are using the correct Node.js version:

    ```sh
    nvm use
    ```

    Then install the dependencies:

    ```sh
    pnpm install
    ```

This repo includes the following packages and apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `ui`: a complete React UI library for displaying content
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

## Configure Contentful

1. **Create a Contentful Space:**
    - Log in to your [Contentful account](https://app.contentful.com/).
    - Create a new space and note down the space ID.

2. **Environment Variables:**

    Generate the necessary Contentful tokens and set up environment variables. You can use `ENVKey` to manage environment variables or copy the sample.env file

    - Download and install `ENVKey`. See details below
    - Create a new app in `ENVKey` named `your-project-name`.
    - Set the following environment variables:

      ```env
      CONTENTFUL_SPACE_ID=your_contentful_space_id
      CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
      CONTENTFUL_MANAGEMENT_TOKEN=your_contentful_management_token
      ```

3. **Import Content Models:**

    Import the content models and entries from the Last Rev starter framework:

    ```sh
    last-rev create-contentful-app --space-id your_contentful_space_id --management-token your_contentful_management_token
    ```

    Ensure the environment variables are correctly linked by ENVKey, or manually set them in a `.env` file.

## Setup Netlify

1. **Create a New Site:**

    - Log in to your [Netlify account](https://app.netlify.com/).
    - Click on "New site from Git" and connect your GitHub repository.
    - Configure build settings:
        - **Build command:** `pnpm build`
        - **Publish directory:** `./out`

2. **Environment Variables:**
    - Add your environment variables from ENVKey to Netlify. Go to your site's "Site settings" > "Build & deploy" > "Environment" > "Environment variables" and add:
    
      ```env
      ENVKEY=your_env_key_from_envkey
      ```

3. **Build Hooks:**

    Create build hooks in Netlify to trigger builds from Contentful:

    - Go to "Build & deploy" > "Build hooks".
    - Create hooks for `main` and `develop` branches.
    - Copy the URLs for these hooks.

4. **Configure Contentful Webhooks:**
    - Log in to Contentful and go to "Settings" > "Webhooks".
    - Add the Netlify build hook URLs for `publish`, `unpublish` and `delete` actions.

5. **Configure Upstash (Optional):**
    - Login to [Upstash](https://console.upstash.com/)
    - Create a new Redis database.
    - Add the Redis environment variables to your `.env` file or ENVKey:
      ```env
      REDIS_HOST=your_redis_host
      REDIS_PASSWORD=your_redis_password
      REDIS_PORT=your_redis_port
      ```

## Local Development

1. **Start the Development Server:**

    ```sh
    pnpm dev
    ```

2. **Access the Local Environment:**

    Open your browser and navigate to `http://localhost:3000`.

## Deployment

To deploy your application, simply push your changes to the `main` or `develop` branches on GitHub. Netlify will automatically trigger deployments based on the build hooks configured.

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loaded:**

    If your environment variables are not being picked up, ensure they are correctly set in ENVKey and Netlify.

    #### General troubleshooting steps for Envkey
    - Always make sure your envkey is up to date
      - `npm i -g envkey`
    - Can't see the environment vars? Try re-loading envkey's core. This typically only occurs when first getting invited or adding a new app, but it is useful to know as a quick troubleshooting step to rule out any issues.
      - `envkey core stop`
      - `envkey core start`
    - Viewing the environment variables via CLI, simply type `es` and hit return. As long as everything is running properly, you should be able to see the full output of the current local env you are using.
    - ENVKEY MISSING - Did you initialize your envkey app locally? If not, you may need to initialize it which will create a local cli key for that particular repo/app.
      - `envkey init`
      - Follow the CLI instructions to attach it to the existing app.

2. **Contentful Import Issues:**

    If the content models or entries are not imported correctly, double-check your management token and space ID.

3. **Netlify Build Failures:**

    Check the build logs on Netlify to identify the issue. Common problems include missing environment variables or incorrect build commands.

## Additional Configurations

1. **Branch Protection Rules:**

    Ensure that your main and develop branches have the necessary protection rules configured in GitHub.

2. **Automated Testing:**

    Set up automated tests to run on each pull request to ensure code quality and functionality.

## Environment Variables Table

| Variable Name                    | Description                                                   |
|----------------------------------|---------------------------------------------------------------|
| `Z_ENVKEY_TEST_VAR`              | Envkey: Reading from Develop Vars                             |
| `SITE`                           | Site identifier for the project                               |
| `DOMAIN`                         | Base URL for the local environment                            |
| `DEFAULT_SITE_ID`                | Default site ID for Contentful                                |
| `SITE_SETTINGS`                  | Site settings ID for Contentful                               |
| `CONTENTFUL_SPACE_ID`            | Contentful space ID                                           |
| `CONTENTFUL_ENV`                 | Contentful environment (e.g., master)                         |
| `CONTENTFUL_USE_PREVIEW`         | Boolean to use Contentful preview                             |
| `CONTENTFUL_PREVIEW_TOKEN`       | Contentful preview API token                                  |
| `CONTENTFUL_DELIVERY_TOKEN`      | Contentful delivery API token                                 |
| `NEXT_PUBLIC_CONTENTFUL_ENV`     | Public Contentful environment variable for Next.js            |
| `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`| Public Contentful space ID for Next.js                        |
| `GRAPHQL_SERVER_TIMEOUT`         | Timeout setting for the GraphQL server                        |
| `GRAPHQL_RUNNER_STRATEGY`        | Strategy used by the GraphQL runner (e.g., redis)             |
| `REDIS_HOST`                     | Host URL for the Redis instance                               |
| `REDIS_PASSWORD`                 | Password for the Redis instance                               |
| `REDIS_PORT`                     | Port number for the Redis instance                            |
| `LOG_LEVEL`                      | Logging level (e.g., debug, info, error)                      |
| `NEXT_PUBLIC_GTM_ID`             | Google Tag Manager ID for the public environment              |
| `PREVIEW_TOKEN`                  | Token used for previewing content                             |
| `CHROMATIC_PROJECT_TOKEN`        | Chromatic project token for visual testing                    |

---

Would you like any further customizations or additions?