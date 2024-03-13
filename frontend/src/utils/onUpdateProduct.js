import { uploadToS3 } from "#api/aws/uploadToS3"
import { updateProductDataRequest } from "#api/products/updateProductDataRequest"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { updateProductSchema } from "#utils/productsValidation"

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
      try {
        let toBevalidProperty = { [key]: updatedProductData[key] }
        if (key === "price") {
          toBevalidProperty = { [key]: Number(updatedProductData[key]) }
        }
        validProperty = updateProductSchema.parse(toBevalidProperty)
      } catch (error) {
        console.error(error)
        setNotification(
          `Error by updating product: ${error.issues[0].message} `,
        )
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
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
      setNotification(
        `Error by updating product: ${error.response.data.errors[0].path[0]} ${error.response.data.errors[0].message}`,
      )
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      console.error(error)
    } else {
      if (setNotification) {
        setNotification("Error by updating products")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }
}
