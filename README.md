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
* ERROR_PATH
    * Path of the error page (404)
    * e.g. not-found.html
    * If absent, not-found.html is used

Example:

`.env.prod`

```
STACK_NAME=MyAwesomeAwsCloudformationStackName
S3_BUCKET=my.awesome.s3.bucket.name
DOMAIN_NAME=my-awesome-domain.de
CNAME=my-awesome-project
AWS_REGION=eu-central-1
AWS_ACCOUNT=XXXXXXXXXXXX
ERROR_PATH=not-found.html
```

This makes sure that credentials are not committed to git.

### add dependency

```bash
npm install --save-dev @simplifyd/picossg-to-aws@latest tsx
```

### deploy infrastructure

```bash
 npx -p @simplifyd/picossg-to-aws@latest picossg-deploy-infrastructure <env> <aws-profile>
```

### deploy frontend

```bash
 npx -p @simplifyd/picossg-to-aws@latest picossg-deploy <env>
```

### add github workflows [optional]

Add a github workflow to deploy the code to AWS

```bash
 npx -p @simplifyd/picossg-to-aws@latest add-workflows
```

Will automatically deploy pushes to main to production and pull requests with a label called `deploy_dev` to dev.

To make the workflows work, you have to add the credentials of the deployment AWS user to the github repo environment
secrets. The credentials can be found in the output of the deploy-infrastructure command.

* `AccessKeyId` => `AWS_ACCESS_KEY_ID`
* `SecretKey` => `AWS_SECRET_ACCESS_KEY`