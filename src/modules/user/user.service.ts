import ApiError from "../../errors"
import prisma from "../../utils/prisma"
import { verifyPassword } from "../../utils/session"

export const authenticateUser = async (email:string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  })
  if (!user) throw new ApiError(401, 'Not Authenticated')
  const verified = verifyPassword(password, user.password)
  if (!verified) throw new ApiError(401, 'Not Authenticated')
}