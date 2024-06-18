import { getAuthenticatedUserById } from "@/api/auth/getAuthenticatedUserById"
import { getDecodedAuthToken } from "@/api/auth/getDecodedAuthToken"
import { uploadFile } from "@/api/aws/uploadFile"
import { createAdmin } from "@/api/users/createAdmin"
import { createUser } from "@/api/users/createUser"
import { deleteUserById } from "@/api/users/deleteUserById"
import { getUserShippingData } from "@/api/users/getUserShippingData"
import { getUsers } from "@/api/users/getUsers"
import { updateShippingData } from "@/api/users/updateShippingData"
import { updateUser } from "@/api/users/updateUser"
import { CURRENT_ADMIN, SIGN_UP } from "@/constants/routes"
import { useNotificationContext } from "@/context/notificationContext"
import {
  CreateUser,
  ShippingData,
  UpdateUser,
  User,
  UserContextType,
} from "@/types/User"
import { onRequestError } from "@/utils/onRequestError"
import { onValidationError } from "@/utils/onValidationError"
import {
  createUserSchema,
  shippingDataSchema,
  updateUserSchema,
} from "@/utils/usersValidation"
import { convertDataToExpectedUserTypes, validate } from "@/utils/verifyTypes"
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useLocation } from "react-router-dom"

