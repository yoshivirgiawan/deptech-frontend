'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import PageHeader from '@/@core/components/page-header/PageHeader'

const LeaveRecordAddLayout = ({ children }: { children: ReactNode }) => {
  const { lang } = useParams()

  return (
    <>
      <PageHeader
        title='Add new leave record'
        actionButtonProps={{ LinkComponent: Link, href: `/${lang}/leave-records/list` }}
      />
      {children}
    </>
  )
}

export default LeaveRecordAddLayout
