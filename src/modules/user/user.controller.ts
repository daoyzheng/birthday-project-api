import { FastifyReply, FastifyRequest } from "fastify"
import { UserAuthenticationInput } from "./user.schema"
import { authenticateUser } from "./user.service"

export const userAuthHandler = async (req: FastifyRequest<{
  Body: UserAuthenticationInput
}>, reply: FastifyReply) => {
  const { password, email } = req.body
  const user = await authenticateUser(email, password)
  const token = await reply.jwtSign({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  })
  reply.code(200).send({ accessToken: token })
}