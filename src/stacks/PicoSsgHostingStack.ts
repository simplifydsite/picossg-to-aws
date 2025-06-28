import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CloudfrontHostedS3Bucket } from '../constructs/CloudfrontHostedS3Bucket'

export type PicoSsgHostingStackProps = {
  /**
   * Unique bucket name to store the static assets in
   */
  readonly staticAssetsBucketName: string;
  /**
   * Base domain name for the hosted zone
   *
   * @default use cloudfront domain only
   */
  readonly domainName?: string;
  /**
   * Cname of the domain to use
   *
   * @default use domainName only
   */
  readonly cname?: string;
  /**
   * Deployment username
   */
  readonly deploymentUsername: string;
  /**
   * Website index document
   *
   * @default index.html
   */
  readonly websiteIndexDocument?: string;
  /**
   * Website error document. The document that is delivered, if the key was not found.
   *
   * @default 404/index.html
   */
  readonly websiteErrorDocument?: string;
} & StackProps

export class PicoSsgHostingStack extends Stack {
  constructor(scope: Construct, id: string, props: PicoSsgHostingStackProps) {
    super(scope, id, props)

    const {
      staticAssetsBucketName,
      deploymentUsername,
      domainName,
      cname,
      websiteIndexDocument,
      websiteErrorDocument,
    } = props

    new CloudfrontHostedS3Bucket(this, 'HostedBucket', {
      bucketName: staticAssetsBucketName,
      deploymentUsername,
      domainName,
      cname,
      websiteIndexDocument,
      websiteErrorDocument,
    })
  }
}