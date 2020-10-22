export default {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/notes',
    jwtSecret: process.env.JWT_SECRET || 'SlVJK&[8msAb,0Od=h$4(?26Q5o5coqtYd}*):'
}