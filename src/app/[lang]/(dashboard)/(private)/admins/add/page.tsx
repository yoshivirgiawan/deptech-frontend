'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'

import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, CardActions, CardContent, CardHeader, Divider, Stack } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/redux-store'

import type { AdminFormDataType } from '@/types/pages/admins/adminTypes'
import { adminFormDefaultValues } from '@/types/pages/admins/adminTypes'
import { addAdminWithToast } from '@/redux-store/slices/admins'
import { adminFormSchema } from '@/validations/adminValidation'
import AdminForm from '@/views/admins/add/AdminForm'

const AdminAddPage = () => {
  // ** Enviroment Vars
  const router = useRouter()
  const { lang } = useParams()

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.admins)

  const formHook = useForm({
    defaultValues: adminFormDefaultValues,
    resolver: yupResolver(adminFormSchema)
  })

  useEffect(() => {
    if (store.addSuccess) {
      formHook.reset()
      router.push(`/${lang}/admins/list`)
    }
  }, [store.addSuccess, formHook, lang, router])

  const handleFormSubmit = async (data: AdminFormDataType) => {
    addAdminWithToast(dispatch, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      birth_date: data.birth_date,
      gender: data.gender,
      password: data.password
    })
  }

  return (
    <Stack>
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
          <Button variant='tonal' color='secondary' LinkComponent={Link} href={`/${lang}/admins/list`} sx={{ ml: 2 }}>
            Back
          </Button>
          <Button type='submit' sx={{ mr: 2 }} variant='contained'>
            Add admin
          </Button>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default AdminAddPage
