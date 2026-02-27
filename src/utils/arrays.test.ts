import { shuffleExceptFirst, firstGoesLast } from './arrays'

describe('arrays (utils)', () => {
  describe('shuffleExceptFirst', () => {
    it('keeps the first element in the first position', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = shuffleExceptFirst(arr)
      
      expect(result[0]).toBe(1)
    })

    it('contains all original elements after shuffle', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = shuffleExceptFirst(arr)
      
      expect(result.sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5])
    })

    it('handles array with single element', () => {
      const arr = [1]
      const result = shuffleExceptFirst(arr)
      
      expect(result).toEqual([1])
    })

    it('handles array with two elements', () => {
      const arr = [1, 2]
      const result = shuffleExceptFirst(arr)
      
      expect(result[0]).toBe(1)
      expect(result.length).toBe(2)
    })

    it('works with strings', () => {
      const arr = ['first', 'second', 'third', 'fourth']
      const result = shuffleExceptFirst(arr)
      
      expect(result[0]).toBe('first')
      expect(result).toHaveLength(4)
    })

    it('actually shuffles the elements after the first one', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = shuffleExceptFirst(arr)
      const isShuffled = result.slice(1).some((num, index) => num !== arr[index + 1])

      expect(isShuffled).toBe(true)
    })
  })

  describe('firstGoesLast', () => {
    it('moves first element to the end', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = firstGoesLast(arr)
      
      expect(result[result.length - 1]).toBe(1)
    })

    it('maintains the order of other elements', () => {
      const arr = [1, 2, 3, 4, 5]
      const result = firstGoesLast(arr)
      
      expect(result).toEqual([2, 3, 4, 5, 1])
    })

    it('handles array with single element', () => {
      const arr = [42]
      const result = firstGoesLast(arr)
      
      expect(result).toEqual([42])
    })

    it('handles array with two elements', () => {
      const arr = [1, 2]
      const result = firstGoesLast(arr)
      
      expect(result).toEqual([2, 1])
    })

    it('does not mutate the original array', () => {
      const arr = [1, 2, 3]
      const original = [...arr]
      
      firstGoesLast(arr)
      
      expect(arr).toEqual(original)
    })
  })
})