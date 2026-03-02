import type { FC } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import classNames from 'classnames'

import useImage, { type ImageModule } from '@/hooks/useImage'
import { TextCarousel, SourceLink, Section, SOURCE_LINKS } from '@/components'
import { Button } from '@/components/ui'
import { defaultLanguage } from '@/i18next'

import styles from './SummarySection.module.scss'
import profilePicture from './images/profile_picture.jpg'

const RESUMES = import.meta.glob<ImageModule>('./images/*.pdf')

const SummarySection: FC = () => {
  const { t, i18n } = useTranslation('default', { keyPrefix: 'summary' })
  const { t: t2 } = useTranslation('default', { keyPrefix: 'source links' })
  const resume = useImage(RESUMES, (key) => key.includes((i18n.language || defaultLanguage).toUpperCase()))

  const source_links = SOURCE_LINKS

  return (
    <Section anchor="home" containerClassName={styles.container}>
      <>
        <article className={styles.textContainer}>
          <div>
            <h2>{t('greeting')}</h2>
            <h3>
              <Trans
                i18nKey="carousel.main"
                t={t}
                components={{
                  textCarousel: (
                    <TextCarousel
                      words={['react', 'vue', 'javascript', 'creative', 'enthusiast', 'passionate'].map((word) => t(`carousel.words.${word}`))}
                      textClassName={styles.highlightedText}
                    />
                  )
                }}
              />
            </h3>
          </div>

          <p>{t('description')}</p>
          <Button text={t('buttons.download')} onClick={() => window.open(resume)} aria-label='Download Resume' />
        </article>

        <figure className={styles.imageContainer}>
          <img src={profilePicture} alt="Audrey Boucher" />
        </figure>

        <div className={classNames(styles.linksContainer, styles.desktopOnly)}>
          { source_links.map(({ text, ...props }, index) => <SourceLink key={index} text={t2(text)} {...props} />) }
        </div>
      </>
    </Section>
  )
}

export default SummarySection