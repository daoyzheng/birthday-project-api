import { FastifyInstance } from "fastify"
import { createMessageHandler, getMessagesHandler } from "./message.controller"
import { $ref } from "./message.schema"

function messageRoutes(server: FastifyInstance, options: any, done: () => void) {
  server.post('/', {
    schema: {
      body: $ref('createMessageSchema'),
      response: {
        201: $ref('createMessageResponseSchema')
      }
    }
  }, createMessageHandler)
  server.get('/', getMessagesHandler)
  done()
}

export default messageRoutes