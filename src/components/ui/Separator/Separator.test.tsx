import { render } from '@testing-library/react'

import Separator from './Separator'

describe('Separator (components/ui)', () => {
  it('properly renders the component', () => {
    const { getByRole } = render(<Separator direction='horizontal' />)
    expect(getByRole('separator')).toBeInTheDocument()
  })

  it('renders a dashed line with the correct stroke color and width', () => {
    const { getByRole } = render(<Separator direction='horizontal' />)
    const line = getByRole('separator').querySelector('line')

    expect(line).toHaveAttribute('stroke', '#fff')
    expect(line).toHaveAttribute('stroke-width', '1')
    expect(line).toHaveAttribute('stroke-dasharray', '10')
  })

  it('renders a horizontal separator when the direction is set to horizontal', () => {
    const { getByRole } = render(<Separator direction='horizontal' />)
    const line = getByRole('separator').querySelector('line')

    expect(line).toHaveAttribute('x2', '100%')
    expect(line).toHaveAttribute('y2', '0')
  })

  it('renders a vertical separator when the direction is set to vertical', () => {
    const { getByRole } = render(<Separator direction='vertical' />)
    const line = getByRole('separator').querySelector('line')

    expect(line).toHaveAttribute('x2', '0')
    expect(line).toHaveAttribute('y2', '100%')
  })

  it('passes the rest of the props to the line element', () => {
    const { getByRole } = render(<Separator direction='horizontal' stroke='red' strokeWidth={2} />)
    const line = getByRole('separator').querySelector('line')

    expect(line).toHaveAttribute('stroke', 'red')
    expect(line).toHaveAttribute('stroke-width', '2')
  })
})