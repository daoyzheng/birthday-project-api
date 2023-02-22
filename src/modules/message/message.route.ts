import { FastifyInstance } from "fastify"
import { createMessageHandler, deleteMessageHandler, getMessagesHandler, updateMessageHandler } from "./message.controller"
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
  server.put('/:id', {
    schema: {
      body: $ref('updateMessageSchema'),
      params: $ref('messageId'),
      response: {
        200: $ref('createMessageResponseSchema')
      }
    }
  }, updateMessageHandler)
  server.delete('/:id', {
    schema: {
      params: $ref('messageId')
    }
  }, deleteMessageHandler)
  server.get('/', {
    // onRequest: [server.authenticate]
  }, getMessagesHandler)
  done()
}

export default messageRoutes