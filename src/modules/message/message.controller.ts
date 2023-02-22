import { FastifyReply, FastifyRequest } from "fastify"
import { CreateMessageInput } from "./message.schema"
import { createMessage, getMessages } from "./message.service"

export const createMessageHandler = async (req: FastifyRequest<{ Body: CreateMessageInput}>, reply: FastifyReply) => {
  const body = req.body
  try {
    const message = await createMessage(req.body)
    reply.code(201).send(message)
  } catch(e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export const getMessagesHandler = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const messages = await getMessages()
    reply.code(200).send(messages)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}