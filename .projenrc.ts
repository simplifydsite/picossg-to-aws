import { awscdk } from 'projen'
import { NodePackageManager, NpmAccess } from 'projen/lib/javascript'

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'd4ndel1on',
  authorAddress: 'github.overfed135@passmail.net',
  cdkVersion: '2.202.0',
  defaultReleaseBranch: 'main',
  name: '@simplifyd/picossg-to-aws',
  projenrcTs: true,
  minMajorVersion: 1,
  repositoryUrl: 'https://github.com/simplifydsite/picossg-to-aws.git',
  eslint: true,
  depsUpgradeOptions: {
    workflow: false,
  },
  npmAccess: NpmAccess.PUBLIC,
  packageManager: NodePackageManager.NPM,
  minNodeVersion: '22.15.0',
  devDeps: [
    '@types/node',
    'esbuild',
  ],
})

project.eslint?.addRules({
  '@stylistic/semi': ['error', 'never'],
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
})
project.eslint?.addIgnorePattern('*-function.ts')

project.tryFindObjectFile('.github/workflows/build.yml')!
  .addOverride('jobs.build.steps.5.with', {
    'retention-days': 5,
  })

project.tryFindObjectFile('.github/workflows/build.yml')!
  .addOverride('jobs.build.steps.8.with', {
    'retention-days': 5,
    'include-hidden-files': 'true',
  })

project.addTask('pack', {
  exec: 'rm -rf dist && mkdir -p ~/.releases && npm run build && npm pack --pack-destination ~/.releases',
  description: 'Packs the current release for local development',
})

project.addBins({ bootstrap: 'scripts/bootstrap.sh' })
project.addBins({ 'picossg-deploy': 'scripts/deploy.sh' })
project.addBins({ 'picossg-deploy-infrastructure': 'scripts/deploy_infrastructure.sh' })
project.addBins({ 'add-workflows': 'scripts/add_workflows.sh' })

project.npmignore?.removePatterns('/src/')
project.npmignore?.addPatterns('/src/**/*.test.ts')
project.gitignore.addPatterns('/tmp/')

project.synth()