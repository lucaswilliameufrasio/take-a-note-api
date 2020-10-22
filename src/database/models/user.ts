import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
    name: string
    email: string
    password: string
}

const schema: mongoose.SchemaDefinition = {
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: { type: mongoose.SchemaTypes.String, required: true },
    password: { type: mongoose.SchemaTypes.String, required: true },
}

const collectionName: string = 'user'
const userSchema: mongoose.Schema = new mongoose.Schema(schema)

const User = (connection: mongoose.Connection): mongoose.Model<IUser> => connection.model(collectionName, userSchema)

export default User
