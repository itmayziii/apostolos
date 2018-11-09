import { Arguments, MiddlewareFunction } from 'yargs'
import * as Octokit from '@octokit/rest'

const githubAuthMiddleware: MiddlewareFunction = function (argv: Arguments) {
  const commandWithGithubApi = ['tag', 'tag-tarbal-download']
  if (!commandWithGithubApi.includes(argv._[0])) {
    return
  }

  const octokit: Octokit = new Octokit()
  try {
    octokit.authenticate({
      type: 'token',
      token: argv.token || process.env.APOSTOLOS_TOKEN
    })
  } catch (error) {
    console.error(`Error: Could not authenticate with Github, Status: ${error.response.status}`)
    process.exit(1)
  }

  if (!argv.helpers) {
    argv.helpers = {}
  }
  argv.helpers.octokit = octokit
}

export { githubAuthMiddleware }
