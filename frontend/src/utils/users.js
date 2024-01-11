import axios from "axios"
import {
  API_LOGOUT,
  API_ORDERS_ALL,
  API_ORDERS_CART_ITEMS,
  API_ORDERS_LAST_ORDER_ITEMS,
  API_SHIPPING_DATA,
  API_USERS_CURRENT_USER,
  API_USERS_GUEST_BY_EMAIL,
  API_USERS_GUEST_BY_ID,
  API_USERS_USER,
  LOCAL_STORAGE_GUEST_ID,
  REDIRECT_TIMEOUT,
  ROUTES_LOGIN,
  SHORT_MESSAGE_TIMEOUT,
} from "./constants"

export const logout = async (navigate, setIsLoggedIn) => {
  try {
    const logoutResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}${API_LOGOUT}`,
      {},
      {
        withCredentials: true,
      },
    )
    if (logoutResponse.status === 200) {
      setIsLoggedIn(false)
      setTimeout(() => navigate(ROUTES_LOGIN), REDIRECT_TIMEOUT)
    }
  } catch (error) {
    console.error(error)
  }
}

export const getLoggedInUser = async (
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
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS_GUEST_BY_EMAIL}/${email}`,
    )
    return response
  } catch (error) {
    console.error("Error geting user by email", error)
  }
}
export const getUserWithoutCredentialsById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${API_USERS_GUEST_BY_ID}/${id}`,
    )

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

const getUserData = async (url, customerId, withCredentials = false) => {
  const response = await axios.get(url, { withCredentials })
  if (response.status === 200) {
    const user = response.data
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  }
  return {}
}

export const getSummaryData = async (
  userId,
  isLoggedIn,
  isLoading,
  setNotification,
) => {
  try {
    let customerId
    let shippingData = {}
    let userData = {}
    let orderData = {}
    let orderAndCartItems = {}

    if (!isLoggedIn) {
      customerId = localStorage.getItem(LOCAL_STORAGE_GUEST_ID)
      if (customerId)
        userData = await getUserData(
          `${process.env.REACT_APP_API_URL}${API_USERS_GUEST_BY_ID}/${customerId}`,
        )
    }
    if (isLoggedIn && !isLoading) {
      customerId = userId
      userData = await getUserData(
        `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${customerId}`,
        customerId,
        true,
      )
    }

    if (customerId) {
      const shippingDataResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
      )

      if (shippingDataResponse.status === 200) {
        const data = shippingDataResponse.data
        shippingData = {
          street: data.street,
          number: data.number,
          postalCode: data.postalCode,
          city: data.city,
          state: data.state,
          country: data.country,
        }
      }
      const orderAndCartItemsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}${API_ORDERS_LAST_ORDER_ITEMS}/${customerId}`,
      )
      if (orderAndCartItemsResponse.status === 200) {
        orderAndCartItems = orderAndCartItemsResponse.data
        orderData = {
          paymentMethod:
            orderAndCartItemsResponse.data.lastOrder[0].paymentMethod,
          totalAmount: orderAndCartItemsResponse.data.lastOrder[0].totalAmount,
        }
      }

      return { shippingData, userData, orderData, orderAndCartItems }
    } else {
      if (!customerId && userId) {
        customerId = userId
      }
    }
  } catch (error) {
    setNotification(`error getting summary data`)
    setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    console.error(error)
  }
}
