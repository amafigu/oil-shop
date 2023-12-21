import axios from "axios"

export const logout = async (
  navigate,
  setIsLoggedIn,
  setUserEmail,
  setUser,
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/logout`,
      {},
      {
        withCredentials: true,
      },
    )

    setIsLoggedIn(false)
    setUserEmail("")
    setUser({})
    setTimeout(() => navigate("/login"), 400)
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
      `${process.env.REACT_APP_API_URL}/users/current-user/${userId}`,
      { withCredentials: true },
    )
    setLoggedInUserData(response.data)
    return response.data
  } catch (error) {
    setNotification(`${error.response.data.message}`)
    console.error("Error geting admin data", error)
  }
}

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/user/${email}`,
      {
        withCredentials: true,
      },
    )

    // setUserDataByEmail(response.data)
    console.log(response.data)
    return response.data
  } catch (error) {
    //setNotification(`Error geting user: ${error.response.data.message}`)
    // setTimeout(() => setNotification(null), 2000)
    console.error("Error geting user by email", error)
  }
}

// TODO: refactor custom hooks to let set the state in the componet

export const getUserOrdersWithProductsList = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/all/${parseInt(userId)}`,
    )

    const ordersWithDetails = await Promise.all(
      response.data.map(async (order) => {
        const cartItemsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders/cart-items/${order.id}`,
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
      `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
      { withCredentials: true },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}
