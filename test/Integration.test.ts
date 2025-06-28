import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'
import { PicoSsgHostingStack } from '../src/stacks/PicoSsgHostingStack'

describe('Integration', () => {
  test('Stack', () => {
    const app = new App()
    new PicoSsgHostingStack(app, 'Stack', {
      stackName: 'PicoSsgApp',
      domainName: 'my-domain.de',
      cname: 'app',
      staticAssetsBucketName: 'static.assets',
      deploymentUsername: 'user',
      env: {
        account: '000000000',
        region: 'eu-central-1',
      },
    })

    Template.fromJSON(app)
  })
})
