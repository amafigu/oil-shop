import { uploadToS3 } from "#api/aws/uploadToS3"
import { createProductRequest } from "#api/products/createProductRequest"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onRequestHandlerNotification } from "./onRequestHandlerNotification"
import { onValidationError } from "./onValidationError"
import { createProductSchema } from "./productsValidation"

export const onCreateProduct = async (e, product, setNotification, file) => {
  e.preventDefault()
  try {
    // TODO: either make a separate table for measures or delete that from database
    let image
    let validProduct
    product = { ...product, measure: "ml" }

    if (file) {
      image = await uploadToS3(file)
      product = { ...product, image: image }
    }

    product = {
      ...product,
      productCategoryId: Number(product.productCategoryId),
      size: Number(product.size),
      price: Number(product.price),
    }
    try {
      validProduct = createProductSchema.parse(product)
    } catch (error) {
      onValidationError(error, setNotification)
      return
    }

    const request = await createProductRequest(validProduct)
    if (request && request.status === 201) {
      const message = "Product created sucessfully!"
      onRequestHandlerNotification(setNotification, message)
      return request
    }
    if (request && request.status === 422) {
      const message =
        "This product is already existent. Please try with another name, size or category."
      onRequestHandlerNotification(setNotification, message)
      return request
    }
  } catch (error) {
    const message = "Error by creating product."
    onRequestHandlerError(error, setNotification, message)
  }
}
