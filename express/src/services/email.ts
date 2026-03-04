import nodemailer from 'nodemailer'
import { generateEmail, generateSubject, type SupportedLang, type EmailEventName } from '../utils/emailTemplates'

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = createTransporter()

    const info = await transporter.sendMail({
      from: `"${process.env.NAME} Portfolio" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })

    console.log('Email sent:', info.messageId)

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to send email: ${errorMessage}`)
  }
}

export const sendNotificationEmail = async (
  to: string,
  variables: { type: EmailEventName; data: Record<string, unknown>; lang: SupportedLang }
) => {
  const { html } = generateEmail(variables)
  const subject = generateSubject(variables.type, variables.lang)

  return await sendEmail(to, subject, html)
}