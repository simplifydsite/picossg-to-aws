# picossg to aws

## Setup

### Add `.env.<environment>` files

Add a file for each environment you want to have.

Parameters:

* STACK_NAME
    * Cloudformation Stack name
    * Needs to be unique in each aws account
* S3_BUCKET
    * AWS S3 Bucket name
    * Needs to be globally unique
* DOMAIN_NAME [optional]
    * Base domain name
    * HostedZone needs to exist in the AWS Account already
    * If absent, a cloudfront domain is used
* CNAME [optional]
    * CNAME on top of the domain name
* AWS_REGION
    * AWS Region
    * e.g. eu-central-1 for Frankfurt or eu-west-1 for Dublin
* AWS_ACCOUNT
    * AWS Account id

Example:

`.env.prod`

```
STACK_NAME=MyAwesomeAwsCloudformationStackName
S3_BUCKET=my.awesome.s3.bucket.name
DOMAIN_NAME=my-awesome-domain.de
CNAME=my-awesome-project
AWS_REGION=eu-central-1
AWS_ACCOUNT=XXXXXXXXXXXX
```

This makes sure that credentials are not committed to git.

### add dependency

```bash
npm install --save-dev @simplifyd/picossg-to-aws tsx
```

### deploy infrastructure

```bash
 npx -p @simplifyd/picossg-to-aws picossg-deploy-infrastructure <env> <aws-profile>
```

### deploy frontend

```bash
 npx -p @simplifyd/picossg-to-aws picossg-deploy <env>
```

### add github workflows [optional]

Add a github workflow to deploy the code to AWS

```bash
 npx -p @simplifyd/picossg-to-aws add-workflows
```

Will automatically deploy pushes to main to production and pull requests with a label called `deploy_dev` to dev.
