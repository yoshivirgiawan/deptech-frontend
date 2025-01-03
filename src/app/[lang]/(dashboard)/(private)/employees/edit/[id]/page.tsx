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
import EmployeeForm from '@views/employees/add/EmployeeForm'

import type { EditFormDataEmployee } from '@/types/pages/employees/employeeTypes'
import { employeeFormDefaultValues } from '@/types/pages/employees/employeeTypes'
import { editEmployeeWithToast, fetchEmployeeDetail } from '@/redux-store/slices/employees'
import { employeeFormSchema } from '@/validations/employeeValidation'

const EmployeeEditPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang, id } = useParams()
  const editfromlist = searchParams.get('editfromlist')

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.employees)

  const formHook = useForm({
    defaultValues: employeeFormDefaultValues,
    resolver: yupResolver(employeeFormSchema)
  })

  const handleFormSubmit = async (data: EditFormDataEmployee) => {
    editEmployeeWithToast(dispatch, {
      id: Number(id),
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      gender: data.gender
    })
  }

  useEffect(() => {
    if (!!id) dispatch(fetchEmployeeDetail(Number(id)))
  }, [id, dispatch])

  useEffect(() => {
    if (!store.detailLoading) {
      if (store.detailSuccess && store.dataDetail) {
        formHook.reset({
          first_name: store.dataDetail.first_name,
          last_name: store.dataDetail.last_name,
          email: store.dataDetail.email,
          phone_number: store.dataDetail.phone_number,
          address: store.dataDetail.address,
          gender: store.dataDetail.gender
        })
      }
    }
  }, [formHook, store.detailLoading, store.detailSuccess, store.dataDetail])

  useEffect(() => {
    if (!store.editLoading) {
      if (store.editSuccess) router.push(editfromlist ? `/${lang}/employees/list` : `/${lang}/employees/detail/${id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.editLoading])

  return (
    <Card component={'form'} onSubmit={formHook.handleSubmit(handleFormSubmit)}>
      <CardHeader title='Employee Information' />
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>
        <FormProvider {...formHook}>
          <EmployeeForm />
        </FormProvider>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardActions className='flex justify-end'>
        <Button
          variant='tonal'
          color='secondary'
          LinkComponent={Link}
          href={editfromlist ? `/${lang}/employees/list` : `/${lang}/employees/detail/${id}`}
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

export default EmployeeEditPage
