import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import useIsVisible from '@/hooks/useIsVisible'

import { Section, Skill, type SkillType } from '@/components'
import { Separator } from '@/components/ui'

import styles from './SkillsSection.module.scss'

type SkillListProps = {
  list: SkillType[]
  launchAnimation: boolean
}

const SkillsList = ({ list, launchAnimation }: SkillListProps) => (
  <ul className={styles.listContainer}>
    {list.map((props) =>
      <li key={props.name}>
        <Skill {...props} launchAnimation={launchAnimation} />
      </li>
    )}
  </ul>
)

const TECH_SKILLS = {
  HTML: 100,
  CSS: 100,
  SASS: 90,
  Javascript: 85,
  React: 80,
  Vue: 65,
  Django: 50,
  Cypress: 60,
}

const APP_SKILLS = {
  Figma: 80,
  Photoshop: 70,
  Illustrator: 70,
  Xd: 70,
  GitHub: 70,
  GitLab: 75,
  PostgreSQL: 70,
  Jira: 80,
}

const SkillsSection = () => {
  const keyPrefix = 'skills'

  const ref = useRef<HTMLDivElement>(null)
  const targetElementVisible = useIsVisible(ref)
  const { t, i18n } = useTranslation('default', { keyPrefix })

  const listToSkillsList = (list: Record<string, number>): SkillType[] =>
    Object.entries(list).reduce((acc, [key, value]) => {
      acc.push({
        name: key,
        value,
        info: i18n.exists(`${keyPrefix}.${key.toLowerCase()}`) ? t(key.toLowerCase()) : undefined,
      })
      return acc
    }, [] as SkillType[])

  const technologies = listToSkillsList(TECH_SKILLS)
  const apps = listToSkillsList(APP_SKILLS)

  return (
    <Section anchor="skills" background="secondary" containerClassName={styles.section}>
      <div ref={ref} className={styles.container}>
        <h4 className={styles.title}>{t('technologies')} <span>&&</span> {t('apps')}</h4>
        <SkillsList list={technologies} launchAnimation={targetElementVisible} />
        <Separator direction="vertical" containerClassName={styles.desktopOnly} />
        <SkillsList list={apps} launchAnimation={targetElementVisible} />
      </div>
    </Section>
  )
}

export default SkillsSection