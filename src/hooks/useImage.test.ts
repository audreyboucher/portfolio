import { renderHook, waitFor } from '@testing-library/react'

import useImage, { type ImageModule } from './useImage'

describe('useImage (hooks)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns undefined initially', () => {
    const { result } = renderHook(() => useImage({
      'image1.png': () => Promise.resolve({ default: 'image1-path' }),
    }, () => false))

    expect(result.current).toBeUndefined()
  })

  it('loads an image when findFile matches', async () => {
    const mockImagePath = 'loaded-image.png'

    const { result } = renderHook(() => useImage({
      'image1.png': () => Promise.resolve({ default: mockImagePath } as ImageModule),
    }, (key: string) => key === 'image1.png'))

    await waitFor(() => {
      expect(result.current).toBe(mockImagePath)
    })
  })

  it('finds and loads the correct image', async () => {
    const image1Path = 'image1-path'
    const image2Path = 'image2-path'

    const { result } = renderHook(() => useImage({
      'image1.png': () => Promise.resolve({ default: image1Path } as ImageModule),
      'image2.png': () => Promise.resolve({ default: image2Path } as ImageModule),
    }, (key: string) => key === 'image2.png'))

    await waitFor(() => {
      expect(result.current).toBe(image2Path)
    })
  })

  it('handles no matching file', async () => {
    const { result } = renderHook(() => useImage({
      'image1.png': () => Promise.resolve({ default: 'image1-path' } as ImageModule),
      'image2.png': () => Promise.resolve({ default: 'image2-path' } as ImageModule),
    }, () => false))

    await waitFor(() => {
      expect(result.current).toBeUndefined()
    })
  })

  it('can be called with different parameters', () => {
    expect(() => {
      renderHook(() => useImage({
      'image1.png': () => Promise.resolve({ default: 'path1' } as ImageModule),
      'image2.png': () => Promise.resolve({ default: 'path2' } as ImageModule),
    }, (key) => key === 'image1.png'))
    }).not.toThrow()
  })

  it('reloads image when findFile function changes', async () => {
    const image1Path = 'image1.png'
    const images = {
      'image1.png': () => Promise.resolve({ default: image1Path } as ImageModule),
      'image2.png': () => Promise.resolve({ default: 'image2.png' } as ImageModule),
    }

    const { result, rerender } = renderHook(
      (props) => useImage(props.images, props.findFile),
      {
        initialProps: {
          images,
          findFile: (key: string): boolean => key === 'image1.png'
        },
      }
    )

    await waitFor(() => {
      expect(result.current).toBe(image1Path)
    })

    rerender({ images, findFile: (key: string): boolean => key === 'image2.png' })

    await waitFor(() => {
      expect(result.current).toBe('image2.png')
    })
  })

  it('handles empty images object', async () => {
    const { result } = renderHook(() => useImage({}, () => true))

    await waitFor(() => {
      expect(result.current).toBeUndefined()
    })
  })

  it('only calls the matching image loader once', async () => {
    const loader = vi.fn().mockResolvedValue({ default: 'image.png' } as ImageModule)
    const images = { 'image1.png': loader }
    const findFile = (key: string) => key === 'image1.png'

    const { result } = renderHook(() => useImage(images, findFile))

    await waitFor(() => {
      expect(result.current).toBe('image.png')
    })

    expect(loader).toHaveBeenCalledTimes(1)
  })

  it('only loads image if findFile returns true for that key', async () => {
    const loader1 = vi.fn().mockResolvedValue({ default: 'image1.png' } as ImageModule)
    const loader2 = vi.fn().mockResolvedValue({ default: 'image2.png' } as ImageModule)
    const images = {
      'image1.png': loader1,
      'image2.png': loader2,
    }
    const findFile = (key: string) => key === 'image1.png'

    const { result } = renderHook(() => useImage(images, findFile))

    await waitFor(() => {
      expect(result.current).toBe('image1.png')
    })

    expect(loader1).toHaveBeenCalledTimes(1)
    expect(loader2).not.toHaveBeenCalled()
  })
})