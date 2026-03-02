import classNames from 'classnames'

import { Icon, Icons, Separator, Tooltip } from '@/components/ui'

import styles from './Experience.module.scss'

export type ExperienceType = {
  company: string
  position: string
  description: string[]
  contractType?: string
  location: string
  date: [number, number?]
  tools: string[]
}

type Props = ExperienceType & { containerClassName?: string; }

const Experience = ({ company, position, description, contractType, location, date: [start, end], tools, containerClassName }: Props) => {
  const keyBase = `${company.toLowerCase().replace(' ', '_')}-${position.toLowerCase().replace(' ', '_')}`

  return (
    <article className={classNames(styles.container, containerClassName)}>
      <div className={styles.details}>
        <div>
          <p>{start + (end ? `-${end}` : '')}</p>
          <h6>{company}</h6>
        </div>

        <h5>{position}</h5>
        <ul>{description.map((el, index) => <li key={`${keyBase}-details-${index}`}>{el}</li>)}</ul>
        <p>{contractType}</p>
        <p>{location}</p>
      </div>

      <ul className={styles.tools}>
        {tools.map((el, index) =>
          <li key={`${keyBase}-tools-${index}`}>
            <Tooltip text={el} infoBoxClassName={styles.tooltip}>
              <Icon icon={el.toLocaleLowerCase() as Icons} label={el} />
            </Tooltip>
          </li>
        )}
      </ul>

      <div className={classNames(styles.lines, styles.mobileOnly)} aria-hidden>
        {['first' , 'top', 'side', 'bottom', 'last'].map((line, index) =>
          <Separator
            key={`${keyBase}-line-${line}`}
            direction={index % 2 === 1 ? 'horizontal' : 'vertical'}
            containerClassName={styles[`${line}Line`]}
          />
        )}
      </div>
    </article>
  )
}

export default Experience