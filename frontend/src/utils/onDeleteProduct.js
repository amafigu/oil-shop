import { deleteProductById } from "#api/products/deleteProductById"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onRequestHandlerNotification } from "./onRequestHandlerNotification"

export const onDeleteProduct = async (e, productId, setNotification) => {
  e.preventDefault()
  try {
    const response = await deleteProductById(productId)
    if (response && response.status === 200) {
      const message = "Product deleted"
      onRequestHandlerNotification(setNotification, message)
      return response
    }
  } catch (error) {
    const message = "Error by deleting product."
    onRequestHandlerError(error, setNotification, message)
  }
}
