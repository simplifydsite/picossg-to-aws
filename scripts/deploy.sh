#!/bin/bash

set -e

if [ -z "${1}" ];
then
  echo "ERROR: No env passed. Please use picossg-deploy <env>"
  exit 1
fi

echo "Using env file .env.${1}"
source ".env.${1}"
export S3_BUCKET
export STACK_NAME
export AWS_ACCOUNT
export CNAME
export DOMAIN_NAME
export AWS_REGION

if [ -z "${2}" ];
then
  echo "Using credentials from environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"
  unset AWS_PROFILE
  unset AWS_DEFAULT_PROFILE
else
  echo "Using AWS_PROFILE ${2}"
  export AWS_PROFILE="${2}"
  export AWS_DEFAULT_PROFILE="${2}"
fi

echo "Using s3 bucket ${S3_BUCKET}"
echo "Using stack name ${STACK_NAME}"
npx @wolframkriesing/picossg -c content -o output
aws s3 sync --delete output/ "s3://${S3_BUCKET}/"
aws cloudfront create-invalidation \
		--distribution-id "$(aws cloudfront list-distributions | jq --arg stack_name "${STACK_NAME}" -r '.DistributionList.Items[] | select(.Comment==$stack_name) | .Id')" \
		--paths "/*"