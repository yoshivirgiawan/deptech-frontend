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

import LeaveRecordForm from '@views/leave-records/add/LeaveRecordForm'

import type { AppDispatch, RootState } from '@/redux-store'

// Component Imports

import type { EditFormDataLeaveRecord } from '@/types/pages/leave-records/leaveRecordTypes'
import { leaveRecordFormDefaultValues } from '@/types/pages/leave-records/leaveRecordTypes'
import { editLeaveRecordWithToast, fetchLeaveRecordDetail } from '@/redux-store/slices/leave-records'
import { leaveRecordFormSchema } from '@/validations/leaveRecordValidation'

const LeaveRecordEditPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { lang, id } = useParams()
  const editfromlist = searchParams.get('editfromlist')

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.leaveRecords)

  const formHook = useForm({
    defaultValues: leaveRecordFormDefaultValues,
    resolver: yupResolver(leaveRecordFormSchema)
  })

  const handleFormSubmit = async (data: EditFormDataLeaveRecord) => {
    editLeaveRecordWithToast(dispatch, {
      id: Number(id),
      employee_id: data.employee_id,
      start_date: data.start_date,
      end_date: data.end_date,
      reason: data.reason
    })
  }

  useEffect(() => {
    if (!!id) dispatch(fetchLeaveRecordDetail(Number(id)))
  }, [id, dispatch])

  useEffect(() => {
    if (!store.detailLoading) {
      if (store.detailSuccess && store.dataDetail) {
        formHook.reset({
          employee_id: store.dataDetail.employee_id,
          reason: store.dataDetail.reason,
          start_date: store.dataDetail.start_date,
          end_date: store.dataDetail.end_date
        })
      }
    }
  }, [formHook, store.detailLoading, store.detailSuccess, store.dataDetail])

  useEffect(() => {
    if (!store.editLoading) {
      if (store.editSuccess)
        router.push(editfromlist ? `/${lang}/leave-records/list` : `/${lang}/leave-records/detail/${id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.editLoading])

  return (
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
          href={editfromlist ? `/${lang}/leave-records/list` : `/${lang}/leave-records/detail/${id}`}
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

export default LeaveRecordEditPage
