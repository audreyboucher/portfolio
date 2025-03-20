import React, { useState, useEffect, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './ProgressBar.module.scss';
import colors from '../../../../styles/_colors.scss';

type CommonProps = {
  type?: 'line' | 'circle';
  value?: number;
  color?: string;
  animationDuration: number;
  className?: string;
};

type CircleOnlyProps = {
  launchAnimation?: boolean;
  children?: ReactElement;
  containerClassName?: string;
};

type Props = CommonProps & CircleOnlyProps;

const LineProgressBar = ({ value, color = colors.default, animationDuration, className }: Omit<CommonProps, 'type'>) =>
  <div className={classNames(styles.lineProgressBar, { [styles.inProgress]: !!value }, className)}>
    <div style={{
      width: `${value || 0}%`,
      transitionDuration: !!value ? `${ animationDuration }s` : undefined,
      background: color
    }} />
  </div>;

const CircleProgressBar = ({
  value = 0,
  color = colors.default,
  launchAnimation = false,
  animationDuration,
  children,
  containerClassName,
  className
}: Omit<Props, 'type'>) => {
  const [progress, setProgress] = useState<number>(0);

  const circumference = parseInt(styles.RADIUS) * Math.PI * 2;
  const getDash = (): number => progress * circumference / 100;

  useEffect(() => {
    if (launchAnimation) setTimeout(() => setProgress(value), 500);
  }, [launchAnimation, value]);

  return (
    <div className={classNames(styles.circleProgressBarContainer, containerClassName)}>
      <div>
        <svg className={classNames(styles.circleProgressBar, className)}>
          <circle
            stroke={color}
            strokeDasharray={`${getDash()} ${circumference - getDash()}`}
            style={{ transitionDuration: `${ animationDuration }s` }}
          />
        </svg>
        { children }
      </div>
    </div>
  );
};

const ProgressBar = ({ type = 'line', ...props }: Props) =>
  type === 'circle' ? <CircleProgressBar {...props} /> : <LineProgressBar {...props} />
;

export default ProgressBar;