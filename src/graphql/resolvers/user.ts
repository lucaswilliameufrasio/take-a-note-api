import UserModel, { IUser } from '../../database/models/user'
import env from '../../config/env'
import mongoose from 'mongoose'
import { ApolloError } from 'apollo-server-micro'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { MicroRequest } from 'apollo-server-micro/dist/types'

type IApolloContext = {
    dbConnection: mongoose.Connection,
    req: MicroRequest
}

type AuthPayload = {
    token: String
}

export default {
    Mutation: {
        signUpUser: async (root, args, { dbConnection }: IApolloContext, info): Promise<AuthPayload> => {
            const User: mongoose.Model<IUser> = UserModel(dbConnection)

            const {
                data: { email, name, password }
            } = args

            const user = await User.findOne({ email })

            if (user) {
                throw new ApolloError('Email in use')
            }

            const hashedPassword = bcrypt.hashSync(password, 3)

            const newUser = await User.create({
                email,
                name,
                password: hashedPassword
            })

            return { token: jwt.sign({ id: newUser._id }, env.jwtSecret) }
        },

        loginUser: async (root, args, { dbConnection }, info): Promise<AuthPayload> => {
            const User: mongoose.Model<IUser> = UserModel(dbConnection)

            const {
                data: { email, password }
            } = args

            const userFound = await User.findOne({ email })

            if (!userFound) throw new ApolloError('Unable to Login')
            const isMatch = bcrypt.compareSync(password, userFound.password)

            if (!isMatch) throw new ApolloError('Unable to Login')

            return { token: jwt.sign({ id: userFound._id }, env.jwtSecret) }
        }
    }
}
