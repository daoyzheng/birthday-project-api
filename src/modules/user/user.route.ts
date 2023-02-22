import { FastifyInstance } from "fastify"
import { userAuthHandler } from "./user.controller"
import { $ref } from "./user.schema"

function userRoutes(server: FastifyInstance, options: any, done: () => void) {
  server.post('/auth', {
    schema: {
      body: $ref('userAuthenticationSchema'),
      response: {
        200: $ref('userAuthenticationResponseSchema')
      }
    }
  }, userAuthHandler)
  done()
}

export default userRoutes