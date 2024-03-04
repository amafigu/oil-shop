import { deleteUserById } from "#api/users/deleteUserById"
import { ROUTES_CART, ROUTES_CHECKOUT_PAYMENT } from "#constants/routes"
import { NORMAL_MESSAGE_TIMEOUT } from "#constants/time"
export const submitGuestUserWithOrders = async (
  e,
  cart,
  isLoggedIn,
  navigate,
  formData,
) => {
  if (cart.length > 0) {
    e.preventDefault()
    if (cart.length > 0) {
      if (!isLoggedIn) {
        navigate(ROUTES_CHECKOUT_PAYMENT, {
          state: { formData },
        })
      }
    } else {
      navigate(ROUTES_CART)
    }
  }
}

export const onCreateUser = () => {
  console.log("onCreateUser")
}

export const onDeleteUser = async (e, userId, setNotification, setCounter) => {
  e.preventDefault()
  try {
    const response = await deleteUserById(userId)

    if (response && response.status === 200) {
      if (setNotification) {
        setNotification("user deleted")
        setTimeout(() => {
          setNotification(null)
        }, NORMAL_MESSAGE_TIMEOUT)
      }
      if (setCounter) {
        setTimeout(() => {
          setCounter((prevCount) => Number(prevCount) + 1)
        }, 500)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const onUpdateUser = () => {
  console.log("onUpdateUser")
}
