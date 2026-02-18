import { useState, useEffect, type ReactElement } from 'react'
import classNames from 'classnames'

import styles from './ProgressBar.module.scss'

export enum ProgressBarType {
  Line = 'line',
  Circle = 'circle',
}

type CommonProps = {
  type?: ProgressBarType
  value?: number
  color?: string
  animationDuration?: number // in seconds
  className?: string
}

type CircleOnlyProps = {
  launchAnimation?: boolean
  children?: ReactElement
  containerClassName?: string
}

type Props = CommonProps & CircleOnlyProps

export const ANIMATION_DURATION = 1

const LineProgressBar = ({
  value,
  color,
  animationDuration = ANIMATION_DURATION,
  className
}: Omit<CommonProps, 'type'>) =>
  <div className={classNames(styles.lineProgressBar, { [styles.inProgress]: !!value }, className)}>
    <div style={{
      width: `${value || 0}%`,
      transitionDuration: !!value ? `${animationDuration}s` : undefined,
      background: color
    }} />
  </div>

const CircleProgressBar = ({
  value = 0,
  color,
  launchAnimation = false,
  animationDuration = ANIMATION_DURATION,
  children,
  containerClassName,
  className
}: Omit<Props, 'type'>) => {
  const [progress, setProgress] = useState<number>(0)

  const circumference = 360
  const dash = progress * circumference / 100

  useEffect(() => {
    if (launchAnimation) setTimeout(() => setProgress(value), 500)
  }, [launchAnimation, value])

  return (
    <div className={classNames(styles.circleProgressBarContainer, containerClassName)}>
      <div>
        <svg className={classNames(styles.circleProgressBar, className)}>
          <circle
            style={{
              stroke: color,
              strokeDasharray: `${dash} ${circumference - dash}`,
              transitionDuration: `${animationDuration}s`,
            }}
          />
        </svg>
        { children }
      </div>
    </div>
  )
}

const ProgressBar = ({ type = ProgressBarType.Line, ...props }: Props) =>
  type === ProgressBarType.Circle ? <CircleProgressBar {...props} /> : <LineProgressBar {...props} />

export default ProgressBar