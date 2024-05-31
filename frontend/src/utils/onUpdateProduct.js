import { uploadFile } from "#api/aws/uploadFile"
import { updateProduct } from "#api/products/updateProduct"
import { updateProductSchema } from "#utils/productsValidation"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onValidationError } from "./onValidationError"

export const onUpdateProduct = async (
  e,
  key,
  productId,
  itemInitialAttributes,
  updatedProductData,
  setUpdatedProductData,
  setNotification,
  file,
) => {
  e.preventDefault()

  try {
    let validProperty
    let image

    if (key === "image" && file) {
      image = await uploadFile(file)
      validProperty = { [key]: image }
    } else {
      try {
        let toBevalidProperty = { [key]: updatedProductData[key] }
        if (key === "price" || key === "size") {
          toBevalidProperty = { [key]: Number(updatedProductData[key]) }
        }
        validProperty = updateProductSchema.parse(toBevalidProperty)
      } catch (error) {
        setUpdatedProductData(itemInitialAttributes)
        onValidationError(error, setNotification)
        return
      }
    }

    const dataRequest = await updateProduct(productId, validProperty)
    if (dataRequest && dataRequest.status === 200) {
      const updatedProduct = dataRequest.data.product
      setUpdatedProductData(updatedProduct)
      return dataRequest
    }
  } catch (error) {
    setUpdatedProductData(itemInitialAttributes)
    const message = "Error by updating product"
    onRequestHandlerError(error, setNotification, message)
  }
}
