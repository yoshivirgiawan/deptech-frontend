export type EmployeeType = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  gender: string
  created_at: string
  updated_at: string
}

export type EmployeeFormDataType = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  gender: string
}

export const employeeFormDefaultValues: EmployeeFormDataType = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  address: '',
  gender: 'male'
}

export type AddFormDataEmployee = {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  gender: string
}

export type EditFormDataEmployee = {
  id?: number | null | undefined
  first_name: string
  last_name: string
  email: string
  phone_number: string
  address: string
  gender: string
}
