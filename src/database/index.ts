import mongoose from 'mongoose'

const uri: string = process.env.MONGO_URI

let connection: mongoose.Connection = null

export const getConnection = async (): Promise<mongoose.Connection> => {
    if (connection === null) {
        connection = await mongoose.createConnection(uri, {
            bufferCommands: false,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }

    return connection
}