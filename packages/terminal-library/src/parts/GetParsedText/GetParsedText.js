import * as OperationType from '../OperationType/OperationType.js'
import * as ParseData from '../ParseData/ParseData.js'

export const getParsedText = (text) => {
  if (!text) {
    return ''
  }
  const parsed = ParseData.parseData(text)
  let print = ''
  for (const operation of parsed) {
    if (operation.type === OperationType.Print) {
      print += text.slice(operation.start, operation.end)
    } else if (operation.type === OperationType.LineFeed) {
      print += '\n'
    }
  }
  return print
}
