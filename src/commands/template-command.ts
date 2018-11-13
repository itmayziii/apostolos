import { Arguments, Argv, CommandModule } from 'yargs'
import { readFile, writeFile, readAssignedArrayAsObject } from '../helpers'
import * as handlebars from 'handlebars'

function templateHandler (argv: Arguments): Promise<void> {
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
      .then((fileContents) => handlebars.compile(fileContents))
      .then((handlebarsTemplate: HandlebarsTemplateDelegate) => writeFile(outputFile, handlebarsTemplate(readAssignedArrayAsObject(argv.data))))
      .catch(() => {
        console.error('Error: Could not create file from template')
        process.exit(1)
      })
}

function templateBuilder (yargs: Argv): Argv {
  return yargs
      .usage('Usage: $0 <file>')
      .options({
        o: {
          alias: 'output',
          demandOption: false,
          type: 'string',
          describe: 'Output file',
          nargs: 1
        },
        d: {
          alias: 'data',
          demandOption: false,
          type: 'array',
          describe: 'Data to pass to template i.e. version=v0.1.9',
          nargs: 1
        }
      })
}

const templateCommand: CommandModule = {
  command: 'template',
  describe: 'Compile a handlebars template',
  builder: templateBuilder,
  handler: templateHandler
}

export { templateCommand }
