#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
    echo "No environment supplied"
    exit 1
fi

if [ -z "$2" ]; then
    echo "No version supplied"    
fi

echo "Terraforming $2 on $1 environment"

case "$1" in
  prod|dev|test)
    ;;
  *)
    echo "Invalid environment: $1. It should be one of: prod, dev, test."
    exit 1
    ;;
esac

terraform apply -auto-approve -replace="null_resource.this" -var-file='_sepolia.tfvars' -var="VERSION=$2" -var="ENV=$1"