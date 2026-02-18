import { Suspense, type FC } from 'react'

import useImage, { type ImageModule } from '@/hooks/useImage'

const ICONS = import.meta.glob<ImageModule>('./icons/*.svg')

export enum Icons {
  // Mobile menu
  Menu = 'menu',
  Cross = 'cross',

  // Source links
  Code = 'code',
  Image = 'image',
  Pen = 'pen',
}

type Props = {
  icon: Icons
  label?: string
  className?: string
}

const Icon: FC<Props> = ({ icon, label, className }) => (
  <Suspense>
    <img
      className={className}
      data-variant={icon}
      src={useImage(ICONS, (key) => key === `./icons/${icon}.svg`)}
      alt={label}
    />
  </Suspense>
)

export default Icon