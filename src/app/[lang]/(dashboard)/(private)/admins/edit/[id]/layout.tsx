'use client'

// MUI Imports
import type { ReactNode } from 'react'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

import PageHeader from '@/@core/components/page-header/PageHeader'

type AdminEditLayoutProps = {
  children: ReactNode
}

const AdminEditLayout = ({ children }: AdminEditLayoutProps) => {
  const { id, lang } = useParams()
  const searchParams = useSearchParams()
  const editfromlist = searchParams.get('editfromlist')

  return (
    <>
      <PageHeader
        title='Edit admin'
        actionButtonProps={{
          LinkComponent: Link,
          href: editfromlist ? `/${lang}/admins/list` : `/${lang}/admins/detail/${id}`
        }}
      />
      {children}
    </>
  )
}

export default AdminEditLayout
