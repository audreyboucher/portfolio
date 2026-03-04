import dotenv from 'dotenv'

import app from '../src/app.js'

dotenv.config()

export default async function handler(req: Parameters<typeof app>[0], res: Parameters<typeof app>[1]) {
  return app(req, res)
}