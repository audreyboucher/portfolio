import { scrollToTop, scrollToAnchor } from './scroll'

describe('scroll (utils)', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  describe('scrollToTop', () => {
    it('calls window.scrollTo with top 0 and smooth behavior', () => {
      const scrollTo = vi.fn()

      vi.stubGlobal('scrollTo', scrollTo)
      
      scrollToTop()
      
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })

    it('can be called multiple times', () => {
      const scrollTo = vi.fn()

      vi.stubGlobal('scrollTo', scrollTo)
      
      scrollToTop()
      scrollToTop()
      
      expect(scrollTo).toHaveBeenCalledTimes(2)
    })
  })

  describe('scrollToAnchor', () => {
    beforeEach(() => {
      Element.prototype.scrollIntoView = vi.fn()
    })

    it('does nothing when id is undefined', () => {
      const scrollIntoView = vi.fn()

      Element.prototype.scrollIntoView = scrollIntoView
      
      scrollToAnchor()
      
      expect(scrollIntoView).not.toHaveBeenCalled()
    })

    it('does nothing when id is empty string', () => {
      const scrollIntoView = vi.fn()

      Element.prototype.scrollIntoView = scrollIntoView
      
      scrollToAnchor('')
      
      expect(scrollIntoView).not.toHaveBeenCalled()
    })

    it('does nothing when element with id does not exist', () => {
      const scrollIntoView = vi.fn()

      Element.prototype.scrollIntoView = scrollIntoView
      
      scrollToAnchor('non-existent-id')
      
      expect(scrollIntoView).not.toHaveBeenCalled()
    })

    it('calls scrollIntoView on existing element', () => {
      const scrollIntoView = vi.fn()

      Element.prototype.scrollIntoView = scrollIntoView
      
      const element = document.createElement('div')
      element.id = 'target-section'
      document.body.appendChild(element)
      
      scrollToAnchor('target-section')
      
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('scrolls to the correct element when multiple exist', () => {
      const scrollIntoView = vi.fn()

      Element.prototype.scrollIntoView = scrollIntoView
      
      const element1 = document.createElement('div')
      const element2 = document.createElement('div')
      
      element1.id = 'section-1'
      element2.id = 'section-2'
      
      document.body.appendChild(element1)
      document.body.appendChild(element2)
      
      scrollToAnchor('section-2')
      
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })
  })
})