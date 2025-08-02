import { User, EditUser, CreateUser, EditShippingData, ShippingData } from "@/types/User"
import { createContext, Dispatch, FormEvent, SetStateAction, SyntheticEvent } from "react"

type Value = {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
  users: User[]
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  onUpdateUser: (data: {
    id: number
    initialData: EditUser
    updatedData: EditUser
    setUpdatedData: Dispatch<SetStateAction<EditUser>>
  }) => Promise<void>
  onDeleteUser: (e: SyntheticEvent, id: number) => Promise<void>
  onCreateCustomer: (
    e: FormEvent<HTMLFormElement>,
    data: CreateUser,
  ) => Promise<User>
  onCreateAdmin: (
    e: FormEvent<HTMLFormElement>,
    data: CreateUser,
  ) => Promise<User>
  onUpdateShippingData: (data: {
    id: number
    initialData: EditShippingData
    updatedData: EditShippingData
    setUpdatedData: Dispatch<SetStateAction<EditShippingData>>
  }) => Promise<void>
  shippingData: Partial<ShippingData>
}

export const UserContext = createContext<Value | null>(null)