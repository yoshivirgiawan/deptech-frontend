'use client'

// Next Imports
import { redirect } from 'next/navigation'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import authConfig from '@/configs/auth'

const GuestOnlyRoute = ({ children, lang }: ChildrenType & { lang: Locale }) => {
  const token = localStorage.getItem(authConfig.storageTokenKeyName)

  if (token) {
    redirect(getLocalizedUrl(themeConfig.homePageUrl, lang))
  }

  return <>{children}</>
}

export default GuestOnlyRoute
