import React, { Dispatch, SetStateAction } from "react"

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

export interface UpdateUser {
  firstName: string
  lastName: string
  email: string
  image: string
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

export interface UserContextType {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  users: User[]
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  onUpdateUser: (data: {
    key: string
    id: number
    initialData: UpdateUser
    updatedData: UpdateUser
    setUpdatedData: Dispatch<SetStateAction<UpdateUser>>
    file?: File
  }) => Promise<void>
  onDeleteUser: (e: React.SyntheticEvent, id: number) => Promise<void>
  onCreateCustomer: (e: React.SyntheticEvent, data: CreateUser) => Promise<User>
  onCreateAdmin: (e: React.SyntheticEvent, data: CreateUser) => Promise<User>
  onUpdateShippingData: (data: {
    key: string
    id: number
    initialData: Partial<ShippingData>
    updatedData: Partial<ShippingData>
    setUpdatedData: Dispatch<SetStateAction<Partial<ShippingData>>>
  }) => Promise<void>
  shippingData: Partial<ShippingData>
}
