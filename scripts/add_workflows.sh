#!/bin/bash

npm i @simplifyd/picossg-to-aws --save-dev
rm -rf .github/workflows
mkdir -p .github/workflows
cp node_modules/@simplifyd/picossg-to-aws/resources/deploy_dev.yml .github/workflows/
cp node_modules/@simplifyd/picossg-to-aws/resources/deploy_prod.yml .github/workflows/
