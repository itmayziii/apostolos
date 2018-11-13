import { Arguments, Argv, CommandModule } from 'yargs'
import { readFile, writeFile, replaceEnvVars } from '../helpers'

function envReplaceHandler (argv: Arguments): Promise<void> {
  if (!argv._[1]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const [command, filePath] = argv._
  let outputFile = argv.output
  if (!outputFile) {
    outputFile = filePath
  }
  return readFile(filePath)
      .then((fileContents) => replaceEnvVars(fileContents))
      .then((replacedContent) => writeFile(outputFile, replacedContent))
      .catch(() => {
        console.error('Error: Could not replace in files environment variables')
        process.exit(1)
      })
}

function envReplaceBuilder (yargs: Argv): Argv {
  return yargs
      .usage('Usage: $0 <file>')
      .options({
        o: {
          alias: 'output',
          demandOption: false,
          type: 'string',
          describe: 'Output file',
          nargs: 1
        }
      })
}

const envReplaceCommand: CommandModule = {
  command: 'env-replace',
  describe: 'Replace variables in file with env variables',
  builder: envReplaceBuilder,
  handler: envReplaceHandler
}

export { envReplaceCommand }
