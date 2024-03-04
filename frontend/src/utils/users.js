import { ROUTES_CART, ROUTES_CHECKOUT_PAYMENT } from "#constants/routes"

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

export const onDeleteUser = () => {
  console.log("onDeleteUser")
}

export const onUpdateUser = () => {
  console.log("onDeleteUser")
}
