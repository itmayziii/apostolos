import 'jasmine'
import { generateTagTarbalUrl } from './octokit-helpers'

describe('generateTagTarbalUrl()', () => {
  it('should return the correct url', () => {
    const expectedResult = 'https://api.github.com/repos/BudgetDumpster/dunamis/tarball/v0.1.9'
    const actualResult = generateTagTarbalUrl('BudgetDumpster', 'dunamis', 'v0.1.9')
    expect(actualResult).toBe(expectedResult)
  })
})
