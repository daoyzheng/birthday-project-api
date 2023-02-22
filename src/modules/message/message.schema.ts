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

const messageResponseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  ...messageCore
})

const messageListResponseSchema = z.array(messageResponseSchema)

const updateMessageSchema = z.object({
  from: z.string({
    required_error: 'From is required',
    invalid_type_error: 'from must be a string'
  }),
  body: z.string({
    required_error: 'body is required',
    invalid_type_error: 'body must be a string'
  })
})

const messageId = z.object({
  id: z.string().uuid(),
});


export type CreateMessageInput = z.infer<typeof createMessageSchema>
export type UpdateMessageInput = z.infer<typeof updateMessageSchema>
export type ParamsInput = z.infer<typeof messageId>

export const { schemas: messageSchemas, $ref } = buildJsonSchemas({
  messageId,
  updateMessageSchema,
  createMessageSchema,
  messageResponseSchema,
  messageListResponseSchema
}, { $id: 'messageSchemas'})