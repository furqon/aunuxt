import { Prisma, PrismaClient } from "@prisma/client"
import { H3Event } from 'h3'

// @ts-ignore
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { name, email, password } = await readBody(event)
    if (!email || !name || !password) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Missing Info'
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    try {
      const user = await prisma.user.create({
        data: {
          email,
          hashedPassword,
          name
        }
      })
  
      return { user }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw e
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something Went Wrong'
    })
  }
})