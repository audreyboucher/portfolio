import { useTranslation } from 'react-i18next'

import { FooterLink, type FooterLinkType } from '@/components'

import styles from './Footer.module.scss'

const Footer = () => {
  const { t } = useTranslation('default', { keyPrefix: 'footer' })

  const links: FooterLinkType[] = [
    {
      name: t('linkedin.name'),
      detail: t('linkedin.detail'),
      url: 'https://www.linkedin.com/in/audrey-boucher-43247159/'
    },
    {
      name: t('location.name'),
      detail: '44300 Nantes, France'
    },
    {
      name: t('phone.name'),
      detail: '+33 (0)6 23 16 19 06',
      url: 'tel:+33623161906'
    },
    {
      name: t('email.name'),
      detail: 'audreyboucher95@gmail.com',
      url: 'mailto:audreyboucher95@gmail.com'
    }
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          {links.map((props, index) => <FooterLink key={index} {...props} />)}
        </div>

        <p className={styles.copyright}>© Audrey Boucher 2026 | All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer