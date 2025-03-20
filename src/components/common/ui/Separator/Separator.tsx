import React, { SVGLineElementAttributes } from 'react';

type Props = {
  direction: 'vertical' | 'horizontal';
  containerClassName?: string;
} & SVGLineElementAttributes<SVGLineElement>;

const Separator = ({ direction, containerClassName, ...props }: Props) => {
  return (
    <svg
      width={direction === 'vertical' ? 1 : undefined}
      height={direction === 'horizontal' ? 1 : undefined}
      className={containerClassName}
    >
      <line
        x1={0}
        x2={direction === 'vertical' ? 0 : '100%'}
        y1={0}
        y2={direction === 'horizontal' ? 0 : '100%'}
        fill="none"
        stroke="#fff"
        strokeWidth={1}
        strokeDasharray={10}
        strokeDashoffset={0}
        strokeLinecap="round"
        {...props}
      />
    </svg>
  );
};

export default Separator;
