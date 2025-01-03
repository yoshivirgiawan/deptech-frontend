'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import PageHeader from '@/@core/components/page-header/PageHeader'

const EmployeeDetailLayout = ({ children }: { children: ReactNode }) => {
  const { lang } = useParams()

  return (
    <>
      <PageHeader
        title='Detail employee'
        actionButtonProps={{ LinkComponent: Link, href: `/${lang}/employees/list` }}
      />
      {children}
    </>
  )
}

export default EmployeeDetailLayout
