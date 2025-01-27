import React from 'react'
import { render } from '@testing-library/react'
import { AllProviders } from './test-providers'

const customRender = (ui, options = {}) => {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  })
}

export * from '@testing-library/react'
export { customRender as render }