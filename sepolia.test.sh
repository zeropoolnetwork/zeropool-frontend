#!/usr/bin/env bash
# ------------------------------------------------------------------
# [Author] Anton Pegov
#          Terraform script to deploy the new version of the app
#
#          options: 
#          --latest - use "latest" as a tag and skip build phase
# ------------------------------------------------------------------
set -e

NET="sepolia"
ENVIRONMENT="test"

# If running with parameter '-latest', then use "latest" as a tag
if [ "$1" == "--latest" ]; then
  echo "Running with parameter '--latest'"
  echo "Will be using 'latest' as a tag"
  VERSION="latest"
else
  # Run the publish script
  output=$(./publish.sh)
  echo "$output"
  VERSION=$(echo "$output"  | tail -n 1 | tr -d '\n')
fi

# Run the terraform script to deploy the new version
sh _sepolia.tf.sh "$ENVIRONMENT" "$VERSION" 