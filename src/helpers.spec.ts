import 'jasmine'
import { replaceEnvVars } from './helpers'

describe('replaceEnvVars()', () => {
  const preTestEnv = Object.assign({}, process.env)

  afterAll(() => {
    process.env = preTestEnv
  })

  it('should replace env vars with all different kinds of casing', () => {
    const expectedResult = 'Hello Tommy Joe Mandar'
    process.env.NAME = 'Tommy'
    process.env.name = 'Joe'
    process.env.nAMe = 'Mandar'
    const actualResult = replaceEnvVars('Hello $NAME ${name} $nAMe')
    expect(actualResult).toBe(expectedResult)
  })

  it('should not replace variables that are part of a larger string', () => {
    let expectedResult = 'Hello Tommy$LAST_NAME'
    process.env.LAST_NAME = 'Tommy'
    let actualResult = replaceEnvVars('Hello Tommy$LAST_NAME')
    expect(actualResult).toBe(expectedResult)

    expectedResult = 'Hello $LAST_NAMETommy'
    process.env.LAST_NAME = 'Tommy'
    actualResult = replaceEnvVars('Hello $LAST_NAMETommy')
    expect(actualResult).toBe(expectedResult)
  })

  it('should replace env variables of a larger string if using bracket notation', () => {
    const expectedResult = 'HelloJoe Mandar'
    process.env.name = 'Joe'
    process.env.nAMe = 'Mandar'
    const actualResult = replaceEnvVars('Hello${name} $nAMe')
    expect(actualResult).toBe(expectedResult)
  })
})
