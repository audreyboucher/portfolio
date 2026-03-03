import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import routes from './routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.use('/api', routes)

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' })
})

// Error handling
app.use(errorHandler)

export default app