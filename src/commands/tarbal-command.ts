import { Arguments, Argv, CommandModule } from 'yargs'
import * as targz from 'targz'
import * as fs from 'fs'

function findDecompressedName (outputPath: fs.PathLike): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readdir(outputPath, (error, data) => {
      if (error) {
        return reject(error)
      }

      if (data.length === 0) {
        return reject(new Error('Empty directory found while looking for file name'))
      }

      if (data.length > 1) {
        return reject(new Error('It is not currently possible to find the decompressed name if it is not in its own directory'))
      }

      resolve(data[0])
    })
  })
}

function tarbalHandler (argv: Arguments): Promise<void> {
  if (!argv._[1] || !argv._[2]) {
    console.error('Error: Not enough arguments supplied')
    return process.exit(1)
  }

  const [command, action, path] = argv._
  return new Promise((resolve, reject) => {
    if (action === 'decompress') {
      targz.decompress({ src: path, dest: argv.output }, (error) => {
        if (error) {
          reject(console.error(`Error: Could not decompress file ${path},`, error))
          process.exit(1)
        }

        if (!argv.return) {
          return resolve()
        }

        findDecompressedName(argv.output)
            .then((decompressedName) => {
              resolve(console.log(decompressedName))
            })
            .catch((error) => {
              reject(console.error(error))
              process.exit(1)
            })
      })
    } else {
      targz.compress({ src: path, dest: argv.output }, (error) => {
        if (error) {
          reject(console.error(`Error: Could not compress file ${path} `, error))
          process.exit(1)
        }

        resolve()
      })
    }
  })
}

function tarbalBuilder (yargs: Argv): Argv {
  return yargs
      .usage('Usage $0 <action> <path>')
      .options({
        o: {
          alias: 'output',
          demandOption: false,
          type: 'string',
          describe: 'Output file path',
          nargs: 1,
          default: './'
        },
        r: {
          alias: 'return',
          demandOption: false,
          type: 'boolean',
          describe: 'Return name of the decompressed directory',
          nargs: 1,
          default: false
        }
      })
}

const tarbalCommand: CommandModule = {
  command: 'tarbal',
  describe: 'Compress or decompress a tarbal',
  builder: tarbalBuilder,
  handler: tarbalHandler
}

export { tarbalCommand }
