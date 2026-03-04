import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Section, InteractiveGallery, type AccordionSlide } from '@/components'
import useImage, { type ImageModule } from '@/hooks/useImage'

import styles from './AboutMeSection.module.scss'

const IMAGES = import.meta.glob<ImageModule>('./images/*.{jpg,jpeg,gif}')

const AboutMeSection: FC = () => {
  const { t } = useTranslation('default', { keyPrefix: 'about' })

  const useSlideImage = (name: string): string => useImage(IMAGES, (key) => key.endsWith(name))!

  const covers: AccordionSlide['cover'][] = [
    [useSlideImage('triathlon.jpeg')],
    [useSlideImage('activism.gif'), useSlideImage('activism.jpg')],
    [useSlideImage('dog.jpg')],
  ]

  const SLIDES: AccordionSlide[] = Object.values(t('slides', { returnObjects: true }))
    .map(({ keywords, paragraphs } : { keywords: [string, string], paragraphs: string[] }, index) => ({
      keywords,
      description: paragraphs,
      cover: covers[index],
    }))

  return (
    <Section anchor='about' background='secondary' containerClassName={styles.container}>
      <InteractiveGallery title={t('title')} slides={SLIDES} interval={30} />
    </Section>
  )
}

export default AboutMeSection