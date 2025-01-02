'use client'

import type { ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { getQueryClient } from '@/libs/query'

export function TanstackQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}