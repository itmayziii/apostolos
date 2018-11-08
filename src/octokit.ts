import * as Octokit from '@octokit/rest'

const octokit: Octokit = new Octokit()

try {
  octokit.authenticate({
    type: 'token',
    token: process.env.APOSTOLOS_TOKEN
  })
} catch (error) {
  console.error('Error: Could not authenticate with Github ', error)
}

export default octokit
