import { FastifyReply, FastifyRequest } from "fastify"
import { verifyPassword } from "../../utils/session"
import { authenticateUser } from "./user.service"

export const userAuthHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  const { password, email } = req.body
  await authenticateUser(email, password)
  reply.code(200).send()
}