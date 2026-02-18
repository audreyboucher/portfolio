import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Section, InteractiveGallery, type AccordionSlide } from '@/components'
import useImage, { type ImageModule } from '@/hooks/useImage'

import styles from './AboutMeSection.module.scss'

const IMAGES = import.meta.glob<ImageModule>('./images/*.(png|jpg|jpeg|gif)')

const AboutMeSection: FC = () => {
  const { t } = useTranslation('default', { keyPrefix: 'about' })

  const getImage = (name: string): string => useImage(IMAGES, (key) => key === `./images/${name}`)!

  const SLIDES: AccordionSlide[] = [
    {
      keywords: [t('keywords.curiosity'), t('keywords.consistency')],
      description: t('paragraphs.curiosity').split('\n'),
      cover: [getImage('triathlon.jpeg')],
    },
    {
      keywords: [t('keywords.empathy'), t('keywords.communication')],
      description: t('paragraphs.empathy').split('\n'),
      cover: [
        getImage('activism.gif'),
        getImage('activism.jpg'),
      ],
      className: styles.topAligned,
    },
    {
      keywords: [t('keywords.patience'), t('keywords.attentiveness')],
      description: t('paragraphs.patience').split('\n'),
      cover: [getImage('dog.jpg')],
    },
  ]

  return (
    <Section anchor='about' background='secondary' containerClassName={styles.container}>
      <InteractiveGallery title={t('title')} slides={SLIDES} interval={30} />
    </Section>
  )
}

export default AboutMeSection