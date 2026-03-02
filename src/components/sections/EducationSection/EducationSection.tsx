import { useTranslation } from 'react-i18next'

import { Section, Formation, type FormationType } from '@/components'

import styles from './EducationSection.module.scss'

const EducationSection = () => {
  const { t } = useTranslation('default', { keyPrefix: 'formations' })

  const formations: FormationType[] = [
    {
      name: t('iesa.name'),
      school: t('iesa.school'),
      description: Object.values(t('iesa.description', { returnObjects: true })) as string[],
      date: [2012, 2015],
    },
    {
      name: t('42.name'),
      school: t('42.school'),
      description: Object.values(t('42.description', { returnObjects: true })) as string[],
      date: [2015, 2017],
    },
  ]

  return (
    <Section anchor='education' background='secondary' containerClassName={styles.container}>
      <div className={styles.contentContainer}>
        <h4 className={styles.title}>{t('title')}</h4>
        { formations.map((props, index) => <Formation key={index} {...props} />) }
      </div>
    </Section>
  )
}

export default EducationSection