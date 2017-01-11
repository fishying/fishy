import findOrCreate from './findOrCreate'
import findAndMsg from './findAndMsg'

export default async (mongoose) => {
    mongoose.plugin(findOrCreate)
    mongoose.plugin(findAndMsg)
}