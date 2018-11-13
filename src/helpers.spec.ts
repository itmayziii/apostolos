import 'jasmine'
import { readAssignedArrayAsObject } from './helpers'

describe('readAssignedArrayAsObject', () => {
  it('should read key value pairs correctly and transform them into object notation', () => {
    const perfectData = ['tommy=may', 'javascript=Amazing']
    const expectedResult = { tommy: 'may', javascript: 'Amazing' }
    const actualResult = readAssignedArrayAsObject(perfectData)
    expect(actualResult).toEqual(expectedResult)
  })

  it('should skip over data without an equal sign', () => {
    const inPerfectData = ['tommy=may', 'javascriptAmazing']
    const expectedResult = { tommy: 'may' }
    const actualResult = readAssignedArrayAsObject(inPerfectData)
    expect(actualResult).toEqual(expectedResult)
  })
})
