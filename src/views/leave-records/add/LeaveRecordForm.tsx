'use client'

import { useEffect, useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'

import { MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'
import type { LeaveRecordFormDataType } from '@/types/pages/leave-records/leaveRecordTypes'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import employeesConfig from '@/configs/employees'

const LeaveRecordForm = () => {
  const formHook = useFormContext<LeaveRecordFormDataType>()

  const [employees, setEmployees] = useState<{ id: number; first_name: string; last_name: string }[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch employee data from API
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true)

      try {
        const token = localStorage.getItem('token')

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + employeesConfig.list, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()

        setEmployees(data.data)
      } catch (error) {
        console.error('Failed to fetch employees:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

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
        <Controller
          name='employee_id'
          control={formHook.control}
          rules={{ required: 'Employee is required.' }}
          defaultValue={formHook.getValues('employee_id')}
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              select
              fullWidth
              label='Employee'
              placeholder='Select Employee'
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              disabled={loading}
            >
              {employees.map(employee => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.first_name + ' ' + employee.last_name}
                </MenuItem>
              ))}
            </CustomTextField>
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          label='Reason'
          placeholder='Reason'
          error={Boolean(formHook.formState.errors.reason)}
          {...(formHook.formState.errors.reason && {
            helperText: formHook.formState.errors.reason.message
          })}
          {...formHook.register('reason')}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name='start_date'
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
      <Grid item xs={12}>
        <Controller
          name='end_date'
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
    </Grid>
  )
}

export default LeaveRecordForm