export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [shippingData, setShippingData] = useState<Partial<ShippingData>>({})
  const { onSetNotification, setNotification } = useNotificationContext()
  const location = useLocation()
  const currentPath = location.pathname
  const isCreatedByAdmin = currentPath.includes(CURRENT_ADMIN)
  const isSignup = currentPath.includes(SIGN_UP)

  const verifyLogin = async () => {
    setIsLoading(true)
    try {
      const authToken = await getDecodedAuthToken()
      if (authToken && authToken.status === 200) {
        const authorizatedUserId = authToken.data.id
        const loggedInUserResponse = await getAuthenticatedUserById(
          authorizatedUserId,
        )
        if (loggedInUserResponse?.status === 200) {
          const userData = loggedInUserResponse.data
          setUser(userData)
          setIsLoggedIn(true)
        } else {
          resetUserState()
        }
      } else {
        resetUserState()
      }
    } catch (error) {
      resetUserState()
    }
    setIsLoading(false)
  }

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      if (response?.status === 200) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchShippingData = async () => {
    try {
      if (user && !isLoading) {
        const userId = user.id
        const response = await getUserShippingData(userId)
        if (response?.status === 200) {
          setShippingData(response.data)
        }
      }
    } catch (error) {
      const message = "Error by getting user shipping data"
      onRequestError(error, setNotification, message)
    }
  }

  useEffect(() => {
    verifyLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    fetchShippingData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const resetUserState = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  const onDeleteUser = async (e: SyntheticEvent, id: number) => {
    e.preventDefault()
    try {
      const authToken = await getDecodedAuthToken()
      if (authToken && authToken.status === 200) {
        if (authToken && authToken.data.id === id) {
          const message = "You can not delete yourself"
          onSetNotification(message)
          return
        }
      }
      const response = await deleteUserById(id)
      if (response && response.status === 200) {
        setUsers(
          (prevState) =>
            prevState && prevState.filter((item) => item.id !== id),
        )
      }
    } catch (error) {
      onSetNotification("Error by deleting user")
      console.error("Error by deleting user:", error)
    }
  }

  const onCreateCustomer = async (e: SyntheticEvent, data: CreateUser) => {
    e.preventDefault()

    try {
      const typedItem = convertDataToExpectedUserTypes(data)
      const validUser = await validate({
        item: typedItem,
        schema: createUserSchema,
        onError: onValidationError,
        onNotification: setNotification,
      })
      const response = await createUser(typedItem)
      if (response && response.status === 422) {
        const message =
          "This user is already existent. Please try with another email."
        onSetNotification(message)
        return
      }
      if (response && response.status === 201) {
        const newUser = response.data.user
        setUsers((prevState) => prevState && [...prevState, newUser])
        if (isCreatedByAdmin) {
          onSetNotification("User created succesfully")
        }
        if (isSignup) {
          return validUser
        }
      }
    } catch (error) {
      console.error("Error by creating user:", error)
      onRequestError(error, setNotification)
    }
  }

  const onCreateAdmin = async (e: SyntheticEvent, data: CreateUser) => {
    e.preventDefault()

    try {
      const typedItem = convertDataToExpectedUserTypes(data)
      const validUser = await validate({
        item: typedItem,
        schema: createUserSchema,
        onError: onValidationError,
        onNotification: setNotification,
      })
      const response = await createAdmin(validUser)
      if (response && response.status === 422) {
        const message =
          "This user is already existent. Please try with another email."
        onSetNotification(message)
        return
      }
      if (response && response.status === 201) {
        const newUser = response.data.user
        setUsers((prevState) => prevState && [...prevState, newUser])
        if (isCreatedByAdmin) {
          onSetNotification("Admin created succesfully")
        }
        if (isSignup) {
          return validUser
        }
      }
    } catch (error) {
      console.error("Error by creating user:", error)
      onRequestError(error, setNotification)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractValidProperty = async (
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedData: any,
    file?: File,
  ) => {
    if (key === "image" && file) {
      const image = await uploadFile(file)
      return { [key]: image }
    } else {
      const value = updatedData[key]
      if (key === "price" || key === "size") {
        return { [key]: Number(value) }
      } else {
        return { [key]: value }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateUpdatedUser = async (property: any) => {
    try {
      if (updateUserSchema) {
        return updateUserSchema.parse(property)
      }
    } catch (error) {
      onValidationError(error, setNotification)
      console.error("Error by validating property:", error)
    }
  }

  const convertUpdatedUserData = async (
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedData: any,
    file?: File,
  ) => {
    if (key === "image" && file) {
      const image = await uploadFile(file)
      return { [key]: image }
    } else {
      const value = updatedData[key]

      return { [key]: value }
    }
  }

  interface OnUpdateUser {
    key: string
    id: number
    initialData: UpdateUser
    updatedData: UpdateUser
    setUpdatedData: Dispatch<SetStateAction<UpdateUser>>
    file?: File
  }

  const onUpdateUser = async ({
    key,
    id,
    initialData,
    updatedData,
    setUpdatedData,
    file,
  }: OnUpdateUser) => {
    try {
      const validProperty = await convertUpdatedUserData(key, updatedData, file)
      const validatedProperty = (await validateUpdatedUser(validProperty)) ?? {}
      const response = await updateUser(id, validatedProperty as User)
      if (response && response.status === 200) {
        const updatedUser = response.data.user
        setUsers((prevUsers) =>
          prevUsers?.map((user) =>
            user.id === updatedUser.id ? updatedUser : user,
          ),
        )
        setUser(updatedUser)
      }
    } catch (error) {
      console.error("Failed to update user:", error)
      setUpdatedData(initialData)
      const message = "Error by updating user"
      onRequestError(error, setNotification, message)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateShippingProperty = async (property: any) => {
    try {
      if (shippingDataSchema) {
        return shippingDataSchema.parse(property) as Partial<ShippingData>
      }
    } catch (error) {
      onValidationError(error, setNotification)
      console.error("Error by validating property:", error)
    }
  }

  interface OnUpdateShippingData {
    key: string
    id: number
    initialData: Partial<ShippingData>
    updatedData: Partial<ShippingData>
    setUpdatedData: Dispatch<SetStateAction<Partial<ShippingData>>>
    file: File
  }
  const onUpdateShippingData = async ({
    key,
    id,
    initialData,
    updatedData,
    setUpdatedData,
  }: OnUpdateShippingData) => {
    try {
      const validProperty = await extractValidProperty(key, updatedData)
      const validatedProperty =
        (await validateShippingProperty(validProperty)) ??
        ({} as Partial<ShippingData>)

      const response = await updateShippingData(id, validatedProperty)

      if (response && response.status === 200) {
        const updatedShippingData = response.data
        setShippingData(updatedShippingData)
      }
    } catch (error) {
      console.error("Failed to update user:", error)
      setUpdatedData(initialData)
      const message = "Error by updating user"
      onRequestError(error, setNotification, message)
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        users: users ?? [],
        user,
        setUser,
        onDeleteUser,
        onCreateCustomer,
        onUpdateUser,
        onCreateAdmin,
        onUpdateShippingData,
        shippingData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext shoud be within a UserProvider")
  }
  return context
}
