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

import type { LeaveRecordFormDataType } from '@/types/pages/leave-records/leaveRecordTypes'
import { leaveRecordFormDefaultValues } from '@/types/pages/leave-records/leaveRecordTypes'
import { addLeaveRecordWithToast } from '@/redux-store/slices/leave-records'
import { leaveRecordFormSchema } from '@/validations/leaveRecordValidation'
import LeaveRecordForm from '@/views/leave-records/add/LeaveRecordForm'

const LeaveRecordAddPage = () => {
  // ** Enviroment Vars
  const router = useRouter()
  const { lang } = useParams()

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.leaveRecords)

  const formHook = useForm({
    defaultValues: leaveRecordFormDefaultValues,
    resolver: yupResolver(leaveRecordFormSchema)
  })

  useEffect(() => {
    if (store.addSuccess) {
      formHook.reset()
      router.push(`/${lang}/leave-records/list`)
    }
  }, [store.addSuccess, formHook, lang, router])

  const handleFormSubmit = async (data: LeaveRecordFormDataType) => {
    addLeaveRecordWithToast(dispatch, {
      employee_id: data.employee_id,
      start_date: data.start_date,
      end_date: data.end_date,
      reason: data.reason
    })
  }

  return (
    <Stack>
      <Card component={'form'} onSubmit={formHook.handleSubmit(handleFormSubmit)}>
        <CardHeader title='Leave Record Information' />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          <FormProvider {...formHook}>
            <LeaveRecordForm />
          </FormProvider>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions className='flex justify-end'>
          <Button
            variant='tonal'
            color='secondary'
            LinkComponent={Link}
            href={`/${lang}/leave-records/list`}
            sx={{ ml: 2 }}
          >
            Back
          </Button>
          <Button type='submit' sx={{ mr: 2 }} variant='contained'>
            Add leave record
          </Button>
        </CardActions>
      </Card>
    </Stack>
  )
}

export default LeaveRecordAddPage
