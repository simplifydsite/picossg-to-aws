#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { PicoSsgHostingStack } from './stacks/PicoSsgHostingStack'
import { getMandatoryEnv } from './utils/getMandatoryEnv'

const app = new cdk.App()
const stackName = getMandatoryEnv('STACK_NAME')
const s3Bucket = getMandatoryEnv('S3_BUCKET')
const domainName = process.env.DOMAIN_NAME || undefined
const cname = process.env.CNAME || undefined
const region = getMandatoryEnv('AWS_REGION')
const account = getMandatoryEnv('AWS_ACCOUNT')

new PicoSsgHostingStack(app, stackName, {
  staticAssetsBucketName: s3Bucket,
  domainName,
  cname,
  deploymentUsername: `${stackName}Deployment`,
  env: { region, account },
})