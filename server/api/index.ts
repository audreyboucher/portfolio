import dotenv from 'dotenv'

import app from '../src/app'
import { connectDatabase } from '../src/config/database'

dotenv.config()

let databaseReady: Promise<void> | null = null

export default async function handler(req: Parameters<typeof app>[0], res: Parameters<typeof app>[1]) {
  if (!databaseReady) {
    databaseReady = connectDatabase()
  }

  await databaseReady
  return app(req, res)
}