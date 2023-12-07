#!/usr/bin/env bash
set -e

NET="sepolia"
ENVIRONMENT="dev"

# Run the publish script
VERSION=$(./publish.sh | tail -n 1 | tr -d '\n')
echo "publish.sh exit status: $?"

# Run the terraform script to deploy the new version
sh _sepolia.tf.sh "$ENVIRONMENT" "$VERSION" 
echo "_sepolia.tf.sh exit status: $?"