import axios from "axios"
import { useEffect } from "react"

export const titleCase = (str, separator) => {
  return str
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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

export const getAdminData = async (setAdminData, setNotification, navigate) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/current-user`,
      { withCredentials: true },
    )
    setAdminData(response.data)
    return response.data
  } catch (error) {
    setNotification(`${error.response.data.message}`)
    setTimeout(() => navigate("/login"), 1900)
    setTimeout(() => setNotification(null), 2000)

    console.error("Error geting admin data", error)
  }
}

// end crud products and users functions

export const logout = async (
  navigate,
  setNotification,
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
    setNotification(`Error to logout: ${error.response.data.message}`)
    setTimeout(() => setNotification(null), 2000)
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
