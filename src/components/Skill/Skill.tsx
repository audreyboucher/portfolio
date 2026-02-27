import { Icon, Icons, ProgressBar, ProgressBarType, Tooltip } from '@/components/ui'

import styles from './Skill.module.scss'

export type SkillType = {
  name: string
  value: number
  info?: string
}

type Props = SkillType & { launchAnimation?: boolean }

const Skill = ({ name, value, info, launchAnimation = false }: Props) =>
  <ProgressBar
    type={ProgressBarType.Circle}
    value={value}
    color={`var(--skill-${name.toLowerCase()})`}
    animationDuration={2}
    launchAnimation={launchAnimation}
    containerClassName={styles.container}
  >
    <div className={styles.contentContainer}>
      <Icon icon={name.toLowerCase() as Icons} label={name} className={styles.imageContainer} />
      <p>{name}</p>
      {info && <Tooltip text={info} />}
    </div>
  </ProgressBar>

export default Skill