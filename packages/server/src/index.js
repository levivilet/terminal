import express from 'express'
import { join } from 'path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const port = process.env.PORT || 3000
const root = join(__dirname, '..', '..', '..')

const app = express()
app.use(express.static(root))

const handleListening = () => {
  console.log(`listening on http://localhost:${port}`)
}

const main = () => {
  app.listen(port, handleListening)
}

main()
