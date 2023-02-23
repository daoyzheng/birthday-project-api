import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import userRoutes from "./modules/user/user.route"
import messageRoutes from './modules/message/message.route'
import { messageSchemas } from "./modules/message/message.schema"
import { userSchemas } from "./modules/user/user.schema"
import cors from '@fastify/cors'
const fp = require("fastify-plugin")
require('dotenv').config()

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any
  }
  export interface FastifyRequest {
    jwtVerify: any
  }
  export interface FastifyReply {
    jwtSign: any
  }
}

const server = Fastify({ 
  logger: true,
  trustProxy: true
})
server.register(require('fastify-https-always'))
server.register(cors, {
  origin: process.env.CLIENT_HOST
})
const PORT = 5000
const secret = process.env.JWT_SECRET

server.get('/healthcheck', async () => {
  return { status: 'OK' }
})

for (const schema of [...messageSchemas, ...userSchemas]) {
  server.addSchema(schema)
}


server.register(require("@fastify/jwt"), { secret, sign: {
  expiresIn: '1d'
}})

server.decorate("authenticate", async function(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

server.register(userRoutes, { prefix: 'api/users' })
server.register(messageRoutes, { prefix: 'api/messages' })

server.setErrorHandler(function (error, request, reply) {
  const statusCode = error.statusCode
  const message = error.message
  this.log.error(error)
  if (statusCode) {
    if (statusCode === 401) {
      reply.status(statusCode).send({ statusCode, message, error: 'Unauthorized' })
    } else {
      reply.status(statusCode).send({ statusCode, message })
    }
  }
  else
    reply.send(error)
})

const main = async () => {
  try {
    await server.listen({
      port: PORT,
      host: '0.0.0.0'
    })
  } catch(e) {
    server.log.error(e)
    process.exit(1)
  }
}

main()