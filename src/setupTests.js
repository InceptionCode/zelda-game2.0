import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

global.alert = jest.fn()

afterEach(() => {
  cleanup()
})
