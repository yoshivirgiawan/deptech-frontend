'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import Card from '@mui/material/Card'

// MUI Imports
import { Button, CardActions, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/redux-store'

import { deleteAdminWithToast, fetchAdminDetail } from '@/redux-store/slices/admins'

import ConfirmationDialog from '@/components/dialogs/confirmation-dialog/ConfirmationDialog'

const AdminEditPage = () => {
  const router = useRouter()
  const { lang, id } = useParams()

  // ** Redux Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.admins)

  const [deleteValue, setDeleteValue] = useState<number>(0)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!!id) dispatch(fetchAdminDetail(Number(id)))
  }, [id, dispatch])

  useEffect(() => {
    if (!store.detailLoading) {
      if (store.detailError) router.push(`/${lang}/admins/list`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.detailLoading])

  const handleDeleteAdmin = (id: number) => {
    setDeleteValue(id)
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirmation = (value: 'yes' | 'cancel') => {
    if (value === 'yes') {
      deleteAdminWithToast(dispatch, deleteValue)
      setDeleteConfirmOpen(false)
    } else if (value === 'cancel') {
      setDeleteValue(0)
      setDeleteConfirmOpen(false)
    }
  }

  useEffect(() => {
    if (!store.deleteLoading) {
      if (store.deleteSuccess) router.push(`/${lang}/admins/list`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.deleteLoading])

  return (
    <>
      <Stack spacing={6}>
        <Card>
          <CardHeader title='Admin Information' />
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
                    Birth Date
                  </Typography>
                  <Typography>{store.dataDetail.birth_date}</Typography>
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
              <Button variant='contained' LinkComponent={Link} href={`/${lang}/admins/edit/${id}`}>
                Edit
              </Button>
              <Button color='error' onClick={() => handleDeleteAdmin(Number(id))}>
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

export default AdminEditPage
