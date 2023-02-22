import { Prisma } from "@prisma/client"
import ApiError from "../../errors"
import prisma from "../../utils/prisma"
import { CreateMessageInput, UpdateMessageInput } from "./message.schema"

export const createMessage = async (message: CreateMessageInput) => {
  const newMessage = await prisma.message.create({
    data: message
  })
  return newMessage
}

export const updateMessage = async (id: string, message: UpdateMessageInput) => {
  try {
    const updatedMessage = await prisma.message.update({
      where: {
        id
      },
      data: {
        ...message
      }
    })
    return updatedMessage
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        throw new ApiError(404, 'Message not found')
      }
    }
    throw e
  }
}

export const deleteMessage = async (id: string) => {
  try {
    await prisma.message.delete({
      where: {
        id
      }
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        throw new ApiError(404, 'Message not found')
      }
    }
    throw e
  }
}

export const getMessages = async () => {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}