import axios from "axios"
import {
  API_LOGOUT,
  API_ORDERS_ALL,
  API_ORDERS_CART_ITEMS,
  API_SHIPPING_DATA,
  API_USERS_CURRENT_USER,
  API_USERS_GUEST_BY_EMAIL,
  API_USERS_GUEST_BY_ID,
  API_USERS_USER,
  ROUTES_LOGIN,
  SHORT_MESSAGE_TIMEOUT,
} from "./constants"

export const logout = async (
  navigate,
  setIsLoggedIn,
  setUserEmail,
  setUser,
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}${API_LOGOUT}`,
      {},
      {
        withCredentials: true,
      },
    )

    setIsLoggedIn(false)
    setUserEmail("")
    setUser({})
    setTimeout(() => navigate(ROUTES_LOGIN), 400)
  } catch (error) {
    console.error(error)
  }
}

export const getLoggedInUserData = async (
  userId,
  setLoggedInUserData,
  setNotification,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${userId}`,
      { withCredentials: true },
    )
    setLoggedInUserData(response.data)
    return response.data
  } catch (error) {
    setNotification(`${error.response.data.message}`)
    console.error("Error geting admin data", error)
  }
}

export const getUserWithoutCredentialsByEmail = async (email) => {
  console.log("getUserByEmail", email)
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS_GUEST_BY_EMAIL}/${email}`,
    )
    console.log("getUserByEmail response", response)

    return response
  } catch (error) {
    console.error("Error geting user by email", error)
  }
}
export const getUserWithoutCredentialsById = async (id) => {
  console.log("getUserByEmail", id)
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS_GUEST_BY_ID}/${id}`,
    )
    console.log("getUserByEmail response", response)

    return response
  } catch (error) {
    console.error("Error geting user by email", error)
  }
}

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS_USER}/${email}`,
      {
        withCredentials: true,
      },
    )
    console.log("getUserByEmail response", response)

    return response.data
  } catch (error) {
    console.error("Error geting user by email", error)
  }
}

// TODO: refactor custom hooks to let set the state in the componet

export const getUserOrdersWithProductsList = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_ORDERS_ALL}/${parseInt(userId)}`,
    )

    const ordersWithDetails = await Promise.all(
      response.data.map(async (order) => {
        const cartItemsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}${API_ORDERS_CART_ITEMS}/${order.id}`,
        )
        return { ...order, cartItems: cartItemsResponse.data }
      }),
    )

    return ordersWithDetails
  } catch (error) {
    console.error(error)
  }
}

export const getUserShippingData = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${userId}`,
      { withCredentials: true },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteUserByEmail = async (
  userEmail,
  setNotification,
  successMessage,
  errorMessage,
  setRefreshUsersList,
) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}${API_USERS_USER}/${userEmail}`,
      {
        withCredentials: true,
      },
    )
    if (setNotification) {
      setNotification(`${userEmail} ${successMessage}`)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
    if (setRefreshUsersList) {
      setRefreshUsersList((prevCounter) => prevCounter + 1)
    }
  } catch (error) {
    setNotification(`${userEmail} ${errorMessage}`)
    setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    console.error("Can not delete user", error)
  }
}
