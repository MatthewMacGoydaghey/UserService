import express from 'express'
import { createExpressServer, useExpressServer } from 'routing-controllers'
import { UserController } from './controllers/userController'
import { DB } from './dataBase'
import bodyParser from 'body-parser'

DB.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

const app = createExpressServer({
  controllers: [UserController],
  validation: true
})
const server = express()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

useExpressServer(server, {})

const PORT = 3000

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))