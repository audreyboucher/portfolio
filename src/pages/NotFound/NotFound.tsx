import { useTranslation } from 'react-i18next'

import { useLanguageNavigation } from '@/hooks/useLanguageNavigation'
import { Button } from '@/components/ui'

import styles from './NotFound.module.scss'

const NotFound = () => {
  const { t } = useTranslation('default', { keyPrefix: '404' })
  const { navigateTo } = useLanguageNavigation()

  return (
    <main className={styles.container} data-testid="404">
      <div>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>{t('title')}</h2>
        <p className={styles.paragraph}>{t('description')}</p>
        <Button text={t('button')} onClick={() => navigateTo('')} />
      </div>
    </main>
  )
}

export default NotFound