import { useTranslation } from 'react-i18next'
import { InlineWidget } from 'react-calendly'

import { ContactForm, Section } from '@/components'

import styles from './ContactSection.module.scss'

const ContactSection = () => {
  const { t } = useTranslation('default', { keyPrefix: 'contact' })

  return (
    <Section anchor='contact' background='secondary' containerClassName={styles.section}>
      <div className={styles.container}>
        <div>
          <h4 className={styles.title}>{t('title')}</h4>
          <p>{t('subtitle')}</p>
          <ContactForm />
        </div>

        <InlineWidget
          url='https://calendly.com/audreyboucher95/30min'
          pageSettings={{
            hideLandingPageDetails: true,
            backgroundColor: '#0A0B12',
            primaryColor: '#007AFF',
            textColor: '#FFFFFF',
          }}
          className={styles.calendly}
        />
      </div>
    </Section>
  )
}

export default ContactSection