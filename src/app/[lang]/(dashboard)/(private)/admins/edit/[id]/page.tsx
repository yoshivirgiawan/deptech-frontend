'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Card from '@mui/material/Card'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import { Button, CardActions, CardContent, CardHeader, Divider } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/redux-store'

// Component Imports
import AdminForm from '@views/admins/add/AdminForm'

import type { EditFormDataAdmin } from '@/types/pages/admins/adminTypes'
import { adminFormDefaultValues } from '@/types/pages/admins/adminTypes'
import { editAdminWithToast, fetchAdminDetail } from '@/redux-store/slices/admins'
import { adminEditFormSchema } from '@/validations/adminValidation'

const AdminEditPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang, id } = useParams()
  const editfromlist = searchParams.get('editfromlist')

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.admins)

  const formHook = useForm({
    defaultValues: adminFormDefaultValues,
    resolver: yupResolver(adminEditFormSchema)
  })

  const handleFormSubmit = async (data: EditFormDataAdmin) => {
    editAdminWithToast(dispatch, {
      id: Number(id),
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      birth_date: data.birth_date,
      gender: data.gender,
      password: data.password && data.password.length > 0 ? data.password : undefined
    })
  }

  useEffect(() => {
    if (!!id) dispatch(fetchAdminDetail(Number(id)))
  }, [id, dispatch])

  useEffect(() => {
    if (!store.detailLoading) {
      if (store.detailSuccess && store.dataDetail) {
        formHook.reset({
          first_name: store.dataDetail.first_name,
          last_name: store.dataDetail.last_name,
          email: store.dataDetail.email,
          birth_date: store.dataDetail.birth_date,
          gender: store.dataDetail.gender
        })
      }
    }
  }, [formHook, store.detailLoading, store.detailSuccess, store.dataDetail])

  useEffect(() => {
    if (!store.editLoading) {
      if (store.editSuccess) router.push(editfromlist ? `/${lang}/admins/list` : `/${lang}/admins/detail/${id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.editLoading])

  return (
    <Card component={'form'} onSubmit={formHook.handleSubmit(handleFormSubmit)}>
      <CardHeader title='Admin Information' />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <AdminForm />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions className='flex justify-end'>
        <Button
          variant='tonal'
          color='secondary'
          LinkComponent={Link}
          href={editfromlist ? `/${lang}/admins/list` : `/${lang}/admins/detail/${id}`}
          sx={{ ml: 2 }}
        >
          Discard
        </Button>
        <Button type='submit' sx={{ mr: 2 }} variant='contained'>
          Save
        </Button>
      </CardActions>
    </Card>
  )
}

export default AdminEditPage
