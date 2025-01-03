'use client'

// Type Imports
import { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'

import type { Locale } from '@configs/i18n'
import type { ChildrenType } from '@core/types'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'
import authConfig from '@/configs/auth'

export default function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem(authConfig.storageTokenKeyName)

    setToken(storedToken)
  }, [])

  if (token === null) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <CircularProgress />
      </div>
    )
  }

  return <>{token ? children : <AuthRedirect lang={locale} />}</>
}
