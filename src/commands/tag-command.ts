import { Arguments, Argv, CommandModule } from 'yargs'
import * as Octokit from '@octokit/rest'

function tagHandler (argv: Arguments): Promise<void> {
  if (!argv._[1] || !argv._[2]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const { format } = argv
  const [command, owner, repo] = argv._
  const octokit: Octokit = argv.helpers.octokit
  return octokit.repos.getTags({ owner, repo, page: 1, per_page: 1 })
      .then((response: Octokit.Response<Octokit.ReposGetTagsResponseItem[]>) => {
        if (format === 'tarbal') {
          return console.log(response.data[0].tarball_url)
        }

        if (format === 'sha') {
          return console.log(response.data[0].commit.sha)
        }

        return console.log(response.data[0].name)
      })
      .catch((error) => {
        console.error('Error: Could not get tags for repo ', error)
        process.exit(1)
      })
}

function tagBuilder (yargs: Argv): Argv {
  return yargs
      .options({
        f: {
          alias: 'format',
          demandOption: false,
          type: 'string',
          describe: 'Format',
          nargs: 1,
          default: 'name',
          choices: ['name', 'tarbal', 'sha']
        }
      })
      .usage('Usage: $0 <user> <repo>')
}

const tagCommand: CommandModule = {
  command: 'tag',
  describe: 'Get the latest tag from a repository',
  builder: tagBuilder,
  handler: tagHandler
}

export { tagCommand }
