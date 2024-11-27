import express from 'express'
import helmet from 'helmet'
import router from './routes'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use('/', router)

server.listen(8080, () => {
    console.log('servidor rodando na porta 8080')
})