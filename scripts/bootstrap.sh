#!/bin/bash

set -e

echo "Using env file .env.${1}"
source ".env.${1}"
export S3_BUCKET
export STACK_NAME
export AWS_ACCOUNT
export CNAME
export DOMAIN_NAME
export AWS_REGION
export ERROR_PATH

if grep -q "\[profile ${AWS_PROFILE}\]" "${HOME}/.aws/config" ; then
  echo "Profile ${AWS_PROFILE} configured ✅"
else
  echo "Error: Profile ${AWS_PROFILE} not configured"
  exit 1
fi

echo "Log into accounts..."
sleep 1

aws sso login --profile "${AWS_PROFILE}"

echo "Bootstrapping..."
AWS_REGION=${AWS_REGION} npx cdk@latest bootstrap --profile "${AWS_PROFILE}" "aws://${AWS_ACCOUNT}/${AWS_REGION}"