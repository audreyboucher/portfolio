import mongoose from 'mongoose'

export const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) return

  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}