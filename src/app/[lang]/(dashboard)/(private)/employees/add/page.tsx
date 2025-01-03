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

import type { EmployeeFormDataType } from '@/types/pages/employees/employeeTypes'
import { employeeFormDefaultValues } from '@/types/pages/employees/employeeTypes'
import { addEmployeeWithToast } from '@/redux-store/slices/employees'
import { employeeFormSchema } from '@/validations/employeeValidation'
import EmployeeForm from '@/views/employees/add/EmployeeForm'

const EmployeeAddPage = () => {
  // ** Enviroment Vars
  const router = useRouter()
  const { lang } = useParams()

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.employees)

  const formHook = useForm({
    defaultValues: employeeFormDefaultValues,
    resolver: yupResolver(employeeFormSchema)
  })

  useEffect(() => {
    if (store.addSuccess) {
      formHook.reset()
      router.push(`/${lang}/employees/list`)
    }
  }, [store.addSuccess, formHook, lang, router])

  const handleFormSubmit = async (data: EmployeeFormDataType) => {
    addEmployeeWithToast(dispatch, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      gender: data.gender
    })
  }

  return (
    <Stack>
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
            href={`/${lang}/employees/list`}
            sx={{ ml: 2 }}
          >
            Back
          </Button>
          <Button type='submit' sx={{ mr: 2 }} variant='contained'>
            Add employee
          </Button>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default EmployeeAddPage
