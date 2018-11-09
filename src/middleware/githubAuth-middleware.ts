import { Arguments, MiddlewareFunction } from 'yargs'
import * as Octokit from '@octokit/rest'

const githubAuthMiddleware: MiddlewareFunction = function (argv: Arguments) {
  if (argv._[0] !== 'tag') {
    return
  }

  const octokit: Octokit = new Octokit()
  try {
    octokit.authenticate({
      type: 'token',
      token: argv.token
    })
  } catch (error) {
    console.error('Error: Could not authenticate with Github ', error)
    return
  }

  if (!argv.helpers) {
    argv.helpers = {}
  }
  argv.helpers.octokit = octokit
}

export { githubAuthMiddleware }
