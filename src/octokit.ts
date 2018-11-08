import * as Octokit from '@octokit/rest'

const octokit: Octokit = new Octokit()

octokit.authenticate({
  type: 'token',
  token: process.env.APOSTOLOS_TOKEN
})

export default octokit
