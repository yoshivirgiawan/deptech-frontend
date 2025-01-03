'use client'

import { useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import { IconButton, InputAdornment, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import type { AdminFormDataType } from '@/types/pages/admins/adminTypes'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const AdminForm = () => {
  const formHook = useFormContext<AdminFormDataType>()
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const handleClickShowPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }

  const formatDateToYYYYMMDD = (date: Date | null) => {
    if (!date) return null
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tambah 1 karena bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

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
        <Controller
          name='birth_date'
          control={formHook.control}
          render={({ field, fieldState }) => (
            <AppReactDatepicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => {
                const formattedDate = formatDateToYYYYMMDD(date)

                field.onChange(formattedDate)
              }}
              placeholderText='Click to select a date'
              customInput={
                <CustomTextField
                  fullWidth
                  label='Birth Date'
                  placeholder='Birth Date'
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              }
            />
          )}
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
      <Grid item xs={12} md={6}>
        <Controller
          name='password'
          control={formHook.control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                      aria-label='toggle password visibility'
                    >
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={!!formHook.formState.errors.password}
              helperText={
                formHook.formState.errors.password?.message ||
                'Use 8 or more characters with a mix of letters, numbers & symbols'
              }
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default AdminForm
