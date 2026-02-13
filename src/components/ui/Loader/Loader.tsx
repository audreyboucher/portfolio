import { useState, useEffect, type FC } from 'react'

import styles from './Loader.module.scss'

type Props = {
  isLoading?: boolean
}

const Loader: FC<Props> = ({ isLoading: tmp }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const onPageLoad = () => {
    setIsLoading(false)
    document.documentElement.style.overflow = 'auto'
  };

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'

    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad, false)
      return () => window.removeEventListener('load', onPageLoad)
    }
  }, [])

  return isLoading || tmp ? (
    <section className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 500 150">
        <defs>
          <text id="Text" x="100" y="100">Loading</text>
          <circle id="Circle" cx="100" cy="80" r="100" className={styles.circle} />
        </defs>

        <mask id="Mask">
          <use href="#Circle" fill="var(--text)" />
        </mask>

        <use href="#Text" fill="var(--primary)" mask="url(#Mask)" />
        <use href="#Text" stroke="var(--text)" strokeWidth=".75" strokeLinejoin="round" fill="none" />
      </svg>
    </section>
  ) : null
}

export default Loader