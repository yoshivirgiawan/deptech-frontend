'use client'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import { MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import type { EmployeeFormDataType } from '@/types/pages/employees/employeeTypes'

const EmployeeForm = () => {
  const formHook = useFormContext<EmployeeFormDataType>()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          label='First Name'
          placeholder='First Name'
          error={Boolean(formHook.formState.errors.first_name)}
          {...(formHook.formState.errors.first_name && {
            helperText: formHook.formState.errors.first_name.message
          })}
          {...formHook.register('first_name')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          label='Last Name'
          placeholder='Last Name'
          error={Boolean(formHook.formState.errors.last_name)}
          {...(formHook.formState.errors.last_name && {
            helperText: formHook.formState.errors.last_name.message
          })}
          {...formHook.register('last_name')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          label='Email'
          placeholder='Email'
          error={Boolean(formHook.formState.errors.email)}
          {...(formHook.formState.errors.email && {
            helperText: formHook.formState.errors.email.message
          })}
          {...formHook.register('email')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          label='Phone Number'
          placeholder='Phone Number'
          error={Boolean(formHook.formState.errors.phone_number)}
          {...(formHook.formState.errors.phone_number && {
            helperText: formHook.formState.errors.phone_number.message
          })}
          {...formHook.register('phone_number')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          label='Address'
          placeholder='Address'
          error={Boolean(formHook.formState.errors.address)}
          {...(formHook.formState.errors.address && {
            helperText: formHook.formState.errors.address.message
          })}
          {...formHook.register('address')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name='gender'
          control={formHook.control}
          render={({ field, fieldState }) => (
            <CustomTextField
              select
              fullWidth
              label='Gender'
              placeholder='Gender'
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              {...field}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </CustomTextField>
          )}
        />
      </Grid>
    </Grid>
  )
}

export default EmployeeForm
