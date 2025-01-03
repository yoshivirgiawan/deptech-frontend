// MUI Imports
import type { ReactNode } from 'react'

import Link from 'next/link'

import PageHeader from '@/@core/components/page-header/PageHeader'

const AdminDetailLayout = ({ children, params }: { children: ReactNode; params: { lang: string } }) => {
  return (
    <>
      <PageHeader
        title='Detail admin'
        actionButtonProps={{ LinkComponent: Link, href: `/${params.lang}/admins/list` }}
      />
      {children}
    </>
  )
}

export default AdminDetailLayout
