// MUI Imports
import type { ReactNode } from 'react'

import Link from 'next/link'

import { useParams } from 'next/navigation'

import PageHeader from '@/@core/components/page-header/PageHeader'

const AdminAddLayout = ({ children }: { children: ReactNode }) => {
  const { lang } = useParams()

  return (
    <>
      <PageHeader title='Add new admin' actionButtonProps={{ LinkComponent: Link, href: `/${lang}/admins/list` }} />
      {children}
    </>
  )
}

export default AdminAddLayout
