import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { AboutPage } from './AboutPage'

describe('AboutPage', () => {
  it('should render component', () => {
    const { getByTestId } = render(<BrowserRouter><AboutPage /></BrowserRouter>)

    expect(getByTestId('AboutPage')).toBeInTheDocument()
  })

  describe('BackButton', () => {
    it('should render', () => {
      const { getByTestId } = render(<BrowserRouter><AboutPage /></BrowserRouter>)

      expect(getByTestId(`AboutPage-BackButton`)).toBeInTheDocument()
    })
  })
})
