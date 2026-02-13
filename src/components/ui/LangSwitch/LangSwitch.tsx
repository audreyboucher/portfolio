import { useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'

import { supportedLanguages, type Languages } from '@/i18next'

import styles from './LangSwitch.module.scss'

type Props = {
  disabled?: boolean
}

const LangSwitch: FC<Props> = ({ disabled }) => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<Languages>(i18n.language as Languages)

  const toggleLanguage = () => {
    if (!disabled) {
      const newValue = supportedLanguages.find((value) => value !== language)!

      setLanguage(newValue)
      i18n.changeLanguage(newValue)
    }
  }

  return (
    <fieldset
      className={styles.container}
      onClick={toggleLanguage}
      onKeyUp={({ key }) => { if ([' ', 'Enter'].includes(key)) toggleLanguage() }}
      tabIndex={disabled ? -1 : 0}
      aria-label="Language Switch"
      aria-disabled={disabled}
      disabled={disabled}
    >
      {supportedLanguages.map((lang) =>
        <label htmlFor={`lang-${lang}`} key={lang}>{lang.toUpperCase()}</label>
      )}

      <div className={styles.switch}>
        <div className={styles.shadow}></div>

        {supportedLanguages.map((lang) => 
          <label htmlFor={`lang-${lang}`} key={lang}>
            <input
              type="checkbox"
              id={`lang-${lang}`}
              name="language"
              defaultChecked={lang === language}
              value={lang}
              readOnly
              hidden
            />
          </label>
        )}

        <span className={styles.toggle}></span>
      </div>
    </fieldset>
  )
}

export default LangSwitch