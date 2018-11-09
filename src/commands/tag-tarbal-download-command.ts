import { Arguments, Argv, CommandModule } from 'yargs'
import axios, { AxiosError, AxiosResponse } from 'axios'
import * as fs from 'fs'
import { generateTagTarbalUrl } from '../octokit-helpers'

function tagTarballDownloadHandler (argv: Arguments): Promise<void> {
  if (!argv._[1] || !argv._[2] || !argv._[3]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const [command, owner, repo, tagName] = argv._
  return new Promise((resolve, reject) => {
    axios.get(generateTagTarbalUrl(owner, repo, tagName), {
      headers: {
        Authorization: `token ${argv.token}`,
        'User-Agent': 'BudgetDumpster'
      },
      responseType: 'arraybuffer'
    }).then((response) => {
      fs.writeFile(argv.file, response.data, 'utf8', (error) => {
        if (error) {
          reject(console.error(`Error: Could not write file ${argv.file}`))
          process.exit(1)
        }
      })
    }).catch((error: AxiosError) => {
      reject(console.error(`Error: Bad response from github, ${error.response.status} ${error.response.statusText}`))
      process.exit(1)
    })
  })
}

function tagTarbalDownloadBuilder (yargs: Argv): Argv {
  return yargs
      .usage('Usage $0 <user> <repo> <tag>')
      .options({
        f: {
          alias: 'file',
          demandOption: false,
          type: 'string',
          describe: 'Filename to save the file to',
          nargs: 1,
          default: 'tag.tar.gz'
        }
      })
}

const tagTarbalDownloadCommand: CommandModule = {
  command: 'tag-tarbal-download',
  describe: 'Download Github tarbal',
  builder: tagTarbalDownloadBuilder,
  handler: tagTarballDownloadHandler
}

export { tagTarbalDownloadCommand }
