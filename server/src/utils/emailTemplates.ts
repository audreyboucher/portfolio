import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import objectPath from 'object-path'

import EN from '../../../public/locales/en/default.json' with { type: 'json' }
import FR from '../../../public/locales/fr/default.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type SupportedLang = 'en' | 'fr'
export type EmailEventName = 'confirmation' | 'notification'

export type NotificationEmailVariables = {
  type: EmailEventName
  data: Record<string, unknown>
  lang?: SupportedLang
}

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>')

export const generateSubject = (type: EmailEventName, lang: SupportedLang) => {
  const subject = (lang === 'fr' ? FR : EN)?.emails?.[type]?.title
  return `Notification: ${subject}` || 'Notification'
}

const loadEmailTemplate = (filename: string): string => {
  const templatePath = path.join(__dirname, `../../../public/assets/emailings/${filename}.html`)
  return fs.readFileSync(templatePath, 'utf-8')
}

const replaceLogo = (html: string) => {
  const imagePath = path.join(__dirname, '../../../public/assets/images/logo.png')
  const imageBuffer = fs.readFileSync(imagePath)
  const base64 = imageBuffer.toString('base64')

  return html.replace(/{{\s*logo\s*}}/g, `data:image/png;base64,${base64}`)
}

const replaceData = (html: string, data: Record<string, unknown>) =>
  Object.entries(data).reduce((result, [key, value]) => {
    const escapedValue = escapeHtml(value)
    return result.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), escapedValue)
  }, html)

const replaceText = (html: string, copy: Record<string, unknown>) =>
  html.replaceAll(/{{\s*(.+)\s*}}/g, (_, key) => {
    const value = objectPath.get(copy, key)
    return typeof value === 'string' ? escapeHtml(value) : `{{${key}}}`
  })

export const generateEmail = ({ type, data, lang = 'en' }: NotificationEmailVariables) => {
  const copy = (lang === 'fr' ? FR : EN).emails![type]
  const template = loadEmailTemplate(type)
  const html = replaceText(replaceData(replaceLogo(template), data), copy)

  return { html }
}