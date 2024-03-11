import { uploadToS3 } from "#api/aws/uploadToS3"
import { createProductRequest } from "#api/products/createProductRequest"
import { PROCESS_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateProductProperty } from "#utils/validateProductProperty"

export const onCreateProduct = async (
  e,
  product,
  setMessage,
  file,
  setCounter,
) => {
  e.preventDefault()
  try {
    // TODO: either make a separate table for measures or delete that from database
    let image
    product = { ...product, measure: "ml" }

    if (file) {
      image = await uploadToS3(file)
      product = { ...product, image: image }
    }

    const validProduct = validateProductProperty(product, setMessage)
    const request = await createProductRequest(validProduct)
    if (request && request.status === 201) {
      setMessage(`Product created sucessfully!`)
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      setTimeout(
        () => setCounter((prevCount) => prevCount + 1),
        PROCESS_TIMEOUT,
      )
      return request
    }
    if (request && request.status === 422) {
      setMessage(
        `Error by updating data: Can not add product, this product is already existent. Please try with another name, size or category.`,
      )
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.errors) {
      console.error(error.response.data.message)
      setMessage(
        `Error by updating data: ${error.response.data.errors[0].path} ${error.response.data.errors[0].message}`,
      )
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    } else {
      console.error("error by updating data", error)
      setMessage("Error by updating data")
      setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
}
