// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Fetcher Imports
import axiosInstance from '@/libs/axiosInstance'

import { withToast } from '@/utils/withToast'

// ** Config
import employeesConfig from '@/configs/employees'

// ** Type Imports
import type { AddFormDataEmployee, EmployeeType, EditFormDataEmployee } from '@/types/pages/employees/employeeTypes'
import type { Redux } from '@/types/reduxTypes'

// ** Fetch Data
export const fetchAllEmployees = createAsyncThunk('employees/fetchAllEmployees', async () => {
  const response = await axiosInstance.get(employeesConfig.list)

  return response.data
})

// ** Fetch Detail
export const fetchEmployeeDetail = createAsyncThunk('employees/fetchEmployeeDetail', async (id: number) => {
  const response = await axiosInstance.get(employeesConfig.show.replace(':id', id.toString()))

  return response.data
})

// ** Add Data
export const addEmployee = createAsyncThunk('employees/addEmployee', async (data: AddFormDataEmployee) => {
  const response = await axiosInstance.post(employeesConfig.add, data)

  return response.data
})

export const addEmployeeWithToast = withToast(addEmployee, {
  loading: 'Add new employee loading...',
  success: 'Success add new employee ',
  error: 'Failed add new employee '
})

// ** Delete Data
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: number, { dispatch }: Redux) => {
  const response = await axiosInstance.delete(employeesConfig.delete.replace(':id', id.toString()))

  dispatch(fetchAllEmployees())

  return response.data
})

export const deleteEmployeeWithToast = withToast(deleteEmployee, {
  loading: 'Deleting employee...',
  success: 'Success delete employee.',
  error: 'Failed delete employee.'
})

// ** Edit Data
export const editEmployee = createAsyncThunk('employees/editEmployee', async (data: EditFormDataEmployee) => {
  const response = await axiosInstance.patch(
    employeesConfig.update.replace(':id', data.id ? data.id.toString() : '0'),
    {
      ...data,
      id: undefined
    }
  )

  return response.data
})

export const editEmployeeWithToast = withToast(editEmployee, {
  loading: 'Employee data editing is in progress...',
  success: 'Edit Employee data has been successful.',
  error: 'Editing Employee data was unsuccessful.'
})

export const employees = createSlice({
  name: 'employees',
  initialState: {
    data: [] as EmployeeType[],
    dataDetail: {} as EmployeeType,
    total: 0,
    detailLoading: false,
    detailSuccess: false,
    detailError: false,
    loading: false,
    addLoading: false,
    addSuccess: false,
    addError: false,
    deleteLoading: false,
    deleteSuccess: false,
    deleteError: false,
    editLoading: false,
    editSuccess: false,
    editError: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllEmployees.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllEmployees.rejected, state => {
        state.loading = false
        state.data = []
        state.total = 0
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = (action.payload.data as []).length
        state.loading = false

        state.detailLoading = false
        state.detailSuccess = false
        state.detailError = false

        state.addLoading = false
        state.addSuccess = false
        state.addError = false

        state.deleteLoading = false
        state.deleteSuccess = false
        state.deleteError = false

        state.editLoading = false
        state.editSuccess = false
        state.editError = false
      })
      .addCase(fetchEmployeeDetail.pending, state => {
        state.detailLoading = true
      })
      .addCase(fetchEmployeeDetail.rejected, state => {
        state.detailLoading = false
        state.detailError = true
      })
      .addCase(fetchEmployeeDetail.fulfilled, (state, action) => {
        state.dataDetail = action.payload.data
        state.detailLoading = false
        state.detailError = false
        state.detailSuccess = true

        state.loading = false

        state.addLoading = false
        state.addSuccess = false
        state.addError = false

        state.deleteLoading = false
        state.deleteSuccess = false
        state.deleteError = false

        state.editLoading = false
        state.editSuccess = false
        state.editError = false
      })
      .addCase(addEmployee.pending, state => {
        state.addLoading = true
      })
      .addCase(addEmployee.rejected, state => {
        state.addLoading = false
        state.addError = true
      })
      .addCase(addEmployee.fulfilled, state => {
        state.addLoading = false
        state.addSuccess = true
      })
      .addCase(deleteEmployee.pending, state => {
        state.deleteLoading = true
      })
      .addCase(deleteEmployee.rejected, state => {
        state.deleteLoading = false
        state.deleteError = true
      })
      .addCase(deleteEmployee.fulfilled, state => {
        state.deleteLoading = false
        state.deleteSuccess = true
      })
      .addCase(editEmployee.pending, state => {
        state.editLoading = true
      })
      .addCase(editEmployee.rejected, state => {
        state.editLoading = false
        state.editError = true
      })
      .addCase(editEmployee.fulfilled, state => {
        state.editLoading = false
        state.editSuccess = true
      })
  }
})

export default employees.reducer
