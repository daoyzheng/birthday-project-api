import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const userAuthenticationSchema = z.object({
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string'
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  })
})

const userAuthenticationResponseSchema = z.object({
  accessToken: z.string()
})

export type UserAuthenticationInput = z.infer<typeof userAuthenticationSchema>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  userAuthenticationSchema,
  userAuthenticationResponseSchema
}, { $id: 'userSchemas'})