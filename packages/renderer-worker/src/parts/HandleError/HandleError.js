import * as Logger from '../Logger/Logger.js'

export const handleError = (error) => {
  console.log({ error })
  Logger.error(error)
}
