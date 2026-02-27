import { isIdValid } from './element'

describe('element (utils)', () => {
  describe('isIdValid', () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    it('returns false when id is undefined', () => {
      expect(isIdValid()).toBe(false)
    })

    it('returns false when id is empty string', () => {
      expect(isIdValid('')).toBe(false)
    })

    it('returns false when element with id does not exist', () => {
      expect(isIdValid('non-existent-id')).toBe(false)
    })

    it('returns true when element with id exists', () => {
      const element = document.createElement('div')

      element.id = 'test-id'
      document.body.appendChild(element)

      expect(isIdValid('test-id')).toBe(true)
    })

    it('returns true for multiple existing elements by their ids', () => {
      const element1 = document.createElement('div')
      const element2 = document.createElement('section')

      element1.id = 'id-1'
      element2.id = 'id-2'
      
      document.body.appendChild(element1)
      document.body.appendChild(element2)

      expect(isIdValid('id-1')).toBe(true)
      expect(isIdValid('id-2')).toBe(true)
    })

    it('returns false after element is removed', () => {
      const element = document.createElement('div')

      element.id = 'temporary-id'
      document.body.appendChild(element)
      
      expect(isIdValid('temporary-id')).toBe(true)
      
      element.remove()
      
      expect(isIdValid('temporary-id')).toBe(false)
    })
  })
})