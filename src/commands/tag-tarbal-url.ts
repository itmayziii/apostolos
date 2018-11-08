import { Arguments, Argv } from 'yargs'
import { generateTagTarbalUrl } from '../octokit-helpers'

function tagTarbalUrlCommand (argv: Arguments): void {
  if (!argv._[1] || !argv._[2] || !argv._[3]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const [command, owner, repo, tagName] = argv._
  return console.log(generateTagTarbalUrl(owner, repo, tagName))
}

function tagTarbalUrlBuilder (yargs: Argv): Argv {
  return yargs.usage('Usage $0 <user> <repo> <tagName>')
}

export { tagTarbalUrlCommand, tagTarbalUrlBuilder }
