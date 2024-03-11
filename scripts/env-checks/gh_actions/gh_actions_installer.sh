#!/bin/bash

# Installing envkey-source
VERSION=$(curl https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt) && curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$VERSION/install.sh | bash

# Loading env vars from EnvKey
es --dot-env -f -- > $GITHUB_ENV

# # Stripping quotes from all env vars
# while IFS='=' read -r name value; do
#   cleaned_value=$(echo "$value" | tr -d "'")
#   echo "$name=$cleaned_value" >> $GITHUB_ENV
# done < <(env)
