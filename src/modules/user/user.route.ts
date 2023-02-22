import { FastifyInstance } from "fastify"
import { userAuthHandler } from "./user.controller"

function userRoutes(server: FastifyInstance, options: any, done: () => void) {
  // server.get('/')
  server.post('/auth', userAuthHandler)
  done()
}

export default userRoutes