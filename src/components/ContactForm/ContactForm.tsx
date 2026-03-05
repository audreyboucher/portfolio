import { useState, useEffect, type SubmitEventHandler } from 'react'
import { useForm, type RegisterOptions } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import { Button, Input, type InputProps } from '@/components/ui'

import styles from './ContactForm.module.scss'

enum Field {
  name = 'name',
  email = 'email',
  message = 'message',
}

type Fields = Record<Field, string>

const rules: Record<Field, RegisterOptions<Fields, Field>> = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    required: true,
    minLength: 10,
    maxLength: 200,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
  },
  message: {
    required: true,
    minLength: 20,
  },
}

const ContactForm = () => {
  const { t, i18n } = useTranslation('default', { keyPrefix: 'contact' })
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Fields>()

  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const resetForm = () => {
    reset()
    setLoading(false)
    setError(false)
    setSuccess(false)
  }

  const submitForm = (data: Fields) => {
    resetForm()
    setLoading(true)

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/contact/`, { ...data, lang: i18n.language })
      .then((response) => {
        console.log(response)
        resetForm()
        setSuccess(true)
      })
      .catch((err) => {
        console.error(err)
        setError(true)
      })
  }

  const getField = (field: Field): Omit<InputProps, 'type'> => ({
    ...register(field, rules[field]),
    label: t(`fields.${field}`),
    error: errors[field]
      ? t(`errors.${field}.${errors[field].type}`, { amount: rules[field][errors[field].type as keyof RegisterOptions<Fields, Field>] })
      : undefined,
  })

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    void handleSubmit(submitForm)(event)
  }

  useEffect(() => {
    if (success) {
      const id = setTimeout(() => setSuccess(false), 5000)
      return () => clearTimeout(id)
    }
  }, [success])

  return (
    <form onSubmit={onSubmit} aria-label='Contact Form'>
      {success && <p className={styles.success} aria-label='Success Message'>{t('success')}</p>}
      {error && <p className={styles.error} aria-label='Error Message'>{t('error')}</p>}

      <div className={styles.inlineInputs}>
        <Input type='text' {...getField(Field.name)} />
        <Input type='email' {...getField(Field.email)} />
      </div>

      <Input type='textarea' {...getField(Field.message)} />
      <Button text={t('button')} type='submit' loading={loading} onClick={(e) => { e.stopPropagation() }} />
    </form>
  )
}

export default ContactForm