import env from '../config/env'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-micro'

export type JwtPayload = {
  id: string
}

const decodeToken = (req, requireAuth = true) => {
    const header = req.headers.authorization
  
    if (header) {
      const token = header.replace('Bearer ', '')
      try {
        const decoded = jwt.verify(token, env.jwtSecret)
        return <JwtPayload>decoded
      } catch (error) {
        console.error(error)
        throw new ApolloError('Your session is expired. Login in to access resource')
      }
    }
  
    if (requireAuth) {
      throw new ApolloError('Login in to access resource')
    }
  
    return null
  }

export default decodeToken