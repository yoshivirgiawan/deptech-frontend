'use client'

// MUI Imports
import type { ReactNode } from 'react'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

import PageHeader from '@/@core/components/page-header/PageHeader'

type LeaveRecordEditLayoutProps = {
  children: ReactNode
}

const LeaveRecordEditLayout = ({ children }: LeaveRecordEditLayoutProps) => {
  const { id, lang } = useParams()
  const searchParams = useSearchParams()
  const editfromlist = searchParams.get('editfromlist')

  return (
    <>
      <PageHeader
        title='Edit leave record'
        actionButtonProps={{
          LinkComponent: Link,
          href: editfromlist ? `/${lang}/leave-records/list` : `/${lang}/leave-records/detail/${id}`
        }}
      />
      {children}
    </>
  )
}

export default LeaveRecordEditLayout
