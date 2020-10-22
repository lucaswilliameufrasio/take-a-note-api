import NoteModel, { INote } from '../../database/models/note'
import decodeToken, { JwtPayload } from '../../helpers/decodeToken'
import mongoose from 'mongoose'
import dayjs from 'dayjs'
import { ApolloError } from 'apollo-server-micro'
import { MicroRequest } from 'apollo-server-micro/dist/types'

type IApolloContext = {
    dbConnection: mongoose.Connection,
    req: MicroRequest
}

export default {
    Query: {
        getAllNotes: async (
            parent,
            args,
            { dbConnection, req }: IApolloContext
        ): Promise<INote[]> => {
            const jwtPayload = decodeToken(req)
            const Note: mongoose.Model<INote> = NoteModel(dbConnection)
            let list: INote[]
            try {
                list = await Note.find({ userId: jwtPayload.id }).exec()
            } catch (error) {
                console.error('> getAllNotes error: ', error)
                throw new ApolloError('Error retrieving all notes')
            }
            return list
        },

        getNote: async (
            parent,
            { _id }: { _id: INote['_id'] },
            { dbConnection, req }: IApolloContext
        ): Promise<INote> => {
            const jwtPayload = decodeToken(req)
            const Note: mongoose.Model<INote> = NoteModel(dbConnection)

            try {
                const note = await Note.findOne({ _id, userId: jwtPayload.id }).exec()
                return note
            } catch (error) {
                console.error('> getNote error: ', error);
                throw new ApolloError('Error retrieving all notes')
            }
        }
    },
    Mutation: {
        saveNote: async (
            parent,
            { title, content }: INote,
            { dbConnection, req }: IApolloContext
        ): Promise<INote> => {
            const jwtPayload = decodeToken(req)
            const Note: mongoose.Model<INote> = NoteModel(dbConnection)
            try {
                const note = await Note.create({
                    title,
                    content,
                    date: dayjs().toDate(),
                    userId: jwtPayload.id
                })
                return note
            } catch (error) {
                console.error('> saveNote error: ', error);
                throw new ApolloError('Error creating note')
            }
        },
        deleteNote: async (
            parent,
            { _id }: { _id: INote['_id'] },
            { dbConnection, req }: IApolloContext
        ): Promise<INote> => {
            const jwtPayload = decodeToken(req)
            const Note: mongoose.Model<INote> = NoteModel(dbConnection)

            const noteFound = await Note.findById(_id).exec()

            if(noteFound._id !== jwtPayload.id) {
                throw new ApolloError('You are not allowed to execute this action')
            }

            try {
                const note = await Note.findByIdAndDelete(_id).exec()
                return note
            } catch (error) {
                console.error('> getNote error: ', error);
                throw new ApolloError('Error retrieving all notes')
            }
        },
    },
}
