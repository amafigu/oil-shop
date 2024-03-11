import { uploadToS3 } from "#api/aws/uploadToS3"
import { createProductRequest } from "#api/products/createProductRequest"
import { deleteProductById } from "#api/products/deleteProductById"
import { updateProductDataRequest } from "#api/products/updateProductDataRequest"
import { ROUTES_PRODUCTS } from "#constants/routes"
import { PROCESS_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
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
  setItemsList,
  setShowList,
  setSearchProductText,
) => {
  navigate(`${ROUTES_PRODUCTS}/${name}`)
  setItemsList([])
  setShowList(false)
  setSearchProductText("")
}

export const filteredProducts = (products, category) =>
  products.filter(
    (product) => product.category.name === category || category === "all",
  )

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
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      if (setNotification) {
        setNotification(
          `Error by deleting data: ${error.response.data.message}`,
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
