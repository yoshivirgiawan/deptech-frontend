export type AdminType = {
  id: number
  first_name: string
  last_name: string
  email: string
  birth_date: string
  gender: string
  created_at: string
  updated_at: string
}

export type AdminFormDataType = {
  first_name: string
  last_name: string
  email: string
  birth_date: string
  gender: string
  password: string
}

export const adminFormDefaultValues: AdminFormDataType = {
  first_name: '',
  last_name: '',
  email: '',
  birth_date: '',
  gender: 'male',
  password: ''
}

export type AddFormDataAdmin = {
  first_name: string
  last_name: string
  email: string
  birth_date: string
  gender: string
  password: string
}

export type EditFormDataAdmin = {
  id?: number | null | undefined
  first_name: string
  last_name: string
  email: string
  birth_date: string
  gender: string
  password?: string | null | undefined
}
