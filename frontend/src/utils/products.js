import { uploadToS3 } from "#api/aws/uploadToS3"
import { deleteProductById } from "#api/products/deleteProductById"
import { updateProductDataRequest } from "#api/products/updateProductDataRequest"
import { ROUTES_PRODUCTS } from "#constants/routes"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateProductProperty } from "#utils/validation"

export const searchAndNavigateToProduct = (products, searchText, navigate) => {
  const match = products.find(
    (product) => product.name.toLowerCase() === searchText.toLowerCase(),
  )
  if (match) {
    navigate(`${ROUTES_PRODUCTS}/${match.name}`)
  } else {
    console.error("not able to navigate to product page ")
  }
}

export const navigateToProductAndCloseDropdown = (
  name,
  navigate,
  setProductDropdownVisible,
  setMatchedProducts,
  setSearchText,
) => {
  navigate(`${ROUTES_PRODUCTS}/${name}`)
  setProductDropdownVisible(false)
  setMatchedProducts([])
  setSearchText("")
}

export const filteredProducts = (products, category) =>
  products.filter(
    (product) => product.category.name === category || category === "all",
  )

export const onProductDelete = async (
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
    console.error(error)
  }
}

export const onProductUpdate = async (
  e,
  key,
  productId,
  updatedProductData,
  setUpdatedProductData,
  setNotification,
  file,
) => {
  e.preventDefault()
  console.log(key)

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
      return updatedProduct
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      if (setNotification) {
        setNotification(
          `Error by updating data: ${error.response.data.message}`,
        )
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    } else {
      console.error(error)
      if (setNotification) {
        setNotification("Error by updating data")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }
}
