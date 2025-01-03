// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Fetcher Imports
import axiosInstance from '@/libs/axiosInstance'

import { withToast } from '@/utils/withToast'

// ** Config
import leaveRecordsConfig from '@/configs/leave-records'

// ** Type Imports
import type {
  AddFormDataLeaveRecord,
  LeaveRecordType,
  EditFormDataLeaveRecord
} from '@/types/pages/leave-records/leaveRecordTypes'
import type { Redux } from '@/types/reduxTypes'

// ** Fetch Data
export const fetchAllLeaveRecords = createAsyncThunk('leaveRecords/fetchAllLeaveRecords', async () => {
  const response = await axiosInstance.get(leaveRecordsConfig.list)

  return response.data
})

// ** Fetch Detail
export const fetchLeaveRecordDetail = createAsyncThunk('leaveRecords/fetchLeaveRecordDetail', async (id: number) => {
  const response = await axiosInstance.get(leaveRecordsConfig.show.replace(':id', id.toString()))

  return response.data
})

// ** Add Data
export const addLeaveRecord = createAsyncThunk('leaveRecords/addLeaveRecord', async (data: AddFormDataLeaveRecord) => {
  const response = await axiosInstance.post(leaveRecordsConfig.add, data)

  return response.data
})

export const addLeaveRecordWithToast = withToast(addLeaveRecord, {
  loading: 'Add new leaveRecord loading...',
  success: 'Success add new leaveRecord ',
  error: 'Failed add new leaveRecord '
})

// ** Delete Data
export const deleteLeaveRecord = createAsyncThunk(
  'leaveRecords/deleteLeaveRecord',
  async (id: number, { dispatch }: Redux) => {
    const response = await axiosInstance.delete(leaveRecordsConfig.delete.replace(':id', id.toString()))

    dispatch(fetchAllLeaveRecords())

    return response.data
  }
)

export const deleteLeaveRecordWithToast = withToast(deleteLeaveRecord, {
  loading: 'Deleting leaveRecord...',
  success: 'Success delete leaveRecord.',
  error: 'Failed delete leaveRecord.'
})

// ** Edit Data
export const editLeaveRecord = createAsyncThunk(
  'leaveRecords/editLeaveRecord',
  async (data: EditFormDataLeaveRecord) => {
    const response = await axiosInstance.patch(
      leaveRecordsConfig.update.replace(':id', data.id ? data.id.toString() : '0'),
      {
        ...data,
        id: undefined
      }
    )

    return response.data
  }
)

export const editLeaveRecordWithToast = withToast(editLeaveRecord, {
  loading: 'LeaveRecord data editing is in progress...',
  success: 'Edit LeaveRecord data has been successful.',
  error: 'Editing LeaveRecord data was unsuccessful.'
})

export const leaveRecords = createSlice({
  name: 'leaveRecords',
  initialState: {
    data: [] as LeaveRecordType[],
    dataDetail: {} as LeaveRecordType,
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
      .addCase(fetchAllLeaveRecords.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllLeaveRecords.rejected, state => {
        state.loading = false
        state.data = []
        state.total = 0
      })
      .addCase(fetchAllLeaveRecords.fulfilled, (state, action) => {
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
      .addCase(fetchLeaveRecordDetail.pending, state => {
        state.detailLoading = true
      })
      .addCase(fetchLeaveRecordDetail.rejected, state => {
        state.detailLoading = false
        state.detailError = true
      })
      .addCase(fetchLeaveRecordDetail.fulfilled, (state, action) => {
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
      .addCase(addLeaveRecord.pending, state => {
        state.addLoading = true
      })
      .addCase(addLeaveRecord.rejected, state => {
        state.addLoading = false
        state.addError = true
      })
      .addCase(addLeaveRecord.fulfilled, state => {
        state.addLoading = false
        state.addSuccess = true
      })
      .addCase(deleteLeaveRecord.pending, state => {
        state.deleteLoading = true
      })
      .addCase(deleteLeaveRecord.rejected, state => {
        state.deleteLoading = false
        state.deleteError = true
      })
      .addCase(deleteLeaveRecord.fulfilled, state => {
        state.deleteLoading = false
        state.deleteSuccess = true
      })
      .addCase(editLeaveRecord.pending, state => {
        state.editLoading = true
      })
      .addCase(editLeaveRecord.rejected, state => {
        state.editLoading = false
        state.editError = true
      })
      .addCase(editLeaveRecord.fulfilled, state => {
        state.editLoading = false
        state.editSuccess = true
      })
  }
})

export default leaveRecords.reducer
