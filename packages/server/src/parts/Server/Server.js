import express from 'express'
import { createServer } from 'http'
import * as Ws from 'ws'
import * as HandleWebSocket from '../HandleWebSocket/HandleWebSocket.js'
import * as Root from '../Root/Root.js'

const port = process.env.PORT || 3000

const app = express()
app.use(express.static(Root.root))
const server = createServer(app)

const wss = new Ws.WebSocketServer({ server })

wss.on('connection', HandleWebSocket.handleWebSocket)

const handleListening = () => {
  console.log(`listening on http://localhost:${port}`)
}

export const listen = () => {
  server.listen(port, handleListening)
}
