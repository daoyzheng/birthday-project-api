import { FastifyInstance } from "fastify"
import { createMessageHandler, deleteMessageHandler, getMessagesHandler, updateMessageHandler } from "./message.controller"
import { $ref } from "./message.schema"

function messageRoutes(server: FastifyInstance, options: any, done: () => void) {
  server.post('/', {
    schema: {
      body: $ref('createMessageSchema'),
      response: {
        201: $ref('messageResponseSchema')
      }
    }
  }, createMessageHandler)
  server.put('/:id', {
    onRequest: [server.authenticate],
    schema: {
      body: $ref('updateMessageSchema'),
      params: $ref('messageId'),
      response: {
        200: $ref('messageResponseSchema')
      }
    }
  }, updateMessageHandler)
  server.delete('/:id', {
    onRequest: [server.authenticate],
    schema: {
      params: $ref('messageId')
    }
  }, deleteMessageHandler)
  server.get('/', {
    schema: {
      response: {
        200: $ref('messageListResponseSchema')
      }
    }
  }, getMessagesHandler)
  done()
}

export default messageRoutes