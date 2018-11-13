import * as fs from 'fs'

function readAssignedArrayAsObject (data: string[]): { [key: string]: string } {
  const dataFromArray = {}
  data.forEach((datum) => {
    const keyValuePair = datum.split('=')
    if (keyValuePair.length !== 2) {
      return
    }

    dataFromArray[keyValuePair[0]] = keyValuePair[1]
  })
  return dataFromArray
}

function readFile (path: fs.PathLike): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, fileContents) => {
      if (error) {
        return reject(error)
      }

      resolve(fileContents)
    })
  })
}

function writeFile (path: fs.PathLike, data: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        return reject(error)
      }

      resolve()
    })
  })
}

export { readAssignedArrayAsObject, readFile, writeFile }
