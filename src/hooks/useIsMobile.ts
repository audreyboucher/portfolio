'use client'

import { useState, useEffect } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const maxWidth = 767
  const mediaQuery = window.matchMedia(`(max-width: ${maxWidth})`)
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = [ 'android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone', 'mobile' ]

  const checkIsMobile = (): boolean => mediaQuery.matches || mobileKeywords.some((keyword) => userAgent.includes(keyword)) || window.innerWidth <= maxWidth
  const handleChange = () =>  setIsMobile(checkIsMobile())

  useEffect(() => {
    handleChange()

    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', handleChange)
    else mediaQuery.addListener(handleChange)

    window.addEventListener('resize', handleChange)

    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', handleChange)
      else mediaQuery.removeListener(handleChange)

      window.removeEventListener('resize', handleChange)
    }
  })

  return {
    isMobile,
  }
}

export default useIsMobile