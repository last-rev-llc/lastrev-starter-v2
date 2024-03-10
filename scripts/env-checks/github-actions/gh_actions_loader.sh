# .github/workflows/chromatic.yml

# Workflow name
name: 🖼️ Chromatic - Storybook

# Event for the workflow
on: push

# List of jobs
jobs:
  chromatic-deployment:
    # Operating System
    runs-on: ubuntu-latest
    # Job steps
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          # 👇 Fetches the full history of the repository
          fetch-depth: 0
          node-version: lts/*

      # - name: Install pnpm globally
      #   run: npm install -g pnpm

      # - name: Install dependencies
      #   run: pnpm install
      
      - name: Installing envkey-source
        run: |
          VERSION=$(curl https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt) && curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$VERSION/install.sh | bash

      - name: Loading env vars from EnvKey
        env:
          ENVKEY: ${{ secrets.ENVKEY }}
        run: |
          es --dot-env -f -- > $GITHUB_ENV
      
      - name: Testing env vars within 
        run: |
          echo "$Z_ENVKEY_TEST_VAR"
          echo "${{ env.Z_ENVKEY_TEST_VAR }} - from env to load in chromatic.yml"
      
      - name: Strip quotes from all env vars
        run: |
          while IFS='=' read -r name value; do
            # Use `tr` to strip single quotes from the value
            cleaned_value=$(echo "$value" | tr -d "'")
            # Re-export the variable without the quotes
            echo "$name=$cleaned_value" >> $GITHUB_ENV
          done < <(env)
        shell: bash

      - name: Publish to Chromatic
        env: 
          CHROMATIC_PROJECT_TOKEN: ${{ env.CHROMATIC_PROJECT_TOKEN }}
        uses: chromaui/action@v1
        # Chromatic GitHub Action options
        with:
          # 👇 Chromatic projectToken, refer to the manage page to obtain it.
          projectToken: "${{ env.CHROMATIC_PROJECT_TOKEN }}"
          allowConsoleErrors: true
          exitZeroOnChanges: true
