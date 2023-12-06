import { SPECIAL_CHARACTERS_REGEX } from "#utils/constants"
import axios from "axios"
import { useEffect } from "react"
export const titleCase = (str, separator) => {
  return str
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const listenInputChangeAndSetDataObject = (
  e,
  updatedDataObj,
  setUpdatedDataObj,
  setErrorNotification,
) => {
  const inputValueLength = e.target.value.length
  const inputValue = e.target.value
  const inputName = e.target.name

  if (
    inputValue.match(SPECIAL_CHARACTERS_REGEX) &&
    inputName !== "details" &&
    inputName !== "postalCode" &&
    inputName !== "email"
  ) {
    console.error(`${inputName} can not include special characters`)
    setErrorNotification(`${inputName} can not include special characters`)
    setTimeout(() => setErrorNotification(null), 3000)
    return
  }

  if (inputName === "firstName" || inputName === "lastName") {
    if (!/^[A-Z]/.test(inputValue)) {
      setErrorNotification("Name should start with a capital letter")
      setTimeout(() => setErrorNotification(null), 3000)
    }
    if (inputValueLength > 30) {
      console.error("Please enter a shorter name")
      setErrorNotification("Please enter a shorter name")
      setTimeout(() => setErrorNotification(null), 3000)
      return
    }
    if (inputValueLength < 3) {
      console.error("Please enter a longer name")
      setErrorNotification("Please enter a longer name")
      setTimeout(() => setErrorNotification(null), 3000)
      return
    }
  }

  if (inputName === "details" || inputName === "street") {
    if (inputValueLength > 60) {
      console.error("Please enter a shorter value")
      setErrorNotification("Please enter a shorter value")
      setTimeout(() => setErrorNotification(null), 3000)
      return
    }
  }

  if (
    inputName === "postalCode" ||
    inputName === "city" ||
    inputName === "state"
  ) {
    if (inputValueLength > 30) {
      console.error("Please enter a shorter value")
      setErrorNotification("Please enter a shorter value")
      setTimeout(() => setErrorNotification(null), 3000)
      return
    }
  }

  setUpdatedDataObj({
    ...updatedDataObj,
    [e.target.name]: e.target.value,
  })
}

export const camelCaseToTitleCase = (str) => {
  // Insert space before each uppercase letter and trim leading/trailing spaces
  const spaced = str.replace(/([A-Z])/g, " $1").trim()

  return spaced
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
export const totalCost = (cart) =>
  cart.reduce((total, item) => total + item.quantity * item.product.price, 0)

export const cartTotalSum = (cart, shippingCost) =>
  Number(totalCost(cart).toFixed(2)) + Number(shippingCost.toFixed(2))

export const useEffectScrollTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}

export const searchAndNavigateToProduct = (products, searchText, navigate) => {
  const match = products.find(
    (product) => product.name.toLowerCase() === searchText.toLowerCase(),
  )
  if (match) {
    navigate(`/products/${match.name}`)
  } else {
    console.error("not able to navigate to product page ")
  }
}

// TODO: refactor custom hooks to let set the state in the componet

export const getUserOrdersWithProductsList = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/orders/all/${parseInt(userId)}`,
    )

    const ordersWithDetails = await Promise.all(
      response.data.map(async (order) => {
        const cartItemsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders/cart-items/${order.id}`,
        )
        return { ...order, cartItems: cartItemsResponse.data }
      }),
    )

    return ordersWithDetails
  } catch (error) {
    console.error(error)
  }
}

export const getUserShippingData = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${userId}`,
      { withCredentials: true },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getDataAndSetErrorMessage = async (
  dataId,
  apiUrl,
  setErrorMessage,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${apiUrl}${dataId}`,
      { withCredentials: true },
    )
    return response.data
  } catch (error) {
    console.error(error)
    if (typeof setErrorMessage === "function") {
      setErrorMessage("Error by getting data")
    }
  }
}

export const updateDataRequest = async (dataId, updatedData, apiUrl) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${apiUrl}${dataId}`,
      updatedData,
      { withCredentials: true },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateDataAndSetStates = async (
  e,
  request,
  nonUpdatedData,
  setNonUpdatedData,
  updatedData,
  setUpdatedData,
  setNotification,
  filterEmptyValues,
) => {
  e.preventDefault()

  try {
    const cleanedUpdatedData = filterEmptyValues(updatedData)

    if (
      Object.keys(cleanedUpdatedData).length === 0 ||
      JSON.stringify(nonUpdatedData) === JSON.stringify(cleanedUpdatedData)
    ) {
      setNotification("No changes made.")
      setTimeout(() => setNotification(null), 2000)
      return
    }

    await request(cleanedUpdatedData)

    setUpdatedData((prevData) => ({
      ...prevData,
      ...cleanedUpdatedData,
    }))
    setNonUpdatedData((prevData) => ({
      ...prevData,
      ...cleanedUpdatedData,
    }))
  } catch (error) {
    console.log("Could not update data: " + error)
    setNotification("Could not update data")
    setTimeout(() => setNotification(null), 2000)
  }
}

export const navigateToProductAndCloseDropdown = (
  name,
  navigate,
  setProductDropdownVisible,
  setMatchedProducts,
  setSearchText,
) => {
  navigate(`/products/${name}`)
  setProductDropdownVisible(false)
  setMatchedProducts([])
  setSearchText("")
}

// crud products and users functions

export const useGetProducts = (setProducts) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((e) => console.error("Error getting products data", e))
  }, [setProducts])
}

export const getUserByEmail = async (
  email,
  setUserDataByEmail,
  setNotification,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/user/${email}`,
      {
        withCredentials: true,
      },
    )

    setUserDataByEmail(response.data)
  } catch (error) {
    setNotification(`Error geting user: ${error.response.data.message}`)
    setTimeout(() => setNotification(null), 2000)
    console.error("Error geting user by email", error)
  }
}

