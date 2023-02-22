import prisma from "../../utils/prisma"
import { CreateMessageInput } from "./message.schema"

export const createMessage = async (message: CreateMessageInput) => {
  const newMessage = await prisma.message.create({
    data: message
  })
  return newMessage
}

export const getMessages = async () => {
  return []
}