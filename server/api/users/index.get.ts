import { User } from "~/server/models/users"

export default defineEventHandler(async (event) => {
  const users = User.find()
  return users
})