export const getProductByName = async (
  name,
  setProductDataByName,
  setNotification,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${name}`,
    )

    setNotification(`Selected Product: ${JSON.stringify(response.data.name)}`)
    setProductDataByName(response.data)
    setTimeout(() => setNotification(null), 2000)
  } catch (error) {
    setNotification(`Error geting user: ${error.response.data.message}`)
    setTimeout(() => setNotification(null), 2000)
    console.error("Error geting user by email", error)
  }
}

export const getLoggedInUserData = async (
  setLoggedInUserData,
  setNotification,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/current-user`,
      { withCredentials: true },
    )
    setLoggedInUserData(response.data)
    return response.data
  } catch (error) {
    setNotification(`${error.response.data.message}`)

    console.error("Error geting admin data", error)
  }
}

// end crud products and users functions

export const logout = async (
  navigate,
  setIsLoggedIn,
  setUserEmail,
  setUser,
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/logout`,
      {},
      {
        withCredentials: true,
      },
    )

    setIsLoggedIn(false)
    setUserEmail("")
    setUser({})
    setTimeout(() => navigate("/login"), 400)
  } catch (error) {
    console.error(error)
  }
}

export const useHideListOnOuterClick = (
  listRef,
  setListOpen,
  setMatchedItems,
) => {
  useEffect(() => {
    const listenClickOutsideSearchProductListDropdown = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setListOpen(false)
        setMatchedItems([])
      }
    }

    document.addEventListener(
      "mousedown",
      listenClickOutsideSearchProductListDropdown,
    )
    return () => {
      document.removeEventListener(
        "mousedown",
        listenClickOutsideSearchProductListDropdown,
      )
    }
  }, [listRef, setListOpen, setMatchedItems])
}

export const getInputChangeAndOpenList =
  (searchArray, setSearchString, setDropdownOpen, setMatches) => (event) => {
    setSearchString(event.target.value)
    setDropdownOpen(true)

    const match = searchArray.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase()),
    )

    setMatches(match.slice(0, 6))
    if (event.target.value === "") {
      setMatches([])
      setDropdownOpen(false)
    }
  }

// END OF FUNCTIONS FOR REFACTORING IN THE TODO ABOVE

export const increaseQuantity = (quantity, setQuantity) => {
  if (quantity < 20) {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }
}

export const decreaseQuantity = (quantity, setQuantity) => {
  if (quantity > 1) {
    setQuantity((prevQuantity) => prevQuantity - 1)
  }
}

export const translateZodValidationErrors = (error, text) => {
  const translatedMessage = text.validationErrors[error.path]
  if (translatedMessage) {
    return translatedMessage[error.code]
  } else {
    return error.message
  }
}

export const uploadToS3 = async (file) => {
  let newUrl = ""
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/aws/generate-upload-url?fileName=${file.name}`,
      { withCredentials: true },
    )
    newUrl = `https://oylo-images.s3.us-east-2.amazonaws.com/${response.data.fileName}`

    await axios.put(
      response.data.uploadURL,
      file,

      {
        headers: {
          "Content-Type": file.type,
        },
      },
    )
  } catch (error) {
    console.error("Error uploading to S3: ", error)
    return null
  }
  return newUrl
}

export const convertIsoToLocaleDateString = (isoDate) => {
  const date = new Date(isoDate)
  return date.toLocaleDateString("de-De", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export const setDefaultImageByError = (event, image) => {
  event.target.src = image
}

export const ignorePropertiesWithEmptyValue = (dataObject) => {
  return Object.keys(dataObject)
    .filter(
      (key) =>
        dataObject[key] !== "" &&
        dataObject[key] !== null &&
        dataObject[key] !== undefined,
    )
    .reduce((object, key) => {
      object[key] = dataObject[key]
      return object
    }, {})
}

export const saveDataAndToggleInput = async (
  e,
  asyncOnSaveFunction,
  setToggle,
) => {
  await asyncOnSaveFunction(e)
  setToggle(false)
}

export const cancelWithScape = (e, setState) => {
  if (e.key === "Escape") {
    setState(false)
  }
}

export const checkIfAllObjectsValuesAreEmptyStrings = (obj) => {
  console.log(obj)
  for (let key in obj) {
    if (obj[key] !== "") {
      return false
    }
  }
  return true
}
