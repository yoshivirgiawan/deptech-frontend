// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Fetcher Imports
import axiosInstance from '@/libs/axiosInstance'

import { withToast } from '@/utils/withToast'

// ** Config
import adminsConfig from '@/configs/admins'

// ** Type Imports
import type { AddFormDataAdmin, AdminType, EditFormDataAdmin } from '@/types/pages/admins/adminTypes'
import type { Redux } from '@/types/reduxTypes'

// ** Fetch Data
export const fetchAllAdmins = createAsyncThunk('admins/fetchAllAdmins', async () => {
  const response = await axiosInstance.get(adminsConfig.list)

  return response.data
})

// ** Fetch Detail
export const fetchAdminDetail = createAsyncThunk('admins/fetchAdminDetail', async (id: number) => {
  const response = await axiosInstance.get(adminsConfig.show.replace(':id', id.toString()))

  return response.data
})

// ** Add Data
export const addAdmin = createAsyncThunk('admins/addAdmin', async (data: AddFormDataAdmin) => {
  const response = await axiosInstance.post(adminsConfig.add, data)

  return response.data
})

export const addAdminWithToast = withToast(addAdmin, {
  loading: 'Add new admin loading...',
  success: 'Success add new admin ',
  error: 'Failed add new admin '
})

// ** Delete Data
export const deleteAdmin = createAsyncThunk('admins/deleteAdmin', async (id: number, { dispatch }: Redux) => {
  const response = await axiosInstance.delete(adminsConfig.delete.replace(':id', id.toString()))

  dispatch(fetchAllAdmins())

  return response.data
})

export const deleteAdminWithToast = withToast(deleteAdmin, {
  loading: 'Deleting admin...',
  success: 'Success delete admin.',
  error: 'Failed delete admin.'
})

// ** Edit Data
export const editAdmin = createAsyncThunk('admins/editAdmin', async (data: EditFormDataAdmin) => {
  const response = await axiosInstance.patch(adminsConfig.update.replace(':id', data.id ? data.id.toString() : '0'), {
    ...data,
    id: undefined
  })

  return response.data
})

export const editAdminWithToast = withToast(editAdmin, {
  loading: 'Admin data editing is in progress...',
  success: 'Edit Admin data has been successful.',
  error: 'Editing Admin data was unsuccessful.'
})

export const admins = createSlice({
  name: 'admins',
  initialState: {
    data: [] as AdminType[],
    dataDetail: {} as AdminType,
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
      .addCase(fetchAllAdmins.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllAdmins.rejected, state => {
        state.loading = false
        state.data = []
        state.total = 0
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
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
      .addCase(fetchAdminDetail.pending, state => {
        state.detailLoading = true
      })
      .addCase(fetchAdminDetail.rejected, state => {
        state.detailLoading = false
        state.detailError = true
      })
      .addCase(fetchAdminDetail.fulfilled, (state, action) => {
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
      .addCase(addAdmin.pending, state => {
        state.addLoading = true
      })
      .addCase(addAdmin.rejected, state => {
        state.addLoading = false
        state.addError = true
      })
      .addCase(addAdmin.fulfilled, state => {
        state.addLoading = false
        state.addSuccess = true
      })
      .addCase(deleteAdmin.pending, state => {
        state.deleteLoading = true
      })
      .addCase(deleteAdmin.rejected, state => {
        state.deleteLoading = false
        state.deleteError = true
      })
      .addCase(deleteAdmin.fulfilled, state => {
        state.deleteLoading = false
        state.deleteSuccess = true
      })
      .addCase(editAdmin.pending, state => {
        state.editLoading = true
      })
      .addCase(editAdmin.rejected, state => {
        state.editLoading = false
        state.editError = true
      })
      .addCase(editAdmin.fulfilled, state => {
        state.editLoading = false
        state.editSuccess = true
      })
  }
})

export default admins.reducer
