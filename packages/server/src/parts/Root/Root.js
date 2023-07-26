import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const root = join(__dirname, '..', '..', '..', '..', '..')
