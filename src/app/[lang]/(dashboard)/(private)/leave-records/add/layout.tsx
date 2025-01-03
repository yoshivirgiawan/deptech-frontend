// MUI Imports
import type { ReactNode } from 'react'

import Link from 'next/link'

import PageHeader from '@/@core/components/page-header/PageHeader'

const LeaveRecordAddLayout = ({ children, params }: { children: ReactNode; params: { lang: string } }) => {
  return (
    <>
      <PageHeader
        title='Add new leave record'
        actionButtonProps={{ LinkComponent: Link, href: `/${params.lang}/leave-records/list` }}
      />
      {children}
    </>
  )
}

export default LeaveRecordAddLayout
