import type { FC } from 'react'

import { Nav } from '@/components'
import { LangSwitch, Logo, LogoVersion } from '@/components/ui'

import { scrollToAnchor } from '@/utils/scroll'

import styles from './Header.module.scss'

const Header: FC = () => {
  const scrollToTop = () => scrollToAnchor('home')

  return (
    <header className={styles.container}>
      <div>
        <aside
          className={styles.logoContainer}
          onClick={scrollToTop}
          onKeyUp={({ key }) => { if ([' ', 'Enter'].includes(key)) scrollToTop() }}
          tabIndex={0}
          aria-label="Scroll to top"
        >
          <Logo version={LogoVersion.Dark} containerClassName={styles.logo} />
          <h1 aria-label="Title">Audrey B.</h1>
        </aside>

        <div className={styles.navContainer}>
          <Nav />
          <LangSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header