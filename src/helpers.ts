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

export { replaceEnvVars }
