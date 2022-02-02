import mongoose from 'mongoose'
require('dotenv').config()

export const cacheMongoose = mongoose.createConnection(process.env.MONGO_URL || "")


