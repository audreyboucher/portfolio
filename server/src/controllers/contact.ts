import type { Request, Response, NextFunction } from 'express'

import { sendNotificationEmail } from '../services/email'
import Contact from '../models/Contact'
import { connectDatabase } from '../config/database'

export const submitContactForm = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    await connectDatabase()

    const { name, email, message, lang } = body

    if (!name || !email || !message || !lang) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, message, and language are required'
      })
    }

    const contact = await Contact.create({
      name,
      email,
      message,
      createdAt: new Date(),
    })

    // Send notification email to admin
    await sendNotificationEmail(process.env.EMAIL_USER!, {
      type: 'notification',
      data: { name, email, message },
      lang,
    })

    // Send confirmation email to user
    await sendNotificationEmail(email, {
      type: 'confirmation',
      data: { name, email, message },
      lang,
    })

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact._id || contact.id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    })

  } catch (error) {
    console.error('Contact form error:', error)
    next(error)
  }
}