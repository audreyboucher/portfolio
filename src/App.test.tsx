import { waitFor, render } from '@testing-library/react'

import App from './App'

const mockURL = (pathname: string): void => {
  vi.stubGlobal('location', { ...globalThis.window.location, pathname })
}

describe('App', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  describe('router', () => {
    it('displays the homepage on / route', () => {
      mockURL('/')

      const { getByTestId } = render(<App />);

      waitFor(() => {
        expect(getByTestId('home')).toBeInTheDocument()
      })
    })

    it('redirects to the 404 error page on every other route', () => {
      mockURL('/something-wrong')

      const { getByTestId } = render(<App />)

      waitFor(() => {
        expect(getByTestId('404')).toBeInTheDocument()
      })
    })
  })

  describe('language', () => {
    it('switches to the EN language on /en routes', () => {
      mockURL('/en')

      const { getByTestId } = render(<App />)

      waitFor(() => {
        expect(getByTestId('home')).toBeInTheDocument()
        expect(document.documentElement).toHaveAttribute('lang', 'en')
      });
    });

    it('switches to the FR language on /fr routes', () => {
      mockURL('/fr')

      const { getByTestId } = render(<App />)

      waitFor(() => {
        expect(getByTestId('home')).toBeInTheDocument();
        expect(document.documentElement).toHaveAttribute('lang', 'fr');
      })
    })
  })
})