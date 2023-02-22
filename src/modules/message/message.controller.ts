import { FastifyReply, FastifyRequest } from "fastify"
import { CreateMessageInput, ParamsInput, UpdateMessageInput } from "./message.schema"
import { createMessage, deleteMessage, getMessages, updateMessage } from "./message.service"

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

export const updateMessageHandler = async (req: FastifyRequest<{ Body: UpdateMessageInput, Params: ParamsInput }>, reply: FastifyReply) => {
  const id = req.params.id
  const data = req.body
  try {
    const updatedMessage = await updateMessage(id, data)
    reply.send(updatedMessage)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export const deleteMessageHandler = async (req: FastifyRequest<{ Params: ParamsInput}>, reply: FastifyReply) => {
  const id = req.params.id
  try {
    await deleteMessage(id)
    reply.code(204).send()
  } catch (e) {
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