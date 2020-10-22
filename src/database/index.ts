import mongoose from 'mongoose'
import env from '../config/env'

let connection: mongoose.Connection = null

export const getConnection = async (): Promise<mongoose.Connection> => {
    if (connection === null) {
        connection = await mongoose.createConnection(env.mongoUri, {
            bufferCommands: false,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }

    return connection
}