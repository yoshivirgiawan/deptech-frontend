// MUI Imports
import type { ReactNode } from 'react'

import Link from 'next/link'

import PageHeader from '@/@core/components/page-header/PageHeader'

const EmployeeDetailLayout = ({ children, params }: { children: ReactNode; params: { lang: string } }) => {
  return (
    <>
      <PageHeader
        title='Detail employee'
        actionButtonProps={{ LinkComponent: Link, href: `/${params.lang}/employees/list` }}
      />
      {children}
    </>
  )
}

export default EmployeeDetailLayout