
export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  image: string
  roleId: number
  role?: { id: number; name: string }
}

export interface CreateUser {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface EditUser {
  firstName: string
  lastName: string
  email: string
}

export interface EditShippingData {
  street: string
  number: string
  details: string
  postalCode: string
  city: string
  state: string
  country: string
}

export interface UserHeader {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  image: string | undefined
}

export interface Role {
  id: number
  name: string
}

export interface ShippingData {
  id: number
  userId: number
  street: string
  number: string
  details: string
  postalCode: string
  city: string
  state: string
  country: string
}


