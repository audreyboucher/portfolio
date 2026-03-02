import sourceLinks from './SourceLinks.json'
import type { Props as SourceLinkType } from './SourceLink'

const STORYBOOK_LINK_PLACEHOLDER = '__STORYBOOK_URL__'

const getStorybookLink = (): string => {
  const configuredStorybookLink = (import.meta.env.VITE_STORYBOOK_URL as string | undefined)?.trim()

  if (configuredStorybookLink) return configuredStorybookLink

  const baseUrl = import.meta.env.BASE_URL || '/'
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`

  return `${normalizedBaseUrl}storybook/`
}

const SOURCE_LINKS: SourceLinkType[] = (sourceLinks as SourceLinkType[]).map((sourceLink) => {
  if (sourceLink.link !== STORYBOOK_LINK_PLACEHOLDER) {
    return sourceLink
  }

  return {
    ...sourceLink,
    link: getStorybookLink(),
  }
})

export default SOURCE_LINKS