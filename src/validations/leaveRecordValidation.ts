import { number, object, string } from 'yup'

export const leaveRecordFormSchema = object().shape({
  employee_id: number().required('Employee is required'),
  reason: string().required('Reason is required'),
  start_date: string().required('Start date is required'),
  end_date: string().required('End date is required')
})
