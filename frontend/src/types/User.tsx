import React, { Dispatch, SetStateAction } from "react"
export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  image: string
  roleId: number
}

export interface UserHeader {
  firstName: string
  lastName: string
  email: string
  image: string
}

export interface Role {
  id: number
  name: string
}

export interface ShippingData {
  userId: number
  id: number
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
    initialData: Partial<User>
    updatedData: Partial<User>
    setUpdatedData: Dispatch<SetStateAction<Partial<User>>>
    file?: File
  }) => Promise<void>
  onDeleteUser: (e: React.SyntheticEvent, id: number) => Promise<void>
  onCreateCustomer: (
    e: React.SyntheticEvent,
    data: Partial<User>,
  ) => Promise<void>
  onCreateAdmin: (e: React.SyntheticEvent, data: Partial<User>) => Promise<void>
  onUpdateShippingData: (data: {
    key: string
    id: number
    initialData: Partial<ShippingData>
    updatedData: Partial<ShippingData>
    setUpdatedData: Dispatch<SetStateAction<Partial<ShippingData>>>
  }) => Promise<void>
  shippingData: Partial<ShippingData>
}
