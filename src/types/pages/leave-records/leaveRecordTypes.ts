import type { EmployeeType } from '../employees/employeeTypes'

export type LeaveRecordType = {
  id: number
  reason: string
  employee_id: number
  employee: EmployeeType
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export type LeaveRecordFormDataType = {
  employee_id: number
  reason: string
  start_date: string
  end_date: string
}

export const leaveRecordFormDefaultValues: LeaveRecordFormDataType = {
  employee_id: 0,
  reason: '',
  start_date: '',
  end_date: ''
}

export type AddFormDataLeaveRecord = {
  employee_id: number
  reason: string
  start_date: string
  end_date: string
}

export type EditFormDataLeaveRecord = {
  id?: number | null | undefined
  employee_id: number
  reason: string
  start_date: string
  end_date: string
}
