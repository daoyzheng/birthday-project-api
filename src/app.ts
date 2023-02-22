import Fastify from "fastify"
import userRoutes from "./modules/user/user.route"
import messageRoutes from './modules/message/message.route'
import { messageSchemas } from "./modules/message/message.schema"

const server = Fastify({ logger: true })
const PORT = 5000

server.get('/healthcheck', async () => {
  return { status: 'OK' }
})

for (const schema of messageSchemas) {
  server.addSchema(schema)
}

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