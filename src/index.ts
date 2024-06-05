import express from 'express'
import { createExpressServer, useExpressServer } from 'routing-controllers'
import { UserController } from './controllers/userController'
import { DB } from './dataBase'
import bodyParser from 'body-parser'
import path from 'path'

DB.initialize()
.then(() => {
  console.log("Database has been initialized")
})
.catch((err) => {
  console.error("Error during Database initialization:", err)
})

const app = createExpressServer({
  controllers: [UserController]
})
const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/uploads', express.static(path.resolve(__dirname, 'images')))
useExpressServer(server, {})

const PORT = 3000

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))