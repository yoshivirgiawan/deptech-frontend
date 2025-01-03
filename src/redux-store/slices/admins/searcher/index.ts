// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Fetcher Imports
import axiosInstance from '@/libs/axiosInstance'

// ** Config
import customersConfig from '@/configs/admins'

import type { CustomerType } from '@/types/pages/customers/customerTypes'

type DataParams = {
  filter_search: string
}

// ** Search Data Customer
export const searchData = createAsyncThunk('customerSearcher/searchData', async (params: DataParams) => {
  const response = await axiosInstance.get(customersConfig.searcher, {
    params: {
      filter_search: params.filter_search ?? ''
    }
  })

  return response.data
})

export const customerSearcherSlice = createSlice({
  name: 'customerSearcher',
  initialState: {
    data: [] as CustomerType[],
    total: 1,
    params: {},
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchData.pending, state => {
        state.loading = true
      })
      .addCase(searchData.rejected, state => {
        state.loading = false
        state.total = 0
      })
      .addCase(searchData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.total = action.payload.total
        state.params = action.payload.params
        state.loading = false
      })
  }
})

export default customerSearcherSlice.reducer
