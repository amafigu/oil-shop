import { uploadToS3 } from "#api/aws/uploadToS3"
import { updateProductDataAndSetStates } from "#api/products/updateProductDataAndSetStates"
export const updateProduct = async (
  e,
  productId,
  propertyName,
  file,
  updatedProductData,
  setUpdatedProductData,
  setNonUpdatedProductData,
  setNotification,
  setCounter,
) => {
  let image = ""

  if (file) {
    image = await uploadToS3(file)
  }

  let updatedProductDataWithImage = { ...updatedProductData, image }
  setUpdatedProductData(updatedProductDataWithImage)

  const updatedData = await updateProductDataAndSetStates(
    propertyName,
    productId,
    updatedProductDataWithImage,
    setNonUpdatedProductData,
    setUpdatedProductData,
    setNotification,
  )
  if (!updatedData) {
    return
  }
  setUpdatedProductData(updatedData.data.product)
  setTimeout(() => setCounter((prevState) => prevState + 1), 500)
}
