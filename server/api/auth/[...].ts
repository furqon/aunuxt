import {NuxtAuthHandler} from '#auth'
import Credentials from 'next-auth/providers/credentials'
import { User } from '../../models/users'
import bcrypt from 'bcrypt'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  pages: {
    signIn: '/login'
  },

  providers: [
    // @ts-expect-error
    Credentials.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { email: string, password: string }) {
        //fetch user
        const user = await User.findOne({email: credentials.email})

        if(!user) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
          })
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        
        if(!isValid) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
          })
        }

        return {...user.toObject(), password: undefined}
      },
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({token, user, account}) {
      if(user) {
        token = {
          ...token,
          ...user
        }

        return token
      }
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user
      }
      return session
    }
    
  }
})
