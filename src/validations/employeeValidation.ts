import { object, string } from 'yup'

export const employeeFormSchema = object().shape({
  first_name: string().required('First name is required'),
  last_name: string().required('Last name is required'),
  email: string().required('Email is required').email('Email is invalid'),
  phone_number: string().required('Phone number is required'),
  address: string().required('Address is required'),
  gender: string().required('Gender is required')
})
