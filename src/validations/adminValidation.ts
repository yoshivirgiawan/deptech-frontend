import { object, string } from 'yup'

export const adminFormSchema = object().shape({
  first_name: string().required('First name is required'),
  last_name: string().required('Last name is required'),
  email: string().required('Email is required').email('Email is invalid'),
  birth_date: string().required('Birth date is required'),
  gender: string().required('Gender is required'),
  password: string().required('Password is required')
})

export const adminEditFormSchema = object().shape({
  first_name: string().required('First name is required'),
  last_name: string().required('Last name is required'),
  email: string().required('Email is required').email('Email is invalid'),
  birth_date: string().required('Birth date is required'),
  gender: string().required('Gender is required'),
  password: string().nullable()
})
