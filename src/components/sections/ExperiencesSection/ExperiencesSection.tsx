import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Section, Experience, type ExperienceType } from '@/components'
import { Separator } from '@/components/ui'

import styles from './ExperiencesSection.module.scss'

const ExperiencesSection = () => {
  const { t } = useTranslation('default', { keyPrefix: 'experiences' })

  const experiences = Object.values(t('list', { returnObjects: true })) as ExperienceType[]

  return (
    <Section anchor="experiences" containerClassName={styles.section}>
      <div className={styles.container}>
        <h4 className={styles.title}>{t('title')}</h4>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <div className={styles.experiencesContainer}>
          {experiences.map((props, index) => <Experience key={index} {...props} />)}
          <Separator direction="vertical" containerClassName={classNames(styles.line, styles.desktopOnly)} aria-hidden />
        </div>
      </div>
    </Section>
  )
}

export default ExperiencesSection