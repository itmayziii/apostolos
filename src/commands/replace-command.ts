import { Arguments, Argv, CommandModule } from 'yargs'

function replaceHandler (argv: Arguments): Promise<void> {
  if (!argv._[1]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const [command, filePath] = argv._

}

function replaceBuilder (yargs: Argv): Argv {
  return yargs
      .usage('Usage: $0 <file>')
}

const replaceCommand: CommandModule = {
  command: 'replace',
  describe: 'Replace variables in file with env variables',
  builder: replaceBuilder,
  handler: replaceHandler
}

export { replaceCommand }
