import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import messages from '@messages/ja.json'

const defaultProviderProps = {
  locale: 'ja',
  messages: messages,
  now: new Date('2024-01-01')
}

export function AllProviders({ children, providerProps = {} }) {
  const mergedProps = {
    ...defaultProviderProps,
    ...providerProps
  }
  
  return (
      <NextIntlClientProvider
          locale={mergedProps.locale}
          messages={mergedProps.messages}
          now={mergedProps.now}
      >
        {children}
      </NextIntlClientProvider>
  )
}