import * as fs from 'fs'

function replaceEnvVars (content: string): string {
  const envVarsInContent = content.match(/\$[A-Za-z0-9]+/g)
  if (envVarsInContent) {
    const uniqueEnvVars = envVarsInContent.filter((value, index, self) => self.indexOf(value) !== -1)
    uniqueEnvVars.forEach((envVar) => {
      const envVarWithoutPrefix = envVar.substr(1)
      if (!process.env[envVarWithoutPrefix]) {
        return
      }

      content = content.replace(envVar, process.env[envVarWithoutPrefix])
    })
  }

  const envVarsWithBrackets = content.match(/\$\{[A-Za-z0-9]+\}/g)
  if (envVarsWithBrackets) {
    const uniqueVarsWithBrackets = envVarsWithBrackets.filter((value, index, self) => self.indexOf(value) !== -1)
    uniqueVarsWithBrackets.forEach((envVar) => {
      const envVarWithoutPrefixOrSuffix = envVar.substr(2).slice(0, -1)
      if (!process.env[envVarWithoutPrefixOrSuffix]) {
        return
      }

      content = content.replace(envVar, process.env[envVarWithoutPrefixOrSuffix])
    })
  }

  return content
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

export { replaceEnvVars, readFile, writeFile }
