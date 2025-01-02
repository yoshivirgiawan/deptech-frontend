'use client'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { ChildrenType } from '@core/types'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'
import authConfig from '@/configs/auth'

export default function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
  const token = localStorage.getItem(authConfig.storageTokenKeyName)

  return <>{token ? children : <AuthRedirect lang={locale} />}</>
}
