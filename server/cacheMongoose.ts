import mongoose from 'mongoose'

export const cacheMongoose = mongoose.createConnection(process.env.MONGO_URL)
