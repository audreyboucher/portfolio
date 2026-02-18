'use client'

import { useState, useEffect } from 'react'

export type ImageModule = {
  default: string
}

const useImage = (
  images: Record<string, () => Promise<ImageModule>>,
  findFile: (key: string) => boolean
): string | undefined => {
  const [image, setImage] = useState<string>()

  useEffect(() => {
    const matchedKey = Object.keys(images).find(findFile)

    if (matchedKey) {
      images[matchedKey]()
        .then((module) => setImage(module.default))
        .catch((err) => { throw err })
    }
  }, [images, findFile])

  return image
}

export default useImage