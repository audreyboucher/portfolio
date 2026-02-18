import { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import useIsMobile from '@/hooks/useIsMobile'

import { NavItem, type NavItemProps, SourceLink, SOURCE_LINKS, type SourceLinkType } from '@/components'
import { Button, Icon, Icons } from '@/components/ui'

import styles from './Nav.module.scss'

type Props = {
  disabled?: boolean
}

const SourceLinks: FC<Props> = ({ disabled }) => {
  const { t } = useTranslation('default', { keyPrefix: 'source links' })
  const source_links = SOURCE_LINKS as SourceLinkType[]

  return (
    <div className={classNames(styles.sourceLinks, styles.mobileOnly)}>
      { source_links.map(({ text, ...props }, index) => <SourceLink text={t(text)} {...props} disabled={disabled} key={index} />) }
    </div>
  )
}

const Nav: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)
  const { isMobile } = useIsMobile()
  const { t } = useTranslation('default', { keyPrefix: 'nav' })

  const itemProps: Partial<NavItemProps> = {
    onClick: () => setIsMenuOpened(false),
  }

  return (
    <nav className={classNames({ [styles.isMenuOpened]: isMenuOpened })}>
      <Button
        onClick={() => setIsMenuOpened((tmp) => !tmp)}
        className={classNames(styles.button, styles.mobileOnly)}
        tabIndex={0}
        aria-label={isMenuOpened ? 'Close menu' : 'Open menu'}
      >
        <Icon icon={isMenuOpened ? Icons.Cross : Icons.Menu} />
      </Button>

      <ul className={styles.list} aria-label="Menu" {...(!isMenuOpened && isMobile ? { 'aria-hidden': true } : {})}>
        <div>
          <div>
            <div className={styles.itemsContainer}>
              <NavItem name={t('home')} anchor="home" {...itemProps}  />
              <NavItem
                name={t('about.main')}
                anchor="about"
                subMenu={[
                  { name: t('about.submenus.me'), anchor: 'about', },
                  { name: t('about.submenus.skills'), anchor: 'skills', },
                  { name: t('about.submenus.education'), anchor: 'education', },
                  { name: t('about.submenus.experiences'), anchor: 'experiences', },
                ]}
                {...itemProps}
              />
              <NavItem
                name={t('projects.main')}
                subMenu={[
                  { name: t('projects.submenus.vag'), disabled: true, },
                ]}
                disabled
              />
              <NavItem name={t('contact')} anchor="contact" {...itemProps} />
            </div>
          </div>

          <SourceLinks />
        </div>

        <span
          className={classNames(styles.overlay, styles.mobileOnly)}
          onClick={() => setIsMenuOpened(false)}
          aria-label="Close menu overlay"
          tabIndex={-1}
        />
      </ul>
    </nav>
  )
}

export default Nav