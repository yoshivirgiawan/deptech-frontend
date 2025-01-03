'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import Card from '@mui/material/Card'

// MUI Imports
import { Button, CardActions, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/redux-store'

import { deleteEmployeeWithToast, fetchEmployeeDetail } from '@/redux-store/slices/employees'

import ConfirmationDialog from '@/components/dialogs/confirmation-dialog/ConfirmationDialog'

const EmployeeEditPage = () => {
  const router = useRouter()
  const { lang, id } = useParams()

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.employees)

  const [deleteValue, setDeleteValue] = useState<number>(0)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!!id) dispatch(fetchEmployeeDetail(Number(id)))
  }, [id, dispatch])

  useEffect(() => {
    if (!store.detailLoading) {
      if (store.detailError) router.push(`/${lang}/employees/list`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.detailLoading])

  const handleDeleteEmployee = (id: number) => {
    setDeleteValue(id)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirmation = (value: 'yes' | 'cancel') => {
    if (value === 'yes') {
      deleteEmployeeWithToast(dispatch, deleteValue)
      setDeleteConfirmOpen(false)
    } else if (value === 'cancel') {
      setDeleteValue(0)
      setDeleteConfirmOpen(false)
    }
  }

  useEffect(() => {
    if (!store.deleteLoading) {
      if (store.deleteSuccess) router.push(`/${lang}/employees/list`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.deleteLoading])

  return (
    <>
      <Stack spacing={6}>
        <Card>
          <CardHeader title='Employee Information' />
          <Divider sx={{ m: '0 !important' }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6} className='flex flex-col gap-6'>
                <div className='flex flex-col gap-1'>
                  <Typography color='text.primary' className='font-medium'>
                    First Name
                  </Typography>
                  <Typography>{store.dataDetail.first_name}</Typography>
                </div>
                <div className='flex flex-col gap-1'>
                  <Typography color='text.primary' className='font-medium'>
                    Last Name
                  </Typography>
                  <Typography>{store.dataDetail.last_name}</Typography>
                </div>
                <div className='flex flex-col gap-1'>
                  <Typography color='text.primary' className='font-medium'>
                    Email
                  </Typography>
                  <Typography>{store.dataDetail.email}</Typography>
                </div>
                <div className='flex flex-col gap-1'>
                  <Typography color='text.primary' className='font-medium'>
                    Phone Number
                  </Typography>
                  <Typography>{store.dataDetail.phone_number}</Typography>
                </div>
                <div className='flex flex-col gap-1'>
                  <Typography color='text.primary' className='font-medium'>
                    Address
                  </Typography>
                  <Typography>{store.dataDetail.address}</Typography>
                </div>
                <div className='flex flex-col gap-1'>
                  <Typography color='text.primary' className='font-medium'>
                    Gender
                  </Typography>
                  <Typography>{store.dataDetail.gender}</Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions className='flex justify-end'>
            <Stack direction='row' spacing={2}>
              <Button variant='contained' LinkComponent={Link} href={`/${lang}/employees/edit/${id}`}>
                Edit
              </Button>
              <Button color='error' onClick={() => handleDeleteEmployee(Number(id))}>
                Delete
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Stack>
      <ConfirmationDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        handleConfirmation={handleDeleteConfirmation}
      />
    </>
  )
}

export default EmployeeEditPage
