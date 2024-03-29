import mongoose from 'mongoose'

export interface INote extends mongoose.Document {
    title: string
    content: string
    date: Date
    userId: string
}

const schema: mongoose.SchemaDefinition = {
    title: { type: mongoose.SchemaTypes.String, required: true },
    content: { type: mongoose.SchemaTypes.String, required: true },
    date: { type: mongoose.SchemaTypes.Date, required: true },
    userId: { type: mongoose.SchemaTypes.String, required: true },
}

const collectionName: string = 'note'
const noteSchema: mongoose.Schema = new mongoose.Schema(schema)

const Note = (connection: mongoose.Connection): mongoose.Model<INote> => connection.model(collectionName, noteSchema)

export default Note
