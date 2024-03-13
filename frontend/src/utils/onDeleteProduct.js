import { deleteProductById } from "#api/products/deleteProductById"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"

export const onDeleteProduct = async (
  e,
  productId,
  setNotification,
  setCounter,
) => {
  e.preventDefault()
  try {
    const response = await deleteProductById(productId)
    if (response && response.status === 200) {
      if (setNotification) {
        setNotification("product deleted")
        setTimeout(() => {
          setNotification(null)
        }, SHORT_MESSAGE_TIMEOUT)
      }
      if (setCounter) {
        setTimeout(() => {
          setCounter((prevCount) => Number(prevCount) + 1)
        }, 500)
      }
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      console.error(error)
      if (setNotification) {
        setNotification(
          `Error by updating product: ${error.response.data.errors[0].path[0]} ${error.response.data.errors[0].message}`,
        )
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    } else {
      if (setNotification) {
        setNotification("Error by deleting data")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }
}
