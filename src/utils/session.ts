const bcrypt = require('bcrypt')

const SALT_ROUNDS = 12

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, SALT_ROUNDS)

export const verifyPassword = async (password:string, hash:string) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (err) {
    return false
  }
}