'use client'

// React Imports
import { Fragment } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

type ConfirmationType = 'delete' | 'confirmation' | 'question'

type ConfirmationDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  type?: ConfirmationType
  handleConfirmation: (value: 'yes' | 'cancel') => void
}

const ConfirmationDialog = ({ open, setOpen, type = 'delete', handleConfirmation }: ConfirmationDialogProps) => {
  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i className='tabler-alert-circle text-[88px] mbe-6 text-warning' />
          <Fragment>
            <Typography variant='h4'>
              {type === 'confirmation' && 'Are you sure you want to do this action?'}
              {type === 'delete' && 'Are you sure you want to delete this data?'}
              {type === 'question' && 'Are you sure?'}
            </Typography>
            {type === 'delete' && (
              <Typography color='text.primary'>You won&#39;t be able to revert the data!</Typography>
            )}
          </Fragment>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button
            variant='contained'
            color={type === 'delete' ? 'error' : 'primary'}
            onClick={() => handleConfirmation('yes')}
          >
            {type === 'delete' ? 'Delete' : type === 'confirmation' ? 'Confirm' : type === 'question' ? 'Yes' : 'Yes'}
          </Button>
          <Button
            variant='tonal'
            color={type === 'delete' ? 'primary' : 'secondary'}
            onClick={() => {
              handleConfirmation('cancel')
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog
