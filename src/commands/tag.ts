import { Arguments, Options } from 'yargs'
import * as Octokit from '@octokit/rest'
import octokit from '../octokit'

function tagCommand (argv: Arguments): Promise<void> {
  if (!argv._[1] || !argv._[2]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const { format } = argv
  const [command, owner, repo] = argv._
  return octokit.repos.getTags({ owner, repo, page: 1, per_page: 1 })
      .then((response: Octokit.Response<Octokit.ReposGetTagsResponseItem[]>) => {
        if (format === 'tarbal') {
          return console.log(response.data[0].tarball_url)
        }
        return console.log(response.data[0].name)
      })
      .catch(() => {
        console.error('Error: Could not get tags for repo')
        process.exit(1)
      })
}

function tagOptions (): { [key: string]: Options } {
  return {
    'f': {
      alias: 'format',
      demandOption: false,
      type: 'string',
      describe: 'Format',
      nargs: 1,
      default: 'name'
    }
  }
}

export { tagCommand, tagOptions }
