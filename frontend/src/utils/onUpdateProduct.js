import { uploadToS3 } from "#api/aws/uploadToS3"
import { updateProductDataRequest } from "#api/products/updateProductDataRequest"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateProductProperty } from "#utils/validateProductProperty"

export const onUpdateProduct = async (
  e,
  key,
  productId,
  updatedProductData,
  nonUpdatedProductData,
  setUpdatedProductData,
  setNonUpdatedProductData,
  setNotification,
  file,
) => {
  e.preventDefault()

  try {
    let validProperty
    let image

    if (key === "image" && file) {
      image = await uploadToS3(file)
      validProperty = { [key]: image }
    } else {
      const toBevalidProperty = { [key]: updatedProductData[key] }
      validProperty = validateProductProperty(
        toBevalidProperty,
        setNotification,
      )
    }
    if (!validProperty) {
      return
    }

    const dataRequest = await updateProductDataRequest(productId, validProperty)
    if (dataRequest && dataRequest.status === 200) {
      const updatedProduct = dataRequest.data.product
      setUpdatedProductData(updatedProduct)
      setNonUpdatedProductData(updatedProduct)
      return updatedProduct
    }
  } catch (error) {
    setUpdatedProductData(nonUpdatedProductData)
    if (error.response && error.response.data.errors) {
      console.error(error.response.data.message)
      setNotification(
        `Error by creating user: ${error.response.data.errors[0].path} ${error.response.data.errors[0].message}`,
      )
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      if (setNotification) {
        setNotification(
          `Error by creating user: ${error.response.data.message}`,
        )
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    } else {
      if (setNotification) {
        setNotification("Error by creating user")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }
}
