import {z} from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const messageCore = {
  from: z.string({
    required_error: 'From is required',
    invalid_type_error: 'from must be a string'
  }),
  body: z.string({
    required_error: 'body is required',
    invalid_type_error: 'body must be a string'
  }),
  country: z.string({
    required_error: 'country is required',
    invalid_type_error: 'country must be a string'
  }),
  city: z.string({
    required_error: 'city is required',
    invalid_type_error: 'city must be a string'
  })
}

const createMessageSchema = z.object({
  ...messageCore
})

const createMessageResponseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  ...messageCore
})

export type CreateMessageInput = z.infer<typeof createMessageSchema>

export const { schemas: messageSchemas, $ref } = buildJsonSchemas({
  createMessageSchema,
  createMessageResponseSchema
}, { $id: 'messageSchemas'})