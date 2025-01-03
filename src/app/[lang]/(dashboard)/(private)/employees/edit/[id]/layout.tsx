'use client'

// MUI Imports
import type { ReactNode } from 'react'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'

import PageHeader from '@/@core/components/page-header/PageHeader'

type EmployeeEditLayoutProps = {
  children: ReactNode
}

const EmployeeEditLayout = ({ children }: EmployeeEditLayoutProps) => {
  const { id, lang } = useParams()
  const searchParams = useSearchParams()
  const editfromlist = searchParams.get('editfromlist')

  return (
    <>
      <PageHeader
        title='Edit employee'
        actionButtonProps={{
          LinkComponent: Link,
          href: editfromlist ? `/${lang}/employees/list` : `/${lang}/employees/detail/${id}`
        }}
      />
      {children}
    </>
  )
}

export default EmployeeEditLayout
