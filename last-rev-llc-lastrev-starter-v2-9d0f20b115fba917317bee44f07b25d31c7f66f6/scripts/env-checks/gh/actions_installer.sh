#!/bin/bash

# Installing envkey-source
VERSION=$(curl https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt) && curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$VERSION/install.sh | bash

# Load EnvKey variables into a temporary file
temp_env=$(mktemp)
es --dot-env -f -- > "$temp_env"

# Stripping quotes from all env vars and appending to GITHUB_ENV
while IFS='=' read -r name value || [ -n "$name" ]; do
  # Only process if $name is not empty
  if [ -n "$name" ]; then
    # Use printf to safely assign and strip single quotes from the value
    cleaned_value=$(printf '%s' "$value" | tr -d "'")

    # Append the cleaned name=value pair to GITHUB_ENV without echoing the value
    {
      echo "$name=$cleaned_value"
    } >> "$GITHUB_ENV"
  fi
done < "$temp_env"

# Clean up the temporary file without echoing its name
rm -f "$temp_env"
