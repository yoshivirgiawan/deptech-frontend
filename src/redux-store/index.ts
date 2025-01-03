import { configureStore } from '@reduxjs/toolkit'

// Third-party Imports

// Slice Imports
import chatReducer from '@/redux-store/slices/chat'
import calendarReducer from '@/redux-store/slices/calendar'
import kanbanReducer from '@/redux-store/slices/kanban'
import emailReducer from '@/redux-store/slices/email'
import admins from '@/redux-store/slices/admins'
import employees from '@/redux-store/slices/employees'
import leaveRecords from '@/redux-store/slices/leave-records'

export const store = configureStore({
  reducer: {
    chatReducer,
    calendarReducer,
    kanbanReducer,
    emailReducer,
    admins,
    employees,
    leaveRecords
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
