import React from 'react'
// import { push } from 'connected-react-router'
import { render } from '@testing-library/react'
import { useDispatch } from 'react-redux'

import { AboutPage } from './AboutPage'

//#region Mocks
const useDispatchMock = useDispatch as jest.Mock
// const pushMock = push as jest.Mock
const dispatchSpy = jest.fn()
const pushSpy = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('connected-react-router', () => ({
  push: jest.fn(),
}))
//#endregion

describe('AboutPage', () => {
  it('should render component', () => {
    const { getByTestId } = render(<AboutPage />)

    expect(getByTestId('AboutPage')).toBeInTheDocument()
  })

  describe('BackButton', () => {
    it('should render', () => {
      const { getByTestId } = render(<AboutPage />)

      expect(getByTestId(`AboutPage-BackButton`)).toBeInTheDocument()
    })
  })
})
