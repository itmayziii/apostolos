function generateTagTarbalUrl (owner: string, repo: string, tagName: string) {
  return `https://api.github.com/repos/${owner}/${repo}/tarball/${tagName}`
}

export { generateTagTarbalUrl }
