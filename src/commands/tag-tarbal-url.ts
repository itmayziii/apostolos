import { Arguments, Options } from 'yargs'

function tagTarbalUrlCommand (argv: Arguments): void {
  if (!argv._[1] || !argv._[2] || !argv._[3]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const [command, owner, repo, tagName] = argv._
  return console.log(`https://api.github.com/repos/${owner}/${repo}/tarball/${tagName}`)
}

function tagTarbalUrlOptions (): { [key: string]: Options } {
  return {}
}

export { tagTarbalUrlCommand, tagTarbalUrlOptions }
